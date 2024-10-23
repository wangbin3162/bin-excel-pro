/**
 * 导出一个函数，用于获取字母
 * @param {String|Number} cellKey 单元格的列号
 * @param {String|Number} rowKey  单元格的行号
 * @returns
 */
export function getLetter(cellKey, rowKey) {
  const cellKeyNum = Number(cellKey)
  const rowKeyNum = Number(rowKey)
  // 将cellKey转换为字母
  let letter = String.fromCharCode(65 + cellKeyNum)
  // 如果rowKey大于0，则将字母与rowKey+1拼接
  if (rowKeyNum >= 0) {
    letter = letter + (rowKeyNum + 1)
  }
  // 返回拼接后的字母
  return letter
}

/**
 * 根据插件名称获取当前sheet的配置
 * @param {*} resources   //插件资源
 * @param {*} sheetId     // 当前sheet的id
 * @param {*} pluginName  //插件名称
 * @returns
 */
export function getCurrentSheetPlugin(resources, sheetId, pluginName) {
  const plugin = resources.find(item => item.name === pluginName)
  if (!plugin) {
    // console.log('====>未找到插件', pluginName)
    return null
  }

  try {
    const allCfg = JSON.parse(plugin.data)
    if (!allCfg || Object.keys(allCfg).length === 0) {
      // console.log('====>插件没有配置', pluginName)
      return null
    }
    const currentCfg = allCfg[sheetId]
    if (!currentCfg) {
      // console.log('====>未找到当前sheet的配置', sheetId)
      return null
    }
    return currentCfg
  } catch (error) {
    console.log('====>插件json转换错误', error)
    return null
  }
}

export function getCellsByRange(range) {
  const { startRow, startColumn, endRow, endColumn } = range

  const cells = []

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startColumn; col <= endColumn; col++) {
      cells.push({ row, col })
    }
  }
  return cells
}
