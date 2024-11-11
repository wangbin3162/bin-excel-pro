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
 * 根据单元格的字母获取单元格的行号和列号
 * @param {*} letter
 * @returns
 */
export function getCellKeyByLetter(letter) {
  let colKey = 0
  // 获取字母中的数字部分，并将其转换为整数，减去1得到行号
  let rowKey = parseInt(letter.match(/\d+$/)[0]) - 1

  // 获取字母中的字母部分
  const colPart = letter.match(/^[A-Z]+/)[0]
  let tempColKey = 0

  // 遍历字母部分，将每个字母转换为对应的数字，并计算列号
  for (let i = 0; i < colPart.length; i++) {
    const charCode = colPart.charCodeAt(i) - 64
    tempColKey += (charCode - 1) * Math.pow(26, colPart.length - 1 - i)
  }
  colKey = tempColKey

  // 返回行号和列号
  return { rowKey, colKey }
}

/**
 * 根据rowkey和colkey安全获取单元格的值
 * @param {*} cellData  单元格所有对象
 * @param {*} rowKey 目标的行索引
 * @param {*} colKey 目标列索引
 */
export function getCellDataByKey(cellData, rowKey, colKey) {
  if (cellData && cellData[rowKey] && cellData[rowKey][colKey]) {
    return cellData[rowKey][colKey]
  }
  return null
}

/**
 * 安全获取单元格的值 ,根据letter
 * @param {*} cellData  单元格所有对象
 * @param {*} letter  单元格标记 如A3
 */
export function getCellDataByLetter(cellData, letter) {
  const { rowKey, colKey } = getCellKeyByLetter(letter)
  return getCellDataByKey(cellData, rowKey, colKey)
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
      if (!isEmptyCell(cell) || (cell && cell.s)) {
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

/**
 * 根据cellData获取最大行和列
 * @param {*} cellData
 */
export function getMaxRowColumn(cellData) {
  let maxRow = 0
  let maxColumn = 0
  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    maxRow = Math.max(maxRow, Number(rowKey))
    for (const colKey in row) {
      maxColumn = Math.max(maxColumn, Number(colKey))
    }
  }
  return { maxRow, maxColumn }
}

/**
 * 根据字符串解析出单元格标识字段，如A1,B2,C3
 * @param {*} str
 * @returns
 */
export function getCellIdentifiers(str) {
  // 定义单元格范围的正则表达式
  const cellRangesRegex = /[A-Z]+\d+(?::[A-Z]+\d+)?/g
  // 定义单个单元格的正则表达式
  const singleCellRegex = /[A-Z]+\d+/g

  // 在字符串中匹配单元格范围
  const cellRangesMatches = str.match(cellRangesRegex)
  // 在字符串中匹配单个单元格
  const singleCellMatches = str.match(singleCellRegex)

  // 定义一个空数组，用于存储单元格标识
  let cellIdentifiers = []

  // 处理可能包含单元格范围的匹配结果
  if (cellRangesMatches) {
    // 将单元格范围拆分为起始和结束单元格
    cellIdentifiers = cellRangesMatches.flatMap(range => {
      if (range.includes(':')) {
        const [start, end] = range.split(':')
        return [start, end]
      } else {
        return [range]
      }
    })
  }

  // 处理单纯单个单元格标识的匹配结果
  if (singleCellMatches) {
    // 过滤掉重复的单元格标识
    const uniqueSingleCellMatches = singleCellMatches.filter((cell, index, self) => {
      return self.indexOf(cell) === index
    })
    // 将过滤后的单元格标识添加到cellIdentifiers数组中
    cellIdentifiers.push(...uniqueSingleCellMatches)
  }

  // 返回去重后的单元格标识
  return [...new Set(cellIdentifiers)]
}
