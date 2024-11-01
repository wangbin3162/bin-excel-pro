import {
  getCellKeyByLetter,
  getCellDataByLetter,
  getLetter,
  getCellIdentifiers,
} from '@/plugins/univer-excel/util'
import { logTitle } from './log'
import { deepCopy } from '@/utils/util'

export default function processMergeData(cellData, unitId, sheetId) {
  logTitle('[3] processMergeData')
  let mergedData = []
  let currentMerge = null

  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    for (const colKey in row) {
      const cell = row[colKey]
      const rowIndex = Number(rowKey)
      const colIndex = Number(colKey)

      if (cell.custom && cell.custom.isDymamicMerge && cell.custom.isList) {
        if (!currentMerge) {
          currentMerge = {
            startRow: rowIndex,
            startColumn: colIndex,
            endRow: rowIndex,
            endColumn: colIndex,
          }
        } else {
          if (cellData[currentMerge.startRow][currentMerge.startColumn].v === cell.v) {
            currentMerge.endRow = rowIndex
            currentMerge.endColumn = colIndex
          } else {
            const currentMergeData = getMergeData(currentMerge, unitId, sheetId)
            if (currentMergeData) {
              mergedData.push(currentMergeData)
            }
            currentMerge = {
              startRow: rowIndex,
              startColumn: colIndex,
              endRow: rowIndex,
              endColumn: colIndex,
            }
          }
        }
      }
    }
  }

  if (currentMerge) {
    const currentMergeData = getMergeData(currentMerge, unitId, sheetId)
    if (currentMergeData) {
      mergedData.push(currentMergeData)
    }
  }

  console.log('mergedData ========>', mergedData)
  return { mergedData }
}

// 获取合并数据
function getMergeData(currentMerge, unitId, sheetId) {
  if (
    currentMerge.endRow !== currentMerge.startRow ||
    currentMerge.endColumn !== currentMerge.startColumn
  ) {
    return {
      startRow: currentMerge.startRow,
      startColumn: currentMerge.startColumn,
      endRow: currentMerge.endRow,
      endColumn: currentMerge.endColumn,
      unitId,
      sheetId,
      rangeType: 0,
    }
  }
  return null
}
