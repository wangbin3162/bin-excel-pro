<template>
  <div class="univer-sheet" ref="containerRef">univer-sheet</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { UniverPlugin } from './UniverPlugin'

const emit = defineEmits(['onRendered'])
const props = defineProps({
  // IWorkbookData 工作簿快照数据，用于初始化
  data: {
    type: Object,
    default: () => ({}),
  },
  pluginsConfig: {
    type: Object,
    default: () => ({}),
  },
  uiConfig: {
    type: Object,
    default: () => ({
      header: true,
      toolbar: true,
      footer: true,
      contextMenu: true,
    }),
  },
  // 选区事件改变
  onSelectionChange: {
    type: Function,
  },
  // 单元格事件监听列表
  onCellPointerMove: {
    type: Function,
  },
  onCellPointerOver: {
    type: Function,
  },
  onCellDragOver: {
    type: Function,
  },
  onCellDrop: {
    type: Function,
  },
})

const containerRef = ref(null)

const univerPlugin = ref(null)

// 监听事件列表回执
let eventsDisposables = []
let cellEventsDisposables = []
let renderDisposable = null

onMounted(() => {
  init()
})

function init() {
  univerPlugin.value = UniverPlugin.init(containerRef.value, props.pluginsConfig, props.uiConfig)
  univerPlugin.value.createSheet(props.data)

  const univerAPI = univerPlugin.value.univerAPI
  const sheetHooks = univerAPI.getSheetHooks()

  // 事件监听
  if (props.onSelectionChange) {
    const activeWorkbook = univerAPI.getActiveWorkbook()
    eventsDisposables.push(activeWorkbook.onSelectionChange(props.onSelectionChange))
  }

  // 单元格事件在鼠标更改坐标时触发
  if (props.onCellPointerMove) {
    cellEventsDisposables.push(sheetHooks.onCellPointerMove(props.onCellPointerMove))
  }
  // 单元格事件在鼠标移动到单元格的边界时触发
  if (props.onCellPointerOver) {
    cellEventsDisposables.push(sheetHooks.onCellPointerOver(props.onCellPointerOver))
  }
  // 单元格事件在拖动元素或文本到单元格的边界时触发
  if (props.onCellDragOver) {
    cellEventsDisposables.push(sheetHooks.onCellDragOver(props.onCellDragOver))
  }
  // 单元格事件在拖动元素或文本到单元格上释放时触发
  if (props.onCellDrop) {
    cellEventsDisposables.push(sheetHooks.onCellDrop(props.onCellDrop))
  }

  // 渲染事件监听
  renderDisposable = univerAPI.getHooks().onRendered(() => {
    emit('onRendered')
  })
}

/**
 * Get workbook data
 */
const getData = () => {
  return univerPlugin.value.getWorkBookData()
}

onBeforeUnmount(() => {
  renderDisposable?.dispose()
  renderDisposable = null
  eventsDisposables.forEach(disp => disp.dispose())
  eventsDisposables = []
  cellEventsDisposables.forEach(disp => disp.dispose())
  cellEventsDisposables = []
  // univerPlugin.value?.destory()
  univerPlugin.value = null
})

defineExpose({
  getData,
  univerPlugin,
})
</script>

<style scoped>
.univer-sheet {
  width: 100%;
  height: 100%;
}
</style>
