import { getCellsByRange, getLetter, getCellKeyByLetter } from '@/plugins/univer-excel/util'
import { logTitle } from './log'

/**
 * 数据校验的处理
 * @param {*} validation  校验数据
 * @param {*} cellsWidthOffset 单元格移动的偏移量
 * @param {*} sheetId sheetId
 * @returns
 */
export default function processValidation(validation, cellsWidthOffset, sheetId) {
  logTitle('[4] processValidation')

  const newValidation = []
  const currentValidation = validation[sheetId] || []
  if (currentValidation.length > 0) {
    currentValidation.forEach(valid => {
      // console.log('valid ========>', valid)
      // 遍历ranges，查看是否包含了移动的单元格
      valid.ranges.forEach(range => {
        const rangeCells = getCellsByRange(range).map(cell => getLetter(cell.row, cell.col))
        // console.log('rangeCells ========>', range, rangeCells, cellsWidthOffset)
        rangeCells.forEach(cell => {
          if (cellsWidthOffset[cell]) {
            const { rowKey, colKey } = getCellKeyByLetter(cellsWidthOffset[cell])
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
