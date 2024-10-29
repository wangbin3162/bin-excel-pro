import { isEmpty } from '@/utils/util'
import { isEmptyCell } from '@univerjs/core'

/**
 * 获取单元格的列名如 A,B,C AA
 * @param {*} colKey
 * @returns
 */
export function getCellColName(colKey) {
  let index = Number(colKey)
  let ordA = 'A'.charCodeAt(0) // 65
  let ordZ = 'Z'.charCodeAt(0) //90
  let len = ordZ - ordA + 1 // 26
  let s = ''
  while (index >= 0) {
    s = String.fromCharCode((index % len) + ordA) + s
    index = Math.floor(index / len) - 1
  }
  return s
}

/**
 * 导出一个函数，用于获取字母
 * @param {String|Number} rowKey  单元格的行号
 * @param {String|Number} colKey 单元格的列号
 * @returns
 */
export function getLetter(rowKey, colKey) {
  const rowKeyNum = Number(rowKey)
  // 将cellKey转换为字母
  let letter = getCellColName(colKey)
  // 如果rowKey大于0，则将字母与rowKey+1拼接
  if (rowKeyNum >= 0) {
    letter = letter + (rowKeyNum + 1)
  }
  // 返回拼接后的字母
  return letter
}

/**
 * 根据插件名称获取当前sheet的配置
 * @param {*} resources   //插件资源
 * @param {*} sheetId     // 当前sheet的id
 * @param {*} pluginName  //插件名称
 * @returns
 */
export function getCurrentSheetPlugin(resources, sheetId, pluginName) {
  const plugin = resources.find(item => item.name === pluginName)
  if (!plugin) {
    // console.log('====>未找到插件', pluginName)
    return null
  }

  try {
    const allCfg = JSON.parse(plugin.data)
    if (!allCfg || Object.keys(allCfg).length === 0) {
      // console.log('====>插件没有配置', pluginName)
      return null
    }
    const currentCfg = allCfg[sheetId]
    if (!currentCfg) {
      // console.log('====>未找到当前sheet的配置', sheetId)
      return null
    }
    return currentCfg
  } catch (error) {
    console.log('====>插件json转换错误', error)
    return null
  }
}

/**
 * 根据一个起始-结束位置获取一个选区
 * @param {*} range
 * @returns
 */
export function getCellsByRange(range) {
  const { startRow, startColumn, endRow, endColumn } = range
  const cells = []
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startColumn; col <= endColumn; col++) {
      cells.push({ row, col })
    }
  }
  return cells
}

/**
 * 判断字符串是否被${}包裹
 * @param {*} value
 * @returns
 */
export function isWrappedWithDollarBrackets(value) {
  return /^\$\{.*\}$/.test(value)
}

/**
 * 判断字符串是否被#\{}包裹
 * @param {*} value
 * @returns
 */
export function isWrappedWithHashBrackets(value) {
  return /#\{([^}]+)\}/g.test(value)
}

/**
 * 根据字符串获取对象中的值 ${code001.name}
 * @param {*} val
 * @param {*} dataObject
 * @returns
 */
export function getValFromObjByString(val, dataObject) {
  const regex = /\$\{([^}]+)\}/g
  let result = val
  let match
  while ((match = regex.exec(val)) !== null) {
    const propertyPath = match[1].split('.')
    // console.log('propertyPath ========>', propertyPath, dataObject)
    let currentObject = dataObject
    for (let i = 0; i < propertyPath.length; i++) {
      // console.log('propertyPath[i] ========>', propertyPath[i])
      currentObject = currentObject[propertyPath[i]]
      // console.log('currentObject ========>', currentObject)
    }
    result = result.replace(match[0], currentObject)
  }

  return result
}

/**
 * 根据字符串获取对象中的值 #{}
 * @param {*} val
 * @param {*} dataObject 单个对象
 * @returns
 */
export function getValItemFromObjByString(val, dataObject) {
  const newCellValue = val.replace(/#\{([^}]+)\}/g, (match, propertyName) => {
    const propertyPath = propertyName.split('.')
    let value = dataObject
    if (propertyPath.length === 2) {
      value = dataObject[propertyPath[1]]
    }

    return value
  })
  return newCellValue
}

/**
 * 格式化cellData，将空值去掉
 * @param {*} cellData
 * @returns
 */
export function clearEmptyInCellData(cellData) {
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
