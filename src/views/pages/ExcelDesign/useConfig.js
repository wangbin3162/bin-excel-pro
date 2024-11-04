import { deepCopy, deepMerge } from '@/utils/util'

const defaultConfig = {
  dictConfig: [],
}

// 获取默认数据集列表
export function getDefaultConfig() {
  return deepCopy(defaultConfig)
}

// 设置数据集
export function setGlobalConfig(cfg) {
  return deepMerge(getDefaultConfig(), cfg)
}

// 新增一个字典
export function newDict(dict = {}) {
  return deepMerge(
    {
      dictName: '', // 字典名称
      dictCode: '', // 字典编码
      mapping: [], // 字典数据
    },
    dict,
  )
}

// 新增一个字典项
export function newDictItem(dictItem = {}) {
  return deepMerge(
    {
      key: '', // 原始值
      value: '', // 映射值
    },
    dictItem,
  )
}
