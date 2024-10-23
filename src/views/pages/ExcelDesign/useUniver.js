import { ref, toRaw, computed, onMounted, onBeforeUnmount } from 'vue'
import { MessageBox } from 'bin-ui-design'
import { UniverPlugin } from '@/plugins/univer-excel/UniverPlugin'
import { newWorkbook } from '@/plugins/univer-excel/Workbook'

const status = {
  excelData: ref({
    id: '',
    name: '', // 报表名称
    datasetInfo: {}, // 数据集信息
    univerInfo: {}, // 存储的信息
    config: {}, // 全局配置
  }),
}

// 报表数据状态
export function useUniverStatus() {
  const { excelData } = status

  const title = computed({
    get: () => excelData.value.name,
    set: val => {
      excelData.value.name = val
      if (excelData.value.univerInfo?.name) {
        excelData.value.univerInfo.name = val
      }
    },
  })

  function initData(data) {
    if (!data) {
      excelData.value = {
        id: '',
        name: '新的报表', // 报表名称
        datasetInfo: {}, // 数据集信息
        univerInfo: newWorkbook({ name: '新的报表' }), // 存储的信息
        config: {}, // 全局配置
      }
      console.log('---------------新建设计--------------------', excelData.value)
    } else {
      excelData.value = {
        datasetInfo: {}, // 数据集信息
        config: {}, // 全局配置
        univerInfo: newWorkbook(), // 存储的信息
        ...data,
      }
      try {
        if (data.jsonData === '') return
        const jsonObj = JSON.parse(data.jsonData)
        if (Object.keys(jsonObj).length === 0) return
        // 数据集和配置，需要按照一定规则进行基础合并merge
        excelData.value.datasetInfo = jsonObj.datasetInfo
        excelData.value.config = jsonObj.config
        // univerInfo 从保存的内容中进行获取
        excelData.value.univerInfo = jsonObj.univerInfo
        excelData.value.jsonData = ''
        console.log('---------------修改设计--------------------', excelData.value)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {
    excelData,
    title,
    initData,
  }
}

// 报表设计相关操作
export function useUniverDesign() {
  const { excelData, title } = useUniverStatus()
  let univer = null
  const containerRef = ref(null)
  const btnLoading = ref(false)
  const isMaskShow = ref(false)

  onMounted(() => {
    univer = UniverPlugin.init(containerRef.value)
    univer.createSheet(excelData.value.univerInfo)
  })

  onBeforeUnmount(() => {
    univer?.destory()
  })

  function importExcel() {
    // univer.importExcel()
    univer.destoryWorkbook()
    univer.createSheet(newWorkbook())
  }

  function download() {
    univer.downloadExcel()
  }

  // 关闭
  function closePage() {
    MessageBox.confirm({
      type: 'warning',
      title: '提示',
      message: '关闭当前页面会丢失没有保存的操作, 是否继续?',
    })
      .then(() => {
        // 关闭当前页面
        window.close()
      })
      .catch(() => {})
  }

  // 获取最新的univer 工作簿信息
  function setUniverInfo() {
    if (!univer) return
    excelData.value.univerInfo = univer.getWorkBook()
  }

  return {
    excelData,
    univer,
    containerRef,
    title,
    btnLoading,
    isMaskShow,
    closePage,
    download,
    setUniverInfo,
    importExcel,
  }
}

// debug
export function debugStatus() {
  console.log('-------------------------------------debug--------------------------------------')
  const { excelData } = status
  const { datasetInfo, univerInfo, config } = excelData.value
  console.log('datasetInfo ========>', toRaw(datasetInfo))
  console.log('univerInfo ========>', toRaw(univerInfo))
  console.log('config ========>', toRaw(config))
  console.log('-----------------------------------debug end------------------------------------')
}
