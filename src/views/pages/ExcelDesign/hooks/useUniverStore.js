import { ref, toRaw, computed } from 'vue'
import { deepCopy, fromJson } from '@/utils/util'
import { newWorkbook } from '@/plugins/univer-excel/Workbook'
import { clearEmptyInCellData } from '@/plugins/univer-excel/util'
import { setDatasetList } from './useDataset'
import { setGlobalConfig } from './useConfig'

const status = {
  excelData: ref({
    id: '',
    name: '', // 报表名称
    datasetInfo: {}, // 数据集信息
    univerInfo: {}, // 存储的信息
    config: {}, // 全局配置
  }),
  isShow: ref(false), // 是否展示univer-sheet 组件
  dataList: ref({}), // 数据集数据
  rawData: ref({}), // 原始数据
  univerSheetRef: ref({}), // univerSheetRef 组件引用
}

/**
 * univer store 装填信息
 * @returns
 */
export default function useUniverStore() {
  const { univerSheetRef, excelData, isShow, dataList, rawData } = status

  const title = computed({
    get: () => excelData.value.name,
    set: val => {
      excelData.value.name = val
      if (excelData.value.univerInfo?.name) {
        excelData.value.univerInfo.name = val
      }
    },
  })
  const config = computed({
    get: () => excelData.value.config || {},
    set: val => (excelData.value.config = val),
  })
  // 字典配置
  const dictConfig = computed({
    get: () => excelData.value.config.dictConfig || [],
    set: val => (excelData.value.config.dictConfig = val),
  })
  // 自定义脚本
  const customScripts = computed({
    get: () => excelData.value.config.customScripts || {},
    set: val => (excelData.value.config.customScripts = val),
  })
  // univer配置信息
  const univerInfo = computed({
    get: () => excelData.value.univerInfo || {},
    set: val => (excelData.value.univerInfo = val),
  })

  const uniPlugin = computed(() =>
    univerSheetRef.value ? univerSheetRef.value.univerPlugin : null,
  )

  function initData(data) {
    univerSheetRef.value = null
    isShow.value = false
    if (!data) {
      rawData.value = null
      excelData.value = {
        id: '',
        name: '新的报表', // 报表名称
        datasetInfo: { list: setDatasetList() }, // 数据集信息
        univerInfo: newWorkbook({ name: '新的报表' }), // 存储的信息
        config: {}, // 全局配置
      }
    } else {
      rawData.value = data
      excelData.value = {
        ...data,
        datasetInfo: {},
        univerInfo: newWorkbook(),
        config: {},
      }

      // 数据集和配置，需要按照一定规则进行基础合并merge
      const dsInfo = fromJson(data.datasetInfo, {})
      excelData.value.datasetInfo.list = setDatasetList(dsInfo.list || [])
      // config
      const config = fromJson(data.config, {})
      excelData.value.config = setGlobalConfig(config)
      //  univerInfo
      const univerInfo = fromJson(data.univerInfo, {})
      excelData.value.univerInfo = univerInfo
    }
    isShow.value = true
  }

  // 关闭
  function closePage() {
    window.close()
  }

  // debug
  function debugStatus() {
    console.log('-------------------------------------debug--------------------------------------')
    const { excelData } = status
    const { datasetInfo, univerInfo, config } = excelData.value
    console.log('datasetInfo ========>', toRaw(datasetInfo))
    console.log('univerInfo ========>', toRaw(univerInfo))
    console.log('config ========>', toRaw(config))
    console.log('-----------------------------------debug end------------------------------------')
  }

  // 下载
  function download() {
    uniPlugin.value.downloadExcel()
  }

  // 获取更新数据，这里处理后，去除空值等条件，在进行更新
  function getUpdateData() {
    const getData = uniPlugin.value.getWorkBookData()
    const univerInfo = deepCopy(getData)
    univerInfo.sheetOrder.forEach(key => {
      // 获取每一个sheet
      const sheet = univerInfo.sheets[key]
      sheet.cellData = clearEmptyInCellData(sheet.cellData)
    })
    excelData.value.univerInfo = univerInfo
    return univerInfo
  }

  return {
    univerSheetRef,
    uniPlugin,
    title,
    config,
    dictConfig,
    customScripts,
    univerInfo,
    // 共享数据状态
    excelData,
    isShow,
    dataList,
    rawData,
    // 共享函数
    initData,
    closePage,
    debugStatus,
    download,
    getUpdateData,
  }
}
