import { ref, toRaw, onMounted, onBeforeUnmount, computed } from 'vue'
import { newWorkbook } from '@/plugins/univer-excel/Workbook'
import { UniverPlugin } from '@/plugins/univer-excel/UniverPlugin'
import { deepCopy, fromJson } from '@/utils/util'
import { getDatasetData } from '@/api/modules/dataset.api'

import { setDatasetList } from '../../ExcelDesign/hooks/useDataset'
import cellDataConverter from '../processing'
import { useUniverScripts } from './useUniverScripts'
// import { getMaxRowColumn } from '@/plugins/univer-excel/util'

const status = {
  excelData: ref({
    id: '',
    name: '', // 报表名称
    datasetInfo: {}, // 数据集信息
    univerInfo: {}, // 存储的信息
    config: {}, // 全局配置
  }),
  dataList: ref({}), // 数据集数据
  univer: ref({}),
  rawData: ref({}), // 原始数据
}

// 渲染hooks
export default function useUniverRender(isPreview = false) {
  const { excelData, univer, rawData, dataList } = status
  const containerRef = ref(null)

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

  // 初始化数据
  async function initData(data) {
    univer.value = null

    if (!data) return
    rawData.value = data

    excelData.value = {
      ...data,
      datasetInfo: {},
      univerInfo: newWorkbook(),
      config: {},
    }
    dataList.value = {}

    // 数据集和配置，需要按照一定规则进行基础合并merge
    const dsInfo = fromJson(data.datasetInfo, {})
    excelData.value.datasetInfo.list = setDatasetList(dsInfo.list || [])
    // config
    const config = fromJson(data.config, {})
    excelData.value.config = config
    //  univerInfo
    const univerInfo = fromJson(data.univerInfo, {})
    excelData.value.univerInfo = univerInfo

    await getDatasetInfo()
    // console.log('---------------预览报表-------------------')
    // console.log('excelData.value ========>', excelData.value)
    // console.log('dataList.value ========>', dataList.value)
  }

  // 根据预览请求返回的数据集信息，请求返回实际数据集返回的字段
  async function getDatasetInfo() {
    try {
      dataList.value = await getDatasetData(excelData.value.datasetInfo.list)
    } catch (error) {
      console.log(error)
    }
  }

  // 下载
  function download() {
    univer.value.downloadExcel()
  }

  // 关闭
  function closePage() {
    window.close()
  }

  // 如果是预览模式，则执行初始化
  if (isPreview) {
    onMounted(async () => {
      // 缓存4个原始数据
      const rawUniverInfo = deepCopy(toRaw(excelData.value.univerInfo))
      const rawConfig = deepCopy(toRaw(excelData.value.config))
      const rawDataList = deepCopy(toRaw(dataList.value))
      const rawDataset = deepCopy(toRaw(excelData.value.datasetInfo.list))
      // 处理univer数据
      excelData.value.univerInfo = cellDataConverter(
        rawUniverInfo,
        rawDataList,
        rawDataset,
        rawConfig,
      )
      univer.value = UniverPlugin.init(
        containerRef.value,
        {},
        {
          header: false,
          toolbar: false,
          footer: false,
          contextMenu: false,
        },
      )

      // const sheetKey = excelData.value.univerInfo.sheetOrder[0]
      // const sheet = excelData.value.univerInfo.sheets[sheetKey]
      // 获取最大行列
      // const { maxRow, maxColumn } = getMaxRowColumn(sheet.cellData)
      // sheet.rowCount = maxRow
      // sheet.columnCount = maxColumn

      await univer.value.createSheet(excelData.value.univerInfo)
      univer.value.disableEdit()

      // 事件监听
      univer.value.univerAPI.getHooks().onRendered(() => {
        const configData = {
          univerInfo: fromJson(rawData.value.univerInfo, {}),
          dataset: rawDataset,
          config: rawConfig,
        }
        const data = {
          univerInfo: toRaw(excelData.value.univerInfo),
          dataList: rawDataList,
        }
        useUniverScripts(toRaw(univer.value), configData, data)
      })
    })

    onBeforeUnmount(() => {
      univer.value?.destory()
    })
  }

  return {
    excelData,
    rawData,
    dataList,
    initData,
    config,
    dictConfig,
    customScripts,
    containerRef,
    closePage,
    download,
  }
}
