import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Message, MessageBox } from 'bin-ui-design'
import { UniverPlugin } from '@/plugins/univer-excel/UniverPlugin'
import { newWorkbook } from '@/plugins/univer-excel/Workbook'

const status = {
  excelData: ref({
    id: '',
    name: '', // 报表名称
    jsonData: [], // 存储的信息
    config: {
      mapping: [], // 全局的映射
    }, // 全局配置
  }),
}

// 报表相关操作
export default function useUniver() {
  const { excelData } = status

  let univer = null
  const containerRef = ref(null)
  const btnLoading = ref(false)
  const isMaskShow = ref(false)

  const title = computed({
    get: () => excelData.value.name,
    set: val => (excelData.value.name = val),
  })

  onMounted(() => {
    univer = UniverPlugin.init(containerRef.value)
    univer.createSheet(newWorkbook())
  })

  onBeforeUnmount(() => {
    univer?.destory()
  })

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

  return { excelData, univer, containerRef, title, btnLoading, isMaskShow, closePage, download }
}
