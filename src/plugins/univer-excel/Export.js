import { getNow } from '@/utils/util'
import Excel from 'exceljs'
import FileSaver from 'file-saver'

const downloadFile = true

const HEIGHT_RATIO = 0.75
const WIDTH_RATIO = 0.15

/**
 * 核心导出excel 函数
 * @param {*} workbookData
 */
export function exportExcel(workbookData) {
  return new Promise(resolve => {
    // 1.创建工作簿，可以为工作簿添加属性
    const workbook = new Excel.Workbook()
    // 遍历sheet对象
    Object.keys(workbookData.sheets).forEach(key => {
      // 获取每一个sheet
      const sheet = workbookData.sheets[key]
      console.log(sheet)
      // 2.创建工作表
      const worksheet = workbook.addWorksheet(sheet.name)

      // 3.设置工作表属性
      // 设置默认行高和列宽
      worksheet.properties.defaultRowHeight = sheet.defaultRowHeight * HEIGHT_RATIO
      worksheet.properties.defaultColWidth = sheet.defaultColumnWidth * WIDTH_RATIO

      const mergeData = sheet.mergeData || [] //合并单元格
      const rowData = sheet.rowData || [] //行数据
      const columnData = sheet.columnData || {} //列数据
      const frozen = sheet.freeze || {} //冻结

      const hide = sheet.hidden //工作表 sheet 1隐藏
      if (hide === 1) {
        worksheet.state = 'hidden'
      }

      setStyleAndValue(sheet.cellData, worksheet, workbookData.styles)
      setBorder(sheet.cellData, worksheet, workbookData.styles)
      setMerge(mergeData, worksheet) //合并单元格
      setColumnWidth(columnData, worksheet) //设置列宽
      setRowHeight(rowData, worksheet) //设置行高
      setFrozen(frozen, worksheet) //设置冻结
      setRowHidden(rowData, worksheet) //设置行隐藏
      setColHidden(columnData, worksheet) //设置列隐藏
      return true
    })

    // 4.写入 buffer
    if (!downloadFile) return true

    const buffer = workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: 'application/vnd.ms-excel;charset=utf-8',
      })
      console.log('导出成功！')
      resolve(true)
      FileSaver.saveAs(blob, `${workbookData.name}_${getNow()}.xlsx`)
    })
    return buffer
  })
}

/**
 * 设置带样式的值
 * @param {*} cellData 单元格值
 * @param {*} worksheet 工作表
 * @param {*} styles  全局样式
 */
const setStyleAndValue = (cellData, worksheet, styles) => {
  const cellKeys = Object.keys(cellData)
  if (cellKeys.length === 0) return

  // 遍历行
  cellKeys.forEach(rowKey => {
    const row = cellData[rowKey]
    // 遍历列
    Object.keys(row).forEach(cellKey => {
      // 获取单元格
      const cell = row[cellKey]
      const style = styles[cell.s] || {}
      let letter = createCellPos(cellKey) + (+rowKey + 1)
      let target = worksheet.getCell(letter)
      // console.log(`cell ========>[${letter}]`, cell, style)

      const fill = fillConvert(style) //填充颜色
      if (fill) target.fill = fill
      const font = fontConvert(style) //字体
      if (font) target.font = font
      const alignment = alignmentConvert(style)
      if (alignment) target.alignment = alignment
      // 设置值
      let value = setValue(cell)
      target.value = value
    })
  })
}

const setBorder = (cellData, worksheet, styles) => {
  const cellKeys = Object.keys(cellData)
  if (cellKeys.length === 0) return
  // 遍历行
  cellKeys.forEach(rowKey => {
    const row = cellData[rowKey]
    // 遍历列
    Object.keys(row).forEach(cellKey => {
      // 获取单元格
      const cell = row[cellKey]
      const style = styles[cell.s] || {}
      let letter = createCellPos(cellKey) + (+rowKey + 1)
      let target = worksheet.getCell(letter)
      if (style.bd && Object.keys(style.bd).length) {
        console.log(`setBorder ========>[${letter}]`, cell, style)
        const border = borderConvert(style.bd)
        if (border) target.border = border
      }
    })
  })
}

function borderConvert(bd) {
  const { t, b, l, r, tl_br, bl_tr } = bd // 上下左右边框
  const S = {
    1: 'thin',
    2: 'dotted',
    3: 'thin',
    4: 'dashed',
    5: 'dashDot',
    6: 'dashDotDot',
    // 7: 'medium',
    8: 'medium',
    9: 'mediumDashed',
    10: 'mediumDashDotDot',
    13: 'thick',
  }
  const border = {}
  if (t) {
    border.top = {
      style: S[t.s] || 'thin',
      color: {
        argb: color2Hex(t.cl.rgb) || '000000',
      },
    }
  }
  if (b) {
    border.bottom = {
      style: S[b.s] || 'thin',
      color: {
        argb: color2Hex(b.cl.rgb) || '000000',
      },
    }
  }
  if (l) {
    border.left = {
      style: S[l.s] || 'thin',
      color: {
        argb: color2Hex(l.cl.rgb) || '000000',
      },
    }
  }
  if (r) {
    border.right = {
      style: S[r.s] || 'thin',
      color: {
        argb: color2Hex(r.cl.rgb) || '000000',
      },
    }
  }
  if (tl_br) {
    border.diagonal = {
      up: false,
      down: true,
      style: S[tl_br.s] || 'thin',
      color: {
        argb: color2Hex(tl_br.cl.rgb) || '000000',
      },
    }
  }
  if (bl_tr) {
    border.diagonal = {
      up: true,
      down: false,
      style: S[bl_tr.s] || 'thin',
      color: {
        argb: color2Hex(bl_tr.cl.rgb) || '000000',
      },
    }
  }

  if (Object.keys(border).length === 0) return null

  return border
}

/**
 * 列宽
 * @param {*} columnWidth
 * @param {*} worksheet
 */
const setColumnWidth = (columnData, worksheet) => {
  columnData.forEach((col, i) => {
    console.log('col', col)
    worksheet.getColumn(i + 1).width = col.w * WIDTH_RATIO
  })
}

/**
 * 列隐藏
 * @param columnData
 * @param worksheet
 */
const setColHidden = (columnData = [], worksheet) => {
  columnData.forEach((col, i) => {
    if (col.hd === 1) worksheet.getColumn(i + 1).hidden = true
  })
}

/**
 * 行隐藏
 * @param rowData
 * @param worksheet
 */
const setRowHidden = (rowData = [], worksheet) => {
  rowData.forEach((row, i) => {
    if (row.hd === 1) worksheet.getRow(i + 1).hidden = true
  })
}

/**
 * 行高
 * @param {*}rowData  行数据
 * @param {*} worksheet 工作表
 * @param {*}excelType 导出类型 office:excel  wps: wps
 */
const setRowHeight = (rowData, worksheet, excelType = 'wps') => {
  //导出的文件用wps打开和用excel打开显示的行高大一倍
  rowData.forEach((row, i) => {
    const ratio = excelType === 'wps' ? HEIGHT_RATIO : WIDTH_RATIO * 2
    worksheet.getRow(i + 1).height = row.h * ratio
  })
}

/**
 * 冻结行列
 * @param frozen
 * @param worksheet
 */
const setFrozen = (frozen = {}, worksheet) => {
  worksheet.views = [{ state: 'frozen', ...frozen }]
}

/**
 * 合并单元格
 * @param {*} mergeData
 * @param {*} worksheet
 */
const setMerge = (mergeData = [], worksheet) => {
  mergeData.forEach(merge => {
    // elem格式：{startRow, startColumn, endRow,endColumn, cs: 2}
    const { startRow, startColumn, endRow, endColumn } = merge
    // 按开始行，开始列，结束行，结束列合并（相当于 K10:M12）
    worksheet.mergeCells(startRow + 1, startColumn + 1, endRow + 1, endColumn + 1)
  })
}

// 根据数据格式类型或者富文本来设置值
function setValue(cell) {
  // 原始值v，类型t，公式f
  const { v, t, f, p } = cell
  let value = ''
  if (f) {
    value = { formula: f, result: v }
  } else if (p) {
    const { body } = p
    const txt = body.dataStream
    const pgs = body.paragraphs
    // 富文本
    let richText = []
    // 根据pgs来截取多个文本内容值
    let lastIndex = 0
    for (let i = 0; i < pgs.length; i++) {
      const { startIndex } = pgs[i]
      const t = txt.substring(lastIndex, startIndex)
      richText.push({
        text: t,
      })
      lastIndex = startIndex
    }

    value = {
      richText: richText,
    }
  } else {
    // 根据类型处理value值
    if (cell.v !== undefined && cell.v !== '') {
      let val = t === 2 ? +v : v
      if (isNaN(v)) val = v
      value = val
    }
  }

  return value
}

// 设置背景颜色
function fillConvert(style) {
  if (!style || !style.bg || !style.bg.rgb) return null
  const bg = style.bg.rgb
  let fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {
      argb: color2Hex(bg),
    },
  }
  return fill
}

// 设置文字相关颜色
function fontConvert(style) {
  if (!style) return null
  const ff = style.ff
  const fs = style.fs // 字体大小
  const it = style.it // 斜体
  const bl = style.bl // 粗体
  const ul = style.ul?.s // 下划线
  const st = style.st?.s // 删除线
  const fc = style.cl?.rgb // 字体颜色

  const font = {}

  if (ff) font.name = ff
  if (fs) font.size = fs
  if (it === 1) font.italic = true
  if (bl === 1) font.bold = true
  if (ul === 1) font.underline = true
  if (st === 1) font.strike = true
  if (fc) {
    font.color = {
      argb: color2Hex(fc),
    }
  }

  if (Object.keys(font).length === 0) return null

  return font
}

// 设置对其方式
function alignmentConvert(style) {
  if (!style) return null
  const ToExcel = {
    horizontal: {
      1: 'left',
      2: 'center',
      3: 'right',
    },
    vertical: {
      1: 'top',
      2: 'middle',
      3: 'bottom',
    },
    wrapText: {
      1: false,
      2: false,
      3: true,
    },
  }
  const { ht, vt, tb, tr } = style
  const alignment = {}
  if (ht) alignment.horizontal = ToExcel.horizontal[ht]
  if (vt) alignment.vertical = ToExcel.vertical[vt]
  if (tb) alignment.wrapText = ToExcel.wrapText[tb]
  if (tr) alignment.textRotation = tr.a

  if (Object.keys(alignment).length === 0) return null
  return alignment
}

function colorRGBtoHex(color) {
  color = color.replace('rgb', '').replace('(', '').replace(')', '')
  let rgb = color.split(',')
  let r = parseInt(rgb[0])
  let g = parseInt(rgb[1])
  let b = parseInt(rgb[2])
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function color2Hex(color) {
  return color.startsWith('#') ? color.replace('#', '') : colorRGBtoHex(color).replace('#', '')
}

function createCellPos(n) {
  let ordA = 'A'.charCodeAt(0)
  let ordZ = 'Z'.charCodeAt(0)
  let len = ordZ - ordA + 1
  let s = ''
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s
    n = Math.floor(n / len) - 1
  }
  return s
}
