/**
 * 样式文件的引入顺序很重要，确保你在依次引入 @univerjs/design、@univerjs/ui 的 CSS 样式后再引入其他插件的样式文件。
 */
// import '@univerjs/design/lib/index.css'
// import '@univerjs/ui/lib/index.css'
// import '@univerjs/docs-ui/lib/index.css'
// import '@univerjs/sheets-ui/lib/index.css'
// import '@univerjs/sheets-formula/lib/index.css'

import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'

import { defaultTheme } from '@univerjs/design'

import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'

import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'

import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { zhCN, enUS } from 'univer:locales'

/**
 *  Univer实例化对象
 */
export class UniverPlugin {
  static init(container) {
    return new UniverPlugin(container)
  }

  // 注册初始化，并绑定容器
  constructor(container) {
    if (!container) {
      console.error('container is required!')
      return
    }

    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: zhCN,
        [LocaleType.EN_US]: enUS,
      },
    })

    this.univer = univer // 保存实例// 注册插件

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container,
      header: true,
      toolbar: true,
      footer: true,
    })

    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)
    // sheet plugins
    univer.registerPlugin(UniverSheetsPlugin)
    univer.registerPlugin(UniverSheetsUIPlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
  }

  getInstance() {
    return this.univer
  }

  destory() {
    // this.univer?.dispose()
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

  /**
   * 保存工作表实例数据
   * @returns
   */
  saveWorkbook() {
    if (!this.workbook) {
      console.error('workbook is undefined!')
      return
    }

    const savedData = this.workbook.save()

    console.log('savedData to Json ========>', savedData.toJson())
    console.log('savedData to str ========>', JSON.stringify(savedData))

    return savedData
  }
}
