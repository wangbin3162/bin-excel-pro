import { deepCopy, deepMerge } from '@/utils/util'

const defaultConfig = {
  dictConfig: [],
  customScripts: {
    enable: false,
    funcBody: `// 参数说明
// univer:  univer实例,可以获取操作的univerAPI对象,可以进行控制univer表格
//    - univerAPI: univerAPI对象,可以进行控制univer表格的增删改查等操作
// data: 原始的配置对象
//    - univerInfo: 当前处理好的univer配置信息
//    - dataList: 数据集返回的数据列表
// configData: 原始的配置对象
//    - univerInfo: 原始的univer配置信息
//    - dataset: 原始数据集
//    - config: 全局配置
// utils: 帮助函数集合,包括一些辅助函数如单元格转换等
//    - util: 系统帮助函数集合如深浅拷贝
//    - helper: univer相关帮助函数,如获取单元格等
//    - dayjs: 日期辅助函数

// 示例
// const { univerAPI } = univer                     // univerAPI对象
// const workbook = univerAPI.getActiveWorkbook()   // 获取当前工作簿
// const activeSheet = workbook.workbook()          // 获取当前激活的sheet
// const cell = univer.getCellByLetter('A1')        // 获取单元格
// const { univerInfo, dataList } = data            // 当前数据集返回的数据列表
// const { dictConfig } = configData.config         // 全局字典配置
// const { dataset } = configData                   // 原始的数据集配置
// const { helper } = utils                         // univer帮助函数
// const letter = helper.getLetter(rowKey, colKey)  // 单元格转换
`,
    arguments: ['univer', 'data', 'configData', 'utils'],
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
