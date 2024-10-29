import {
  getLetter,
  getCellKeyByLetter,
  safeGetCell,
  clearEmptyInCellData,
} from '@/plugins/univer-excel/util'

/**
 * 处理univer cellData数据，并返回新的渲染数据
 * 注意，这里的参数都已经是拷贝过的副本，可以进行直接操作
 * @param {*} univerInfo univer配置信息，可以用于初始化univer
 * @param {*} dataList 已经请求的数据集数据
 */
export default function cellDataConverter(univerInfo, dataList, dataset) {
  // 这里优化一下，循环遍历所有sheets进行赋值

  univerInfo.sheetOrder.forEach(key => {
    // 获取每一个sheet
    const sheet = univerInfo.sheets[key]
    const noEmptyCellData = clearEmptyInCellData(sheet.cellData)
    const newCellData = traverseAssign(noEmptyCellData, dataList, dataset)

    console.log('----------------cellDataConverter----------------')
    console.log('sheet|dataList|dataset ========>', sheet, dataList, dataset)
    console.log('cellData ========>', sheet.cellData)
    console.log('newCellData ========>', newCellData)
    console.log('-------------------------------------------------')
    sheet.cellData = newCellData
  })

  return univerInfo
}

/**
 * 遍历cellData，根据dataList生成新的cellData
 * @param {*} cellData 原始cellData数据
 * @param {*} dataList 实际传入的数据集list
 * @param {*} debug 是否打调试信息
 * @returns
 */
function traverseAssign(cellData, dataList, dataset, debug = false) {
  const newCellData = {}
  let currentRowIndex = 0 // 当前需要追加的行索引
  let totalOffset = 0 // 总偏移量
  // 遍历行
  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    const newRowData = {}
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
          const newCell = getValItemFromObjByString(cell, dataItem, dataset)
          newRow[colKey] = newCell
          debug && console.log(`更新 #Cell [${getLetter(newRowIndex, colKey)}]====>`, newCell)
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
        const newCell = parseData(cell, dataList, dataset)
        newRowData[colKey] = {
          ...calcFunction(cell, newRowIndex, colKey, cellData),
          ...newCell,
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

/******************************************处理函数*********************************************/
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

// 定义一个函数，用于计算公式使用
function calcFunction(cell, rowKey, colKey, rawCellData) {
  const currentRowNum = +rowKey
  const currentColNum = +colKey
  const { f } = cell
  if (!f || f.indexOf('=') !== 0) return cell
  // 判断如果是SUM函数，则进行计算
  if (f.indexOf('=SUM') === 0) {
    // console.log('--------------处理合计函数--------------------')
    // 提取sum函数内容字符串
    const sumStr = f.substring(5, f.length - 1)
    // 拆分函数内部字符串，如C3  || C3:C8
    const sumArr = sumStr.split(':')
    // console.log('sumArr ========>', sumArr)
    // 判断是否需要进行动态追加
    if (sumArr.length === 1) {
      // 取得第一个索引，如C3
      const cellKey = sumArr[0]
      // 获取单元格的行号和列号
      const firstCell = getCellKeyByLetter(cellKey)
      // 获取第一个单元格内容
      const firstCellValue = safeGetCell(rawCellData, firstCell.rowKey, firstCell.colKey)
      // 如果firstCellValue存在并且firstCellValue.v被#{}括号包裹，则表示是动态数据，需要追加赋值
      if (firstCellValue && isWrappedWithHashBrackets(firstCellValue.v)) {
        // 获取当前行上方单元格的字母
        const targetCell = getLetter(currentRowNum - 1, currentColNum)
        // 重组公式字符串
        const newSumStr = `=SUM(${cellKey}:${targetCell})`
        console.log('newSumStr ========>', newSumStr)
        console.log('firstCell ========>', rawCellData, firstCell, firstCellValue, targetCell)
        cell.f = newSumStr
      }
    }
    // console.log(
    //   'sum ========>',
    //   cell,
    //   getLetter(rowKey, colKey),
    //   sumStr,
    //   getCellKeyByLetter(sumStr),
    // )
    // console.log('--------------------------------------------')
  }
  return cell
}

/******************************************辅助函数*********************************************/
/**
 * 判断字符串是否被${}包裹
 * @param {*} value
 * @returns
 */
function isWrappedWithDollarBrackets(value) {
  return /\$\{([^}]+)\}/g.test(value)
}

/**
 * 判断字符串是否被#\{}包裹
 * @param {*} value
 * @returns
 */
function isWrappedWithHashBrackets(value) {
  return /#\{([^}]+)\}/g.test(value)
}

// 根据字符串获取对象中的值 ${code001.name}
function getDollarBracketsPropertys(cell) {
  const val = cell.v
  const regex = /\$\{([^}]+)\}/g
  const flag = regex.test(val)
  if (!flag) return null
  const matches = val.match(regex)
  if (matches && matches[0]) {
    // console.log('matches ========>', matches)
    const propertyName = matches[0].replace(regex, '$1')
    // console.log('propertyName ========>', propertyName)
    return propertyName.split('.')
  }
  return null
}

// 判断是否是#{} 包裹的内容，并返回flag以及解析出的propertyPath
function getHashBracketsPropertys(cell) {
  const val = cell.v
  const regex = /#\{([^}]+)\}/g
  const flag = regex.test(val)
  if (!flag) return null
  const matches = val.match(regex)

  if (matches && matches[0]) {
    // console.log('matches ========>', matches)
    const propertyName = matches[0].replace(regex, '$1')
    // console.log('propertyName ========>', propertyName)
    return propertyName.split('.')
  }
  return null
}

/**
 * 根据字符串获取对象中的值 ${code001.name}
 * @param {*} val
 * @param {*} dataObject
 * @returns
 */
function getValFromObjByString(cell, dataObject, dataset) {
  const propertyPath = getDollarBracketsPropertys(cell)
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

/**
 * 根据字符串获取对象中的值 #{}
 * @param {*} cell
 * @param {*} dataObject 单个对象
 * @param {*} dataset 数据集
 * @returns
 */
function getValItemFromObjByString(cell, dataObject, dataset) {
  const propertyPath = getHashBracketsPropertys(cell)
  const dataType = getDataTypeByPopertyPath(propertyPath, dataset)
  let value = dataObject
  if (propertyPath && propertyPath.length === 2) {
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

/**
 * 根据字符串解析的propertyPath 和数据集列表，获取对应的字段类型
 * @param {*} propertyPath
 * @param {*} dataset
 */
function getDataTypeByPopertyPath(propertyPath, dataset) {
  if (propertyPath.length !== 2) return 1 // 如果属性解析数组长度不是2，说明解析失败，默认字符串类型

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

// export function getValFromObjByString(val, dataObject) {
//   const regex = /\$\{([^}]+)\}/g
//   let result = val
//   let match
//   while ((match = regex.exec(val)) !== null) {
//     const propertyPath = match[1].split('.')
//     // console.log('propertyPath ========>', propertyPath, dataObject)
//     let currentObject = dataObject
//     for (let i = 0; i < propertyPath.length; i++) {
//       // console.log('propertyPath[i] ========>', propertyPath[i])
//       currentObject = currentObject[propertyPath[i]]
//       // console.log('currentObject ========>', currentObject)
//     }
//     result = result.replace(match[0], currentObject)
//   }

//   return result
// }
