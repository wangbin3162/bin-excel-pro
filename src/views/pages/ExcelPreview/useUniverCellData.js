import {
  getLetter,
  getValFromObjByString,
  getValItemFromObjByString,
  isWrappedWithDollarBrackets,
  isWrappedWithHashBrackets,
} from '@/plugins/univer-excel/util'
import { isEmpty } from '@/utils/util'
import { isEmptyCell } from '@univerjs/core'

/**
 * 处理univer cellData数据，并返回新的渲染数据
 * 注意，这里的参数都已经是拷贝过的副本，可以进行直接操作
 * @param {*} univerInfo univer配置信息，可以用于初始化univer
 * @param {*} dataList 已经请求的数据集数据
 */
export default function cellDataConverter(univerInfo, dataList) {
  // 目前暂时只处理第一个sheet的数据，后面的都会被忽略
  const { sheetOrder, sheets } = univerInfo
  const activeSheet = sheets[sheetOrder[0]]
  const { cellData } = activeSheet
  const noEmptyCellData = clearEmptyInCellData(cellData)
  const newCellData = traverseAssign(noEmptyCellData, dataList)

  console.log('----------------cellDataConverter----------------')
  console.log('activeSheet|dataList ========>', activeSheet, dataList)
  console.log('cellData ========>', cellData)
  // console.log('noEmptyCellData ========>', noEmptyCellData) //JSON.stringify(newCellData)
  console.log('newCellData ========>', newCellData)
  console.log('-------------------------------------------------')
  activeSheet.cellData = newCellData

  return univerInfo
}

// 去除空单元格
function clearEmptyInCellData(cellData) {
  const newCellData = {}
  // 遍历行
  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    const newRow = {}
    for (const colKey in row) {
      const cell = row[colKey]
      if (!isEmptyCell(cell)) {
        newRow[colKey] = cell
      }
    }
    // console.log('row|newRow ========>', rowKey, row, newRow)
    if (!isEmpty(newRow)) {
      newCellData[rowKey] = newRow
    }
  }
  // console.log('cellData|newCellData ========>', cellData, newCellData)
  return newCellData
}

// 遍历赋值
function traverseAssign(cellData, dataList, debug = false) {
  const newCellData = {}
  let currentRowIndex = 0 // 当前需要追加的行索引
  let totalOffset = 0 // 总偏移量
  // 遍历行
  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    const newRowData = {}
    // const newRow = {}
    // 检查当前行是否包含动态内容（以#{...}包裹的表达式）
    const hasDynamicVal = Object.values(row).some(cellData => isWrappedWithHashBrackets(cellData.v))
    if (hasDynamicVal) {
      currentRowIndex = +rowKey + totalOffset
      const dataArr = getCorrespondingDataList(row, dataList)

      debug && console.log(`====> 当前行包含动态内容 #{...} [row:${rowKey}]`, row)

      // 根据数据，追加行索引
      for (let i = 0; i < dataArr.length; i++) {
        const dataItem = dataArr[i]
        const newRowIndex = currentRowIndex + i

        debug && console.log('追加新行 ====>', newRowIndex)

        const newRow = {}
        // 遍历列
        for (const colKey in row) {
          const cell = row[colKey]
          const newCellValue = getValItemFromObjByString(cell.v, dataItem)
          newRow[colKey] = {
            ...cell,
            v: parseData(newCellValue, dataList),
          }
          debug &&
            console.log(`更新 #Cell [${getLetter(newRowIndex, colKey)}]====>`, newRow[colKey])
        }
        newCellData[newRowIndex] = newRow
      }
      totalOffset += dataArr.length - 1 // 更新总偏移量
    } else {
      // 当前行不包含动态内容，直接复制行数据
      const newRowIndex = +rowKey + totalOffset

      debug && console.log(`====> 当前行直接复制行数据 [row:${rowKey} ==> row:${newRowIndex}]`)

      // 遍历列
      for (const colKey in row) {
        const cell = row[colKey]
        newRowData[colKey] = {
          ...cell,
          v: parseData(cell.v, dataList),
        }
        debug &&
          console.log(`更新 Cell [${getLetter(newRowIndex, colKey)}]====>`, newRowData[colKey])
      }
      newCellData[newRowIndex] = newRowData
    }
  }
  debug && console.log('newCellData ========>', newCellData)
  return newCellData
}

// 找到与当前行动态内容对应的列表数据
function getCorrespondingDataList(rowData, dataList) {
  // 从数据数组中找到与当前行动态内容对应的列表数据
  const dynamicPropertyNames = []
  Object.values(rowData).forEach(cellData => {
    const matches = cellData.v.match(/#\{([^}]+)\}/g)
    if (matches) {
      matches.forEach(match => {
        const propertyName = match.replace(/#\{([^}]+)\}/, '$1')
        dynamicPropertyNames.push(propertyName)
      })
    }
  })

  let correspondingDataList = []
  for (const key in dataList) {
    if (dynamicPropertyNames.some(name => name.startsWith(key))) {
      correspondingDataList = dataList[key].list
      break
    }
  }

  return correspondingDataList
}

// 处理数据
function parseData(val, dataList) {
  // 如果单元格是$开头，则进行赋值
  if (isWrappedWithDollarBrackets(val)) {
    const fVal = getValFromObjByString(val, dataList)
    // console.log('fVal ========>', fVal)
    return fVal || val
  }
  return val
}
