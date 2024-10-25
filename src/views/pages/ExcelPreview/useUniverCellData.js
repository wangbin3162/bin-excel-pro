/**
 * 处理univer cellData数据，并返回新的渲染数据
 * 注意，这里的参数都已经是拷贝过的副本，可以进行直接操作
 * @param {*} univerInfo univer配置信息，可以用于初始化univer
 * @param {*} dataList 已经请求的数据集数据
 */
export default function cellDataConverter(univerInfo, dataList) {
  // 目前暂时只处理第一个sheet的数据，后面的都会被忽略
  const { sheetOrder, sheets } = univerInfo
  const activeSheet = sheets[sheetOrder[0]]
  const { cellData } = activeSheet

  console.log('----------------cellDataConverter----------------')
  console.log('activeSheet ========>', activeSheet)
  console.log('cellData ========>', cellData)
  console.log('dataList ========>', dataList)
  console.log('-------------------------------------------------')

  clearEmptyInCellData(cellData)
}

function clearEmptyInCellData(cellData) {
  const newCellData = {}
  // 遍历行
  for (const rowKey in cellData) {
    const row = cellData[rowKey]
    console.log('row ========>', rowKey, row)
    for (const colKey in row) {
      const cell = row[colKey]
      console.log('cell ========>', colKey, cell)
    }
  }
}
