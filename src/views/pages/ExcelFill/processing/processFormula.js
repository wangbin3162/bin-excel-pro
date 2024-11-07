import {
  getCellKeyByLetter,
  getCellDataByLetter,
  getLetter,
  getCellIdentifiers,
} from '@/plugins/univer-excel/util'
import { isWrappedWithHashBrackets } from './helper'
import { logTitle } from './log'
import { deepCopy } from '@/utils/util'
/**
 * 初始化基础单元格数据，根据univerInfo和dataList
 * @param {*} originalCellData  原始单元格数据
 * @param {*} cellData  现在的cellData
 * @param {*} dataList 已经请求的数据集数据
 * @param {*} dataset 数据集信息
 */
export default function processFormula(
  originalCellData,
  cellData,
  cellsWidthOffset,
  cellsWithFormula,
) {
  logTitle('[2] processFormula')
  const newCellData = deepCopy(cellData) // 新的单元格数据
  // 遍历带有函数的单元格
  for (const letter in cellsWithFormula) {
    calcCellFunction(letter, newCellData, originalCellData, cellsWidthOffset) // 根据当前的单元格标记获取cellData的数据
  }

  console.log('====> process result', cellData)
  return { newCellData }
}

// 计算单元格公式
function calcCellFunction(letter, cellData, rawCellData, cellsWidthOffset) {
  const { rowKey, colKey } = getCellKeyByLetter(letter)
  const cell = getCellDataByLetter(cellData, letter)
  // console.log('cell ========>', cell, letter, rowKey, colKey)
  const { f } = cell
  if (!f || f.indexOf('=') !== 0) return cell
  // 提取字段中的单元格标记
  const cellLetters = getCellIdentifiers(f)
  if (!cellLetters.length) return cell
  // 判断如果是SUM函数，则进行计算
  if (f.indexOf('=SUM(') === 0 && cellLetters.length === 1) {
    const oriCell = getCellDataByLetter(rawCellData, cellLetters[0])
    // 如果解析原有的cell被#{}括号包裹，则表示是动态数据，需要追加赋值
    if (oriCell && isWrappedWithHashBrackets(oriCell.v)) {
      const targetCell = getLetter(rowKey - 1, colKey) // 获取当前行上方单元格的字母
      const newSumStr = `=SUM(${cellLetters[0]}:${targetCell})` // 重组公式字符串
      // console.log('newSumStr ========>', newSumStr)
      // console.log('firstCell ========>', rawCellData, oriCell, targetCell)
      cell.f = newSumStr
    }
  } else {
    // 对cellLetters进行预先判定，查看是否有需要调整的（即查看有没有引用已经偏移后的值）
    const cellKeys = [] // 新的单元格标记
    cellLetters.forEach(letter => {
      let newLetter = letter
      if (cellsWidthOffset[letter]) {
        newLetter = cellsWidthOffset[letter]
      }
      //如果是生成列，则再判断一下原始cell值是否被#{}包裹，如果是，则表示是动态数据，需要追加赋值
      if (cell.custom?.isList) {
        const oriCell = getCellDataByLetter(rawCellData, letter)
        if (oriCell && isWrappedWithHashBrackets(oriCell.v)) {
          // 获取新的单元格标记
          newLetter = updateCellIndex(letter, rowKey + 1)
          // console.log('cell ========>', cell, oriCell, letter, rowKey, newLetter)
          // console.log('letter ========>', letter, rowKey, newLetter)
        }
      }
      cellKeys.push(newLetter)
    })
    // console.log('cellLetters|cellKeys ========>', cellLetters, cellKeys)
    const newF = replaceCellIdentifiers(f, cellLetters, cellKeys)
    // console.log('newF ========>', newF)
    // console.log('--------------------------------------------')
    cell.f = newF
  }
}

// 更新单元格索引，如C3 => C4
function updateCellIndex(cellIdentifier, newIndex) {
  // console.log('newIndex ========>', newIndex)
  const matchs = cellIdentifier.match(/[A-Z]+/)
  if (matchs && matchs[0]) {
    const letters = matchs[0]
    return `${letters}${newIndex}`
  }
  return cellIdentifier
}

// 根据单元格标记对公式进行替换操作
function replaceCellIdentifiers(originalString, cellIdentifierArray, convertedCellIdentifierArray) {
  let newString = originalString
  for (let i = 0; i < cellIdentifierArray.length; i++) {
    const originalCellIdentifier = cellIdentifierArray[i]
    const convertedCellIdentifier = convertedCellIdentifierArray[i]
    newString = newString.replace(originalCellIdentifier, convertedCellIdentifier)
  }
  return newString
}
