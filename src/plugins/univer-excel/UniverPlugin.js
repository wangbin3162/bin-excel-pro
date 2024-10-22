import './custom-theme.css'
import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverSheetsPlugin } from '@univerjs/sheets'
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

/**
 *  Univer实例化对象
 */
export class UniverPlugin {
  static init(container) {
    return new UniverPlugin(container, {
      showNumfmt: true,
      showFind: false,
      showLink: false,
      showFilter: true,
      showDrawing: true,
      showValidation: true,
    })
  }

  // 注册初始化，并绑定容器
  constructor(
    container,
    cfg = {
      showNumfmt: true,
      showFind: true,
      showLink: true,
      showFilter: true,
      showDrawing: true,
      showValidation: true,
    },
  ) {
    if (!container) {
      console.error('container is required!')
      return
    }

    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: zhCN,
      },
    })
    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, { container })
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

    this.univer = univer // 保存实例// 注册插件
    this.univerAPI = FUniver.newAPI(univer)
  }

  getInstance() {
    return this.univer
  }

  destory() {
    this.univer?.dispose()
    this.univer = null
    this.workbook = null
  }

  /**
   * 创建一个工作簿
   * @param {*} data 一个IWorkbookData 类型的数据对象
   */
  createSheet(data = {}) {
    this.workbook = this.univer.createUnit(UniverInstanceType.UNIVER_SHEET, data)
    return this.workbook
  }

  // 获取工作簿数据
  getWorkBook() {
    const activeWorkbook = this.univerAPI.getActiveWorkbook()
    const saveData = activeWorkbook.save()
    console.log('activeWorkBook ========>', saveData)
    return saveData
  }

  // 获取所有工作表数据
  getAllSheets() {
    const sheets = this.getWorkBook().sheets
    console.log('AllSheets ========>', sheets)
    return sheets
  }

  // 下载Excel
  downloadExcel() {
    const workbook = this.getWorkBook()
    exportExcel(workbook)
  }
}
