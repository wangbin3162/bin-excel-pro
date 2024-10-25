import { deepCopy } from '@/utils/util'

const mockData = {
  code001: {
    name: '张三',
    age: 18,
  },
  code002: {
    list: [
      { name: '王建国', age: 28, gender: '1', address: '北京', birthday: '1996-03-12' },
      { name: '李丽娟', age: 32, gender: '0', address: '上海', birthday: '1992-07-08' },
      { name: '张志强', age: 25, gender: '1', address: '广州', birthday: '1999-11-23' },
      { name: '刘美华', age: 30, gender: '0', address: '深圳', birthday: '1994-04-16' },
      { name: '陈海涛', age: 22, gender: '1', address: '成都', birthday: '2002-09-05' },
      { name: '赵晓燕', age: 35, gender: '0', address: '杭州', birthday: '1989-02-28' },
    ],
  },
}

// 根据配置的dataset集合，获取数据内容
export async function getDatasetData(dataset) {
  // 根据
  const dataList = {}

  dataset.forEach(item => {
    const { code, isList } = item
    // 从模拟数据中获取数据，如果存在，则进行拼装
    if (mockData[code]) {
      dataList[code] = isList ? deepCopy(mockData[code]) : deepCopy(mockData[code])
    }
  })
  // console.log('dataset ========>', dataset, dataList)
  return dataList
}
