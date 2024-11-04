import { ref, toRaw, computed, onMounted, onBeforeUnmount } from 'vue'
import { MessageBox } from 'bin-ui-design'
import { fromJson } from '@/utils/util'
import { UniverPlugin } from '@/plugins/univer-excel/UniverPlugin'
import { newWorkbook } from '@/plugins/univer-excel/Workbook'
import { setDatasetList } from '@/views/pages/ExcelDesign/useDataset'
import { setGlobalConfig } from '@/views/pages/ExcelDesign/useConfig'
import { getLetter } from '@/plugins/univer-excel/util'

const status = {
  excelData: ref({
    id: '',
    name: '', // 报表名称
    datasetInfo: {}, // 数据集信息
    univerInfo: {}, // 存储的信息
    config: {}, // 全局配置
  }),
  currentRange: ref({}),
  univer: ref({}),
}

// 报表数据状态
export function useUniverStatus() {
  const { excelData, univer, currentRange } = status

  const title = computed({
    get: () => excelData.value.name,
    set: val => {
      excelData.value.name = val
      if (excelData.value.univerInfo?.name) {
        excelData.value.univerInfo.name = val
      }
    },
  })

  const currentPosition = computed({
    get: () => {
      const { startRow, startColumn } = currentRange.value
      return `${startRow},${startColumn}`
    },
  })
  const currentLetter = computed({
    get: () => {
      const { startRow, startColumn } = currentRange.value
      return getLetter(startRow, startColumn)
    },
  })

  const config = computed(() => excelData.value?.config)

  // 字典配置
  const dictConfig = computed(() => config.value.dictConfig || [])

  function initData(data) {
    univer.value = null
    if (!data) {
      excelData.value = {
        id: '',
        name: '新的报表', // 报表名称
        datasetInfo: { list: setDatasetList() }, // 数据集信息
        univerInfo: newWorkbook({ name: '新的报表' }), // 存储的信息
        config: {}, // 全局配置
      }
      console.log('---------------新建设计--------------------', excelData.value)
    } else {
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

      console.log('---------------修改设计--------------------', excelData.value)
    }
  }

  return {
    excelData,
    currentRange,
    currentPosition,
    currentLetter,
    config,
    dictConfig,
    univer,
    title,
    initData,
  }
}

// 报表设计相关操作
export function useUniverDesign() {
  const { excelData, univer, currentRange, title } = useUniverStatus()
  const containerRef = ref(null)
  const btnLoading = ref(false)
  const activeTab = ref('base') // base, global

  onMounted(() => {
    univer.value = UniverPlugin.init(containerRef.value)
    univer.value.createSheet(excelData.value.univerInfo)
    // 监听放置功能
    univer.value.univerAPI.getSheetHooks().onCellDrop(sellDrop)

    const activeWorkbook = univer.value.univerAPI.getActiveWorkbook()
    activeWorkbook.onSelectionChange(handleSelectionChange)
  })

  onBeforeUnmount(() => {
    univer.value?.destory()
  })

  function handleSelectionChange(selection) {
    // console.log(selection)
    if (selection.length > 0) currentRange.value = selection[0]
    activeTab.value = 'base'
  }

  // 单元格放置事件
  function sellDrop({ dataTransfer, location }) {
    // console.log(dataTransfer, location, position)
    const drop = dataTransfer.getData('field')
    if (!drop) return
    const { dataset, field } = fromJson(drop, {})
    // 组装数据，根据是否是列表型 列表组装为#{}，非列表组装为${}
    const value = dataset.isList
      ? `#{${dataset.code}.${field.fieldName}}`
      : '$' + `{${dataset.code}.${field.fieldName}}`
    // console.log('dropData ========>', dataset, field, value)
    // 设置单元格的值
    const { col, row } = location
    const letter = getLetter(row, col)
    console.log(`location ========>[${letter}]`, location)
    const sheet = univer.value.univerAPI.getActiveWorkbook().getActiveSheet()
    const range = sheet.getRange(letter)
    range.setValue(value)
    range.setWrapStrategy(2)
  }

  // 导入excel
  function importExcel() {
    // univer.importExcel()
    univer.value.destoryWorkbook()
    univer.value.createSheet(newWorkbook())
  }

  // 下载
  function download() {
    univer.value.downloadExcel()
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
    if (!univer.value) return
    excelData.value.univerInfo = univer.value.getWorkBook()
  }

  return {
    activeTab,
    excelData,
    univer,
    containerRef,
    title,
    btnLoading,
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
