import initBaseCellData from './initBaseCellData'
import processFormula from './processFormula'
import { log, logTitle, logLine } from './log'

/**
 * 处理univer cellData数据，并返回新的渲染数据
 * 注意，这里的参数都已经是拷贝过的副本，可以进行直接操作
 * @param {*} univerInfo univer配置信息，可以用于初始化univer
 * @param {*} dataList 已经请求的数据集数据
 */
export default function cellDataConverter(univerInfo, dataList, dataset) {
  univerInfo.sheetOrder.forEach(key => {
    // 获取每一个sheet
    const sheet = univerInfo.sheets[key]
    const oriCellData = sheet.cellData
    logTitle('[0] cellDataConverter')
    log && console.log('univerInfo ========>', univerInfo)

    const { newCellData, cellsWidthOffset, cellsWithFormula } = initBaseCellData(
      oriCellData,
      dataList,
      dataset,
    )

    processFormula(oriCellData, newCellData, cellsWidthOffset, cellsWithFormula)

    logLine()
    sheet.cellData = newCellData
  })

  return univerInfo
}
