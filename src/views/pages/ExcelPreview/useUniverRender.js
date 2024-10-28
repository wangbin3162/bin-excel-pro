import { ref, toRaw, computed, onMounted, onBeforeUnmount } from 'vue'
import { newWorkbook } from '@/plugins/univer-excel/Workbook'
import { UniverPlugin } from '@/plugins/univer-excel/UniverPlugin'
import { setDatasetList } from '@/views/pages/ExcelDesign/useDataset'
import { deepCopy, fromJson } from '@/utils/util'
import { getDatasetData } from '@/api//modules/dataset.api'
import cellDataConverter from './useUniverCellData'

const status = {
  excelData: ref({
    id: '',
    name: '', // 报表名称
    datasetInfo: {}, // 数据集信息
    univerInfo: {}, // 存储的信息
    config: {}, // 全局配置
  }),
  dataList: ref({}), // 数据集数据
}

// 渲染hooks
export default function useUniverRender(isPreview = false) {
  const { excelData, dataList } = status
  let univer = null
  const containerRef = ref(null)

  // 初始化数据
  async function initData(data) {
    if (!data) return

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

  // 如果是预览模式，则执行初始化
  if (isPreview) {
    onMounted(() => {
      // 处理univer数据
      excelData.value.univerInfo = cellDataConverter(
        deepCopy(toRaw(excelData.value.univerInfo)),
        deepCopy(toRaw(dataList.value)),
      )
      univer = UniverPlugin.init(containerRef.value, {})
      univer.createSheet(excelData.value.univerInfo)
      // 事件监听
      // univer.univerAPI.getHooks().onStarting(() => {
      //   console.log('onStarting')
      // })
      // univer.univerAPI.getHooks().onReady(() => {
      //   console.log('onReady')
      // })
      // univer.univerAPI.getHooks().onRendered(() => {
      //   console.log('onRendered')
      // })
      // univer.univerAPI.getHooks().onSteady(() => {
      //   console.log('onSteady')
      // })
    })

    onBeforeUnmount(() => {
      univer?.destory()
    })
  }

  return {
    excelData,
    dataList,
    initData,
    containerRef,
  }
}
