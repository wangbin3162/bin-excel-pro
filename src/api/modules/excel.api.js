import DatasourceCreate from '@/utils/datasource-create'
import { deepCopy, getUuid, getNow } from '@/utils/util'
import mockList from '@/views/demo/excel-list/mock'

const Ds = new DatasourceCreate('__UNIVER_DATASOURCE__')
const storeKey = '__univer_data__'

// 默认状态
const states = {
  excelList: deepCopy(mockList),
}

// 获取datasource
async function getDataSource(key = storeKey) {
  const store = await Ds.getStorage(key)
  if (!store) {
    return await Ds.setStorage(key, states)
  } else {
    return store
  }
}

// 设置库表
async function setStoreData(value, key = storeKey) {
  return await Ds.setStorage(key, value)
}

// --------------------------------excel list-------------------------------- //
// 获取填报列表（excel模板列表）
export async function getReportList(query) {
  const { excelList } = await getDataSource()
  return new Promise(resolve => {
    const { page, size, name, isPublish } = query
    const filterList = excelList.filter(
      i => i.name.includes(name) && (i.isPublish === isPublish || isPublish === ''),
    )
    const result = []
    let pageCount = Math.ceil(filterList.length / size)

    for (let i = 0; i < pageCount; i++) {
      let startIndex = i * size
      let endIndex = startIndex + size
      let pageItems = filterList.slice(startIndex, endIndex)
      result.push(pageItems)
    }

    setTimeout(() => {
      resolve({
        rows: result[page - 1],
        total: filterList.length,
      })
    }, 200)
  })
}

// 新增
export async function addReport(data) {
  const store = await getDataSource()

  return new Promise(resolve => {
    // 模拟新增一个填报
    const obj = deepCopy(data)
    obj.id = getUuid()
    obj.isPublish = '0'

    obj.createDate = obj.updateDate = getNow()
    store.excelList.unshift(obj)

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(obj.id)
    }, 200)
  })
}

// 移除
export async function removeReport(id) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === id)
    if (index > -1) {
      store.excelList.splice(index, 1)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

// 根据一个id，来获取一个已有的内容
export async function getReportDetail(id) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === id)
    setTimeout(() => {
      const data = index > -1 ? deepCopy(store.excelList[index]) : null
      resolve(data)
    }, 200)
  })
}

// 修改一个报表信息
export async function modifyReport(data) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === data.id)
    if (index > -1) {
      data.updateDate = getNow()
      store.excelList.splice(index, 1, data)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

// 发布当前报表
export async function publishReport(id) {
  const data = await getReportDetail(id)
  data.isPublish = '1'
  return modifyReport(data)
}
