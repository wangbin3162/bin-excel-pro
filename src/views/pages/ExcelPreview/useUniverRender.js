import { ref, toRaw, computed, onMounted, onBeforeUnmount } from 'vue'
import { newWorkbook } from '@/plugins/univer-excel/Workbook'
import { UniverPlugin } from '@/plugins/univer-excel/UniverPlugin'
import { setDatasetList } from '@/views/pages/ExcelDesign/useDataset'
import { fromJson } from '@/utils/util'

const status = {
  excelData: ref({
    id: '',
    name: '', // 报表名称
    datasetInfo: {}, // 数据集信息
    univerInfo: {}, // 存储的信息
    config: {}, // 全局配置
  }),
}

// 渲染hooks
export default function useUniverRender(isPreview = false) {
  let univer = null
  const { excelData } = status
  const containerRef = ref(null)

  function initData(data) {
    if (!data) return

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
    excelData.value.config = config
    //  univerInfo
    const univerInfo = fromJson(data.univerInfo, {})
    excelData.value.univerInfo = univerInfo
    console.log('---------------预览报表-------------------', excelData.value)
  }

  if (isPreview) {
    onMounted(() => {
      univer = UniverPlugin.init(containerRef.value)
      univer.createSheet(excelData.value.univerInfo)
    })

    onBeforeUnmount(() => {
      univer?.destory()
    })
  }

  return {
    excelData,
    initData,
    containerRef,
  }
}
