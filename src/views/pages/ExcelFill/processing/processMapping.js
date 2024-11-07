import { deepCopy } from '@/utils/util'

/**
 * 处理映射
 */
export function processMapping(cell, dictConfig) {
  const newCell = deepCopy(cell)
  // 判断单元格是否使用了映射
  if (newCell.custom && newCell.custom.useMapping && newCell.custom.useMapping.length > 0) {
    // console.log('----------------使用了映射-------------', newCell.custom.useMapping, dictConfig)

    const mapping = getMappingValue(newCell.custom.useMapping, dictConfig)
    // console.log('mapping ========>', mapping, newCell)

    // 获取转换值
    const value = mapping[newCell.v]
    // console.log('value ========>', value)
    if (value) {
      newCell.v = value
    }
  }

  return newCell
}

// 获取映射值
function getMappingValue(dictCode, dictConfig) {
  const dict = dictConfig.find(item => item.dictCode === dictCode)
  const mapping = {}
  if (dict) {
    dict.mapping.forEach(item => {
      mapping[item.key] = item.value
    })
  }
  return mapping
}
