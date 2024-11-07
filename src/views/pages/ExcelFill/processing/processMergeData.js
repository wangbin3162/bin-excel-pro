import { logTitle } from './log'

export default function processMergeData(cellData, unitId, sheetId) {
  logTitle('[3] processMergeData')
  let mergedData = []
  let currentMerge = {} // 记录对应colKey的合并单元格信息

  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    for (const colKey in row) {
      const cell = row[colKey]
      const rowIndex = Number(rowKey)
      const colIndex = Number(colKey)

      if (cell.custom && cell.custom.isDymamicMerge && cell.custom.isList) {
        // console.log('cell ========>', cell)
        if (!currentMerge[colKey]) {
          currentMerge[colKey] = {
            startRow: rowIndex,
            startColumn: colIndex,
            endRow: rowIndex,
            endColumn: colIndex,
          }
        } else {
          const sRow = currentMerge[colKey].startRow
          const sCol = currentMerge[colKey].startColumn
          if (cellData[sRow][sCol].v === cell.v) {
            currentMerge[colKey].endRow = rowIndex
            currentMerge[colKey].endColumn = colIndex
            // console.log('cell.v ========>', cell.v)
          } else {
            const currentMergeData = getMergeData(currentMerge[colKey], unitId, sheetId)
            if (currentMergeData) {
              mergedData.push(currentMergeData)
            }
            currentMerge[colKey] = {
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

  for (const key in currentMerge) {
    if (currentMerge[key]) {
      const currentMergeData = getMergeData(currentMerge[key], unitId, sheetId)
      if (currentMergeData) {
        mergedData.push(currentMergeData)
      }
    }
  }

  console.log('mergedData ========>', mergedData)
  return { mergedData }
}

// 获取合并数据
function getMergeData(currentMerge, unitId, sheetId) {
  if (
    currentMerge.endRow === currentMerge.startRow &&
    currentMerge.endColumn === currentMerge.startColumn
  ) {
    return null
  }

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
