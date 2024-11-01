import { deepCopy, deepMerge } from '@/utils/util'

// 默认数据集
const defaultDatasetList = [
  {
    id: 'dataset01',
    name: '对象型数据集',
    code: 'code001',
    isList: false,
    fields: [
      { fieldName: 'name', fieldTitle: '姓名', type: 'string' },
      { fieldName: 'age', fieldTitle: '年龄', type: 'number' },
    ],
  },
  {
    id: 'dataset02',
    name: '列表型数据集',
    code: 'code002',
    isList: true,
    fields: [
      { fieldName: 'name', fieldTitle: '姓名', type: 'string' },
      { fieldName: 'gender', fieldTitle: '性别', type: 'string' },
      { fieldName: 'age', fieldTitle: '年龄', type: 'number' },
      { fieldName: 'address', fieldTitle: '地址', type: 'string' },
      { fieldName: 'birthday', fieldTitle: '生日', type: 'date' },
      { fieldName: 'age', fieldTitle: '年龄', type: 'number' },
      { fieldName: 'chinese', fieldTitle: '语文成绩', type: 'number' },
      { fieldName: 'maths', fieldTitle: '数学成绩', type: 'number' },
      { fieldName: 'english', fieldTitle: '英语成绩', type: 'number' },
    ],
  },
]

// 获取默认数据集列表
export function getDefaultDatasetList() {
  return deepCopy(defaultDatasetList)
}

// 设置数据集
export function setDatasetList(datasetList) {
  return deepMerge(getDefaultDatasetList(), datasetList)
}

// 创建数据集列表
export function newDataset(dataset = {}) {
  return deepMerge(
    {
      id: '',
      name: '',
      code: '',
      isList: false,
      fields: [],
    },
    dataset,
  )
}

// 新增一个字段
export function newField(field = {}) {
  return deepMerge(
    {
      fieldName: '',
      fieldTitle: '',
      type: 'string',
    },
    field,
  )
}
