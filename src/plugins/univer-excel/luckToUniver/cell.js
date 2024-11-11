import { CellValueType, HorizontalAlign, VerticalAlign, WrapStrategy } from '@univerjs/core'
import { fontFamilyMap } from './const/font-family'
import { generateId } from '@/utils/util'

export function cellData(workbookData, worksheetData, luckyJson, sheet) {
  // cell data
  if (sheet.celldata) {
    if (!worksheetData.cellData) {
      worksheetData.cellData = {}
    }

    for (const cellItem of sheet.celldata) {
      const { r, c } = cellItem
      if (!worksheetData.cellData[r]) {
        worksheetData.cellData[r] = {}
      }
      if (!worksheetData.cellData[r][c]) {
        worksheetData.cellData[r][c] = {}
      }

      const cell = cellItem.v
      const newCell = worksheetData.cellData[r][c]
      covertCell(newCell, cell)
    }
  }
}

export function covertCell(newCell, cell) {
  if (cell === null) return

  if (typeof cell === 'string') {
    newCell.v = cell
    return
  }

  // rich text
  if (cell?.ct?.t === 'inlineStr') {
    const textRuns = []
    let dataStream = ''
    const richTextList = cell.ct.s

    if (!richTextList) {
      return
    }

    let ed = 0
    richTextList.forEach(inlineStrItem => {
      const textStyle = {}
      covertInlineStyle(textStyle, inlineStrItem)

      const content = replaceNewlines(String(inlineStrItem.v)) || ''
      dataStream += content

      let st = ed
      ed = st + content.length

      textRuns.push({
        st,
        ed,
        ts: textStyle,
      })
    })

    dataStream += '\r\n'

    newCell.p = {
      id: generateId(),
      body: {
        dataStream,
        textRuns,
      },
      documentStyle: {},
    }
  } else {
    // content
    if (cell.v !== undefined) {
      let v = cell.v
      if (typeof v === 'boolean') {
        v = v ? 1 : 0
        newCell.t = CellValueType.BOOLEAN
      }
      newCell.v = cell.v
    } else if (cell.m !== undefined) {
      newCell.v = cell.m
    }

    if (cell.f !== undefined) {
      newCell.f = cell.f
      if (cell.f.startsWith('==')) {
        newCell.f = cell.f.slice(1)
      }
    }

    const cellStyle = {}

    covertInlineStyle(cellStyle, cell)
    covertCellStyle(cellStyle, cell)

    newCell.s = Object.assign(newCell.s || {}, cellStyle)
  }
}

export function covertInlineStyle(textStyle, inlineStrItem) {
  // font family
  if (inlineStrItem.ff !== undefined) {
    textStyle.ff = fontFamilyMap[inlineStrItem.ff]
  }

  // font color
  if (inlineStrItem.fc !== undefined) {
    textStyle.cl = {
      rgb: inlineStrItem.fc,
    }
  }

  // font size
  if (inlineStrItem.fs !== undefined) {
    textStyle.fs = Number(inlineStrItem.fs)
  }

  // bold
  if (inlineStrItem.bl !== undefined) {
    textStyle.bl = inlineStrItem.bl
  }

  // italic
  if (inlineStrItem.it !== undefined) {
    textStyle.it = inlineStrItem.it
  }

  // strikethrough
  if (inlineStrItem.cl !== undefined) {
    textStyle.st = {
      s: inlineStrItem.cl,
    }
  }

  // underline
  if (inlineStrItem.un !== undefined) {
    textStyle.ul = {
      s: inlineStrItem.un,
    }
  }
}

export function covertCellStyle(cellStyle, cell) {
  // background color
  if (cell.bg) {
    cellStyle.bg = {
      rgb: cell.bg,
    }
  }

  // vertical align
  if (cell.vt) {
    switch (String(cell.vt)) {
      case '0':
        cellStyle.vt = VerticalAlign.MIDDLE
        break
      case '1':
        cellStyle.vt = VerticalAlign.TOP
        break
      case '2':
        cellStyle.vt = VerticalAlign.BOTTOM
        break

      default:
        break
    }
  }

  // horizontal align
  if (cell.ht) {
    switch (String(cell.ht)) {
      case '0':
        cellStyle.ht = HorizontalAlign.CENTER
        break
      case '1':
        cellStyle.ht = HorizontalAlign.LEFT
        break
      case '2':
        cellStyle.ht = HorizontalAlign.RIGHT
        break

      default:
        break
    }
  }

  // vertical text
  if (cell.tr) {
    switch (cell.tr) {
      case '0':
        cellStyle.tr = {
          a: 0,
          v: 0,
        }
        break

      case '1':
        cellStyle.tr = {
          a: -45,
          v: 0,
        }
        break

      case '2':
        cellStyle.tr = {
          a: 45,
          v: 0,
        }
        break

      case '3':
        cellStyle.tr = {
          a: 0,
          v: 1,
        }
        break

      case '4':
        cellStyle.tr = {
          a: -90,
          v: 0,
        }
        break

      case '5':
        cellStyle.tr = {
          a: 90,
          v: 0,
        }
        break

      default:
        break
    }
  }

  // text wrap
  if (cell.tb) {
    switch (String(cell.tb)) {
      case '0':
        cellStyle.tb = WrapStrategy.CLIP
        break
      case '1':
        cellStyle.tb = WrapStrategy.OVERFLOW
        break
      case '2':
        cellStyle.tb = WrapStrategy.WRAP
        break

      default:
        break
    }
  }
}

function replaceNewlines(input) {
  return input.replace(/\n/g, '\r')
}
