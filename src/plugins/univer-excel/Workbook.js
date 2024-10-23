import { deepCopy, deepMerge, getUuid } from '@/utils/util'
import { LocaleType } from '@univerjs/core'

const workbookData = {
  name: '新工作簿',
  locale: LocaleType.ZH_CN,
  styles: {},
  sheetOrder: ['sheet1'],
  sheets: {
    sheet1: {
      id: 'sheet1',
      name: 'Sheet1',
      // freeze: { xSplit: 1, ySplit: 1, startRow: -1, startColumn: -1 },
      freeze: { xSplit: 1, ySplit: 1, startRow: 1, startColumn: 1 },
      rowCount: 400,
      cellData: {
        0: {
          0: {
            v: 123,
          },
        },
      },
    },
  },
}

// 新建一个工作簿
export function newWorkbook(data) {
  return deepMerge(deepCopy(workbookData), {
    id: getUuid(),
    ...data,
  })
}
