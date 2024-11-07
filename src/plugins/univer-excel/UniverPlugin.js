import './custom-theme.css'
import { LocaleType, Univer, UniverInstanceType, LogLevel } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import {
  UniverSheetsPlugin,
  // 工作簿权限
  WorkbookEditablePermission,
  WorkbookCreateSheetPermission,
  // 工作表权限
  WorksheetSetRowStylePermission,
  WorksheetSetColumnStylePermission,
  WorksheetSetCellValuePermission,
  WorksheetSetCellStylePermission,
  WorksheetPivotTablePermission,
  WorksheetInsertRowPermission,
  WorksheetInsertColumnPermission,
  WorksheetDeleteRowPermission,
  WorksheetDeleteColumnPermission,
} from '@univerjs/sheets'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
// sheet feature plugins
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsFormulaUIPlugin } from '@univerjs/sheets-formula-ui'
import { zhCN } from 'univer:locales'
import { FUniver } from '@univerjs/facade'
// 数字格式
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
// 查找替换
import { UniverFindReplacePlugin } from '@univerjs/find-replace'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
// 连接
import { UniverSheetsHyperLinkPlugin } from '@univerjs/sheets-hyper-link'
import { UniverSheetsHyperLinkUIPlugin } from '@univerjs/sheets-hyper-link-ui'
// filter
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter'
import { UniverSheetsFilterUIPlugin } from '@univerjs/sheets-filter-ui'
// drawing
import { UniverDrawingPlugin } from '@univerjs/drawing'
import { UniverDrawingUIPlugin } from '@univerjs/drawing-ui'
import { UniverSheetsDrawingPlugin } from '@univerjs/sheets-drawing'
import { UniverSheetsDrawingUIPlugin } from '@univerjs/sheets-drawing-ui'
// 数据验证
import { UniverDataValidationPlugin } from '@univerjs/data-validation'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsDataValidationUIPlugin } from '@univerjs/sheets-data-validation-ui'

import { exportExcel } from './Export'

// 默认插件配置
const defaultCfg = {
  showNumfmt: true,
  showFind: true,
  showLink: true,
  showFilter: true,
  showDrawing: true,
  showValidation: true,
}

/**
 *  Univer实例化对象
 */
export class UniverPlugin {
  static init(container, cfg = {}, ui = {}) {
    return new UniverPlugin(container, cfg, ui)
  }

  // 注册初始化，并绑定容器
  constructor(container, cfg = {}, ui = {}) {
    if (!container) {
      console.error('container is required!')
      return
    }

    cfg = { ...defaultCfg, ...cfg }
    ui = {
      header: true,
      toolbar: true,
      footer: true,
      contextMenu: true,
      ...ui,
    }

    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: zhCN,
      },
      logLevel: LogLevel.SILENT,
    })
    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin)
    // ui plugins
    univer.registerPlugin(UniverUIPlugin, {
      container,
      ...ui,
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)
    univer.registerPlugin(UniverSheetsPlugin)
    univer.registerPlugin(UniverSheetsUIPlugin)

    // sheet feature plugins
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    univer.registerPlugin(UniverSheetsFormulaUIPlugin)
    if (cfg.showNumfmt) {
      univer.registerPlugin(UniverSheetsNumfmtPlugin)
    }
    if (cfg.showFind) {
      // find replace
      univer.registerPlugin(UniverFindReplacePlugin)
      univer.registerPlugin(UniverSheetsFindReplacePlugin)
    }
    if (cfg.showLink) {
      // hyper link
      univer.registerPlugin(UniverSheetsHyperLinkPlugin)
      univer.registerPlugin(UniverSheetsHyperLinkUIPlugin)
    }
    if (cfg.showFilter) {
      // filter
      univer.registerPlugin(UniverSheetsFilterPlugin)
      univer.registerPlugin(UniverSheetsFilterUIPlugin)
    }
    if (cfg.showDrawing) {
      // drawing
      univer.registerPlugin(UniverDrawingPlugin)
      univer.registerPlugin(UniverDrawingUIPlugin)
      univer.registerPlugin(UniverSheetsDrawingPlugin)
      univer.registerPlugin(UniverSheetsDrawingUIPlugin)
    }
    if (cfg.showValidation) {
      // data validation
      univer.registerPlugin(UniverDataValidationPlugin)
      univer.registerPlugin(UniverSheetsDataValidationPlugin)
      univer.registerPlugin(UniverSheetsDataValidationUIPlugin)
    }

    this.univer = univer // 保存实例
    this.univerAPI = FUniver.newAPI(univer) // 注册插件
  }

  // 销毁
  destory() {
    this.destoryWorkbook()
    this.univer = null
    this.workbook = null
  }

  // 销毁工作簿
  destoryWorkbook() {
    const activeWorkbook = this.univerAPI.getActiveWorkbook()
    const unitId = activeWorkbook && activeWorkbook.getId()
    if (unitId) {
      this.univerAPI.disposeUnit(unitId)
    }
  }

  /**
   * 创建一个工作簿
   * @param {*} data 一个IWorkbookData 类型的数据对象
   */
  createSheet(data = {}) {
    this.workbook = this.univer.createUnit(UniverInstanceType.UNIVER_SHEET, data)

    // 默认只有一个工作表
    const permission = this.univerAPI.getPermission()
    const activeWorkbook = this.univerAPI.getActiveWorkbook()
    const unitId = activeWorkbook && activeWorkbook.getId()

    if (unitId) {
      // 禁用工作簿编辑
      permission.setWorkbookPermissionPoint(unitId, WorkbookCreateSheetPermission, false)
    }

    return this.workbook
  }

  // 禁用工作簿编辑
  disableEdit() {
    const permission = this.univerAPI.getPermission()
    // 获取unitId和sheetId
    const activeWorkbook = this.univerAPI.getActiveWorkbook()
    const unitId = activeWorkbook && activeWorkbook.getId()
    const sheetId = activeWorkbook.getActiveSheet().getSheetId()
    console.log('disableEdit', unitId, sheetId)
    // 禁用弹窗
    permission.setPermissionDialogVisible(false)
    if (unitId) {
      // 禁用工作簿编辑
      permission.setWorkbookPermissionPoint(unitId, WorkbookEditablePermission, false)
      if (sheetId) {
        const disabledList = [
          WorksheetSetRowStylePermission,
          WorksheetSetColumnStylePermission,
          WorksheetSetCellValuePermission,
          WorksheetSetCellStylePermission,
          WorksheetPivotTablePermission,
          WorksheetInsertRowPermission,
          WorksheetInsertColumnPermission,
          WorksheetDeleteRowPermission,
          WorksheetDeleteColumnPermission,
        ]
        disabledList.forEach(item => {
          permission.setWorksheetPermissionPoint(unitId, sheetId, item, false)
        })
      }
    }
  }

  // 获取工作簿数据
  getWorkBook() {
    const activeWorkbook = this.univerAPI.getActiveWorkbook()
    const saveData = activeWorkbook.save()
    console.log('ActiveWorkBook ========>', saveData)
    return saveData
  }

  // 获取选区
  getRange(startRow = 0, startColumn = 0, width = 1, height = 1) {
    const activeSheet = this.univerAPI.getActiveWorkbook().getActiveSheet()
    const range = activeSheet.getRange(startRow, startColumn, width, height)
    return range
  }

  // 根据字符获取选区如 A1或者A1:B2
  getRangeByLetter(letter) {
    const activeSheet = this.univerAPI.getActiveWorkbook().getActiveSheet()
    const range = activeSheet.getRange(letter)
    return range
  }

  // 获取当前选区的第一个单元格range
  getCellRange(startRow = 0, startColumn = 0) {
    const range = this.getRange(startRow, startColumn, 1, 1)
    return range
  }

  // 获取当前选区的所有单元格
  getCellsByRange(startRow = 0, startColumn = 0, width = 1, height = 1) {
    const range = this.getRange(startRow, startColumn, width, height)
    const cells = []
    range.forEach((row, column, cell) => {
      cells.push({
        row,
        column,
        cell,
      })
    })
    return cells
  }

  // 根据letter获取所有单元格
  getCellsByLetter(letter) {
    const range = this.getRangeByLetter(letter)
    const cells = []
    range.forEach((row, column, cell) => {
      cells.push({
        row,
        column,
        cell,
      })
    })
    return cells
  }

  // 获取一个单元格
  getCell(startRow = 0, startColumn = 0) {
    const cells = this.getCellsByRange(startRow, startColumn, 1, 1)
    return cells[0]
  }

  // 根据letter获取一个单元格
  getCellByLetter(letter) {
    const cells = this.getCellsByLetter(letter)
    return cells[0]
  }

  // 设置区域的值
  setRange(row, column, width = 1, height = 1, cellValue) {
    const range = this.getRange(row, column, width, height)
    range.setValue(cellValue)
  }

  // 设置单元格的值
  setCell(row, column, cellValue) {
    const range = this.getCell(row, column)
    range.setValue(cellValue)
  }

  // 根据letter设置单元格的值
  setCellByLetter(letter, cellValue) {
    const range = this.getRangeByLetter(letter)
    range.setValue(cellValue)
  }

  // 获取所有工作表数据
  getAllSheets() {
    const sheets = this.getWorkBook().sheets
    // console.log('AllSheets ========>', sheets)
    return sheets
  }

  // 下载Excel
  downloadExcel() {
    const workbook = this.getWorkBook()
    exportExcel(workbook)
  }
}
