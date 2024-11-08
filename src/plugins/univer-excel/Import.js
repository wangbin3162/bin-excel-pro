import LuckyExcel from 'luckyexcel'
import { LocaleType } from '@univerjs/core'
import { DATA_VALIDATION_PLUGIN_NAME } from '@univerjs/sheets-data-validation'

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

      console.log(luckyJson)
      resolve(luckyToUniver(luckyJson))
    })
  })
}

// 根据导入的sheets生成对应的表格workbookData
function luckyToUniver(luckyJson) {
  const { info, sheets } = luckyJson

  const styles = {}
  const dataValidationData = {}

  const workbookData = {
    name: '新工作簿',
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

  workbookData.resources = [
    {
      name: DATA_VALIDATION_PLUGIN_NAME,
      data: JSON.stringify(dataValidationData),
    },
  ]

  return workbookData
}
