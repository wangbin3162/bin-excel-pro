import initBaseCellData from './initBaseCellData'
import processFormula from './processFormula'
import processMergeData from './processMergeData'
import { log, logTitle, logLine } from './log'
import { DATA_VALIDATION_PLUGIN_NAME } from '@univerjs/sheets-data-validation'
import { fromJson } from '@/utils/util'
import processValidation from './processValidation'

/**
 * 处理univer cellData数据，并返回新的渲染数据
 * 注意，这里的参数都已经是拷贝过的副本，可以进行直接操作
 * @param {*} univerInfo univer配置信息，可以用于初始化univer
 * @param {*} dataList 已经请求的数据集数据
 */
export default function cellDataConverter(univerInfo, dataList, dataset, config) {
  const dataValidIndex = univerInfo.resources.findIndex(i => i.name === DATA_VALIDATION_PLUGIN_NAME)
  const dataValid = univerInfo.resources[dataValidIndex]
  const validation = fromJson(dataValid?.data, '{}')
  console.log('validation ========>', validation)

  const newDataValid = {}
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

    // 处理数据验证
    const newValidation = processValidation(validation, baseResult.cellsWidthOffset, sheetId)
    newDataValid[sheetId] = newValidation

    logLine()
    sheet.cellData = formulaResult.newCellData
    sheet.mergeData = [...sheet.mergeData, ...mergedData]
  })

  // 设置回原有resource
  if (dataValidIndex !== -1) {
    univerInfo.resources.splice(dataValidIndex, 1, {
      name: DATA_VALIDATION_PLUGIN_NAME,
      data: JSON.stringify(newDataValid),
    })
  }
  return univerInfo
}
