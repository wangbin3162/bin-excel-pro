import { getCellsByRange, getLetter, getCellKeyByLetter } from '@/plugins/univer-excel/util'
import { logTitle } from './log'

export default function processValidation(validation, cellsWithFormula, sheetId) {
  logTitle('[4] processValidation')

  const newValidation = []
  const currentValidation = validation[sheetId] || []
  if (currentValidation.length > 0) {
    currentValidation.forEach(valid => {
      // console.log('valid ========>', valid)
      // 遍历ranges，查看是否包含了移动的单元格
      valid.ranges.forEach(range => {
        const rangeCells = getCellsByRange(range).map(cell => getLetter(cell.row, cell.col))

        // console.log('rangeCells ========>', range, rangeCells, cellsWithFormula)

        rangeCells.forEach(cell => {
          if (cellsWithFormula[cell]) {
            const { rowKey, colKey } = getCellKeyByLetter(cellsWithFormula[cell])
            // 如果有匹配的，那就重新添加对应的验证
            newValidation.push({
              ...valid,
              ranges: [
                {
                  ...range,
                  startRow: rowKey,
                  endRow: rowKey,
                  startColumn: colKey,
                  endColumn: colKey,
                },
              ],
            })
          }
        })
      })
    })
  }

  console.log('newValidation', newValidation)
  return newValidation
}
