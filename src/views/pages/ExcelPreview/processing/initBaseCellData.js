import { logTitle } from './log'
import {
  isWrappedWithHashBrackets,
  isWrappedWithDollarBrackets,
  getDollarBracketsPropertys,
  getHashBracketsPropertys,
} from './helper'
import { getLetter } from '@/plugins/univer-excel/util'
import { deepMerge } from '@/utils/util'

const log = false

/**
 * 初始化基础单元格数据，根据univerInfo和dataList
 * @param {*} cellData  原始单元格数据
 * @param {*} dataList 已经请求的数据集数据
 * @param {*} dataset 数据集信息
 */
export default function initBaseCellData(cellData, dataList, dataset) {
  logTitle('[1] initBaseCellData')
  const newCellData = {} // 新的单元格数据
  const cellsWidthOffset = {} // 有偏移的单元格
  const cellsWithFormula = {} // 包含公式的单元格

  let currentRowIndex = 0 // 当前需要追加的行索引
  let totalOffset = 0 // 总偏移量
  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    currentRowIndex = +rowKey + totalOffset
    // 检查当前行是否包含动态内容（以#{...}包裹的表达式）
    const hasDynamicVal = Object.values(row).some(cellData => isWrappedWithHashBrackets(cellData.v))
    if (hasDynamicVal) {
      const dataArr = getCorrespondingDataList(row, dataList)
      log && console.log(`====> 当前行包含动态内容 #{...} [row:${rowKey}]`, row, dataArr)
      // 根据数据，追加行索引
      for (let i = 0; i < dataArr.length; i++) {
        const dataItem = dataArr[i]
        const newRowIndex = currentRowIndex + i
        log && console.log(' ====> 追加新行', newRowIndex)
        const newRow = {}
        // 遍历列
        for (const colKey in row) {
          const cell = row[colKey]
          const newCell = getValItemFromObjByString(cell, dataItem, dataset)

          newRow[colKey] = deepMerge(newCell, {
            custom: {
              isList: true,
            },
          })

          // 判断单元格是否包含公式
          if (cell.f && cell.f.startsWith('=')) {
            cellsWithFormula[getLetter(newRowIndex, colKey)] = newCell
          }

          log && console.log(`更新 #Cell [${getLetter(newRowIndex, colKey)}]====>`, newCell)
        }
        newCellData[newRowIndex] = newRow
      }
      totalOffset += dataArr.length - 1 // 更新总偏移量
    } else {
      const newRow = {}
      log && console.log(`====> 当前行直接复制行数据 [row:${rowKey} ==> row:${currentRowIndex}]`)
      // 遍历列
      for (const colKey in row) {
        const cell = row[colKey]
        if (totalOffset > 0) {
          cellsWidthOffset[getLetter(rowKey, colKey)] = getLetter(currentRowIndex, colKey)
        }
        const newCell = parseData(cell, dataList, dataset)
        // 判断单元格是否包含公式
        if (cell.f && cell.f.startsWith('=')) {
          cellsWithFormula[getLetter(currentRowIndex, colKey)] = newCell
        }
        newRow[colKey] = newCell
        log && console.log(`更新 Cell [${getLetter(currentRowIndex, colKey)}]====>`, newCell)
      }
      newCellData[currentRowIndex] = newRow
    }
  }

  console.log('====> originalCellData', cellData)
  console.log('====> newCellData', newCellData)
  console.log('====> cellsWidthOffset', cellsWidthOffset)
  console.log('====> cellsWithFormula', cellsWithFormula)

  return {
    newCellData,
    cellsWidthOffset,
    cellsWithFormula,
  }
}

// 根据传入的rowData和dataList，获取对应的dataList中的list
function getCorrespondingDataList(rowData, dataList) {
  // 定义一个空数组，用于存储rowData中的动态属性名
  const dynamicPropertyNames = []
  // 遍历rowData中的每个cellData
  Object.values(rowData).forEach(cellData => {
    // 使用正则表达式匹配cellData中的动态属性名
    const matches = cellData.v.match(/#\{([^}]+)\}/g)
    // 如果匹配到了动态属性名
    if (matches) {
      // 遍历匹配到的动态属性名
      matches.forEach(match => {
        // 去掉动态属性名中的#{}，获取属性名
        const propertyName = match.replace(/#\{([^}]+)\}/, '$1')
        // 将属性名添加到dynamicPropertyNames数组中
        dynamicPropertyNames.push(propertyName)
      })
    }
  })
  // 定义一个空数组，用于存储对应的dataList中的list
  let correspondingDataList = []
  // 遍历dataList中的每个key
  for (const key in dataList) {
    // 如果dynamicPropertyNames数组中有以key开头的属性名
    if (dynamicPropertyNames.some(name => name.startsWith(key))) {
      // 将对应的dataList中的list赋值给correspondingDataList
      correspondingDataList = dataList[key].list
      // 跳出循环
      break
    }
  }
  // 返回对应的dataList中的list
  return correspondingDataList
}

// 处理数据
function parseData(cell, dataList, dataset) {
  // 如果单元格是$开头，则进行赋值
  if (isWrappedWithDollarBrackets(cell.v)) {
    const newCell = getValFromObjByString(cell, dataList, dataset)
    return newCell
  }
  return cell
}

/**
 * 根据字符串获取对象中的值 ${code001.name}
 * @param {*} val
 * @param {*} dataObject
 * @returns
 */
function getValFromObjByString(cell, dataObject, dataset) {
  const propertyPath = getDollarBracketsPropertys(cell)
  if (propertyPath) {
    const dataType = getDataTypeByPopertyPath(propertyPath, dataset)
    let value = dataObject
    for (let i = 0; i < propertyPath.length; i++) {
      value = value[propertyPath[i]]
    }
    // console.log('currentObject ========>', currentObject)
    const newCell = {
      ...cell,
      v: value,
      t: dataType,
    }
    // console.log('newCell $ ========>', newCell)
    return newCell
  }
  return cell
}

/**
 * 根据字符串获取对象中的值 #{}
 * @param {*} cell
 * @param {*} dataObject 单个对象
 * @param {*} dataset 数据集
 * @returns
 */
function getValItemFromObjByString(cell, dataObject, dataset) {
  const propertyPath = getHashBracketsPropertys(cell)
  if (propertyPath) {
    const dataType = getDataTypeByPopertyPath(propertyPath, dataset)
    let value = dataObject
    if (propertyPath.length === 2) {
      value = value[propertyPath[1]]
    }
    const newCell = {
      ...cell,
      v: value,
      t: dataType,
    }
    // console.log('newCell # ========>', newCell)
    return newCell
  }
  return cell
}

/**
 * 根据字符串解析的propertyPath 和数据集列表，获取对应的字段类型
 * @param {*} propertyPath
 * @param {*} dataset
 */
function getDataTypeByPopertyPath(propertyPath, dataset) {
  // console.log('propertyPath ========>', propertyPath)
  if (!propertyPath || propertyPath.length !== 2) return 1 // 如果属性解析数组长度不是2，说明解析失败，默认字符串类型

  // 根据属性路径获取数据集对象，第一个code取得对应数据集
  const data = dataset.find(item => item.code === propertyPath[0])
  if (data) {
    // 根据第二个属性路径获取数据集对象中的字段类型
    const field = data.fields.find(item => item.fieldName === propertyPath[1])
    if (field) {
      const dataTypeMap = {
        string: 1,
        number: 2,
        boolean: 3,
      }
      return dataTypeMap[field.type] || 1 // 如果没有匹配到，默认字符串类型
    }
  }

  return 1
}
