import { deepCopy, deepMerge } from '@/utils/util'

// 默认配置
const defaultConfig = {
  type: 'render', // fill 填报类型，render 渲染类型
  dictConfig: [],
  // 渲染脚本
  customScripts: {
    enable: false,
    funcBody: `console.log('univer ========>', univer)
console.log('utils ========>', utils)
console.log('configData ========>', configData)
console.log('data ========>', data)`,
    arguments: ['univer', 'utils', 'configData', 'data'],
  },
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
