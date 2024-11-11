import LuckyExcel from 'luckyexcel'
import { LocaleType } from '@univerjs/core'
import { DATA_VALIDATION_PLUGIN_NAME } from '@univerjs/sheets-data-validation'
import { worksheetProperty } from './worksheet-property'

// 导入excel
export async function importExcelToUninver(file) {
  return new Promise(resolve => {
    LuckyExcel.transformExcelToLucky(file, luckyJson => {
      if (!luckyJson.sheets || luckyJson.sheets.length === 0) {
        console.error(
          'Failed to read the content of the excel file, currently does not support xls files!',
        )
        resolve(false)
        return
      }

      // console.log(luckyJson)
      resolve(luckyToUniver(luckyJson))
    })
  })
}

// 根据导入的sheets生成对应的表格workbookData
function luckyToUniver(luckyJson) {
  const { info, sheets } = luckyJson
  console.log('--------------------------------------------')
  console.log('info ========>', info)
  console.log('sheets ========>', sheets)
  console.log('--------------------------------------------')

  const styles = {}
  const dataValidationData = {}

  const workbookData = {
    name: info.name,
    locale: LocaleType.ZH_CN,
    styles,
    sheetOrder: ['sheet1'],
    sheets: {
      sheet1: {
        id: 'sheet1',
        name: 'Sheet1',
        freeze: { xSplit: 1, ySplit: 1, startRow: 1, startColumn: 1 },
        columnCount: 26,
        rowCount: 200,
        cellData: {
          0: {
            0: {
              v: '测试',
            },
          },
        },
      },
    },
  }

  if (Array.isArray(sheets)) {
    workbookData.sheetOrder = []
    workbookData.sheets = {}
    // 遍历导入的sheets
    for (let sheet of sheets) {
      console.log('sheet ========>', sheet)
      const worksheetData = {}

      const { worksheetDataVerification } = worksheetProperty(
        workbookData,
        worksheetData,
        luckyJson,
        sheet,
      )

      const sheetKey = worksheetData.id

      if (worksheetDataVerification && worksheetDataVerification.length > 0) {
        dataValidationData[sheetKey] = worksheetDataVerification
      }

      workbookData.sheets[sheetKey] = worksheetData
      workbookData.sheetOrder.push(sheetKey)
    }
  }

  workbookData.resources = [
    {
      name: DATA_VALIDATION_PLUGIN_NAME,
      data: JSON.stringify(dataValidationData),
    },
  ]

  return workbookData
}
