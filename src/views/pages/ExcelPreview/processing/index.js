import initBaseCellData from './initBaseCellData'
import processFormula from './processFormula'
import processMergeData from './processMergeData'
import { log, logTitle, logLine } from './log'

/**
 * 处理univer cellData数据，并返回新的渲染数据
 * 注意，这里的参数都已经是拷贝过的副本，可以进行直接操作
 * @param {*} univerInfo univer配置信息，可以用于初始化univer
 * @param {*} dataList 已经请求的数据集数据
 */
export default function cellDataConverter(univerInfo, dataList, dataset, config) {
  univerInfo.sheetOrder.forEach(sheetId => {
    // 获取每一个sheet
    const sheet = univerInfo.sheets[sheetId]
    const oriCellData = sheet.cellData
    logTitle('[0] cellDataConverter')
    log && console.log('univerInfo ========>', univerInfo)
    log && console.log('dataList ========>', dataList)
    log && console.log('dataset ========>', dataset)
    log && console.log('config ========>', config)

    const baseResult = initBaseCellData(oriCellData, dataList, dataset, config)

    const formulaResult = processFormula(
      oriCellData,
      baseResult.newCellData,
      baseResult.cellsWidthOffset,
      baseResult.cellsWithFormula,
    )

    const { mergedData } = processMergeData(baseResult.newCellData, univerInfo.id, sheetId)

    logLine()
    sheet.cellData = formulaResult.newCellData
    sheet.mergeData = [...sheet.mergeData, ...mergedData]
  })

  return univerInfo
}
