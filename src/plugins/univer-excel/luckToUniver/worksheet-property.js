import { generateId } from '@/utils/util'
import { dataVerification } from './data-verification'

// worksheet property 处理
export function worksheetProperty(workbookData, worksheetData, luckyJson, sheet) {
  //  id    // sheet name
  if (sheet.name !== undefined) {
    worksheetData.id = `${sheet.name}`
    worksheetData.name = sheet.name
  } else {
    worksheetData.id = generateId()
  }

  // max row number
  worksheetData.rowCount = sheet.row || 200
  // max column number
  worksheetData.columnCount = sheet.column || 26

  const worksheetDataVerification = dataVerification(workbookData, worksheetData, luckyJson, sheet)

  return {
    worksheetDataVerification,
  }
}
