import DatasourceCreate from '@/utils/datasource-create'
import { deepCopy, getUuid } from '@/utils/util'
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

// --------------------------------escel list-------------------------------- //
// 获取填报列表（excel模板列表）
export async function getExcelList(query) {
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

// 获取填报列表（excel模板列表）
export async function removeTemplate(id) {
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
export async function getTempDetail(id) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === id)
    setTimeout(() => {
      const data = index > -1 ? deepCopy(store.excelList[index]) : null
      resolve(data)
    }, 200)
  })
}

// 修改一个填报表单信息
export async function modifyTemplate(data) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === data.id)
    if (index > -1) {
      store.excelList.splice(index, 1, data)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

// 发布当前报表
export async function publishTemplate(id) {
  const data = await getTempDetail(id)
  data.isPublish = '1'
  return modifyTemplate(data)
}
