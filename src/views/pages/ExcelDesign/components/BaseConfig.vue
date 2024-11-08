<template>
  <div class="base-config">
    <b-form label-width="64px" label-position="left">
      <b-form-item label="坐标">
        <b-space>
          <b-input readonly :model-value="currentLetter" />
          <b-input readonly :model-value="currentPosition" />
        </b-space>
      </b-form-item>
      <b-form-item label="值">
        <b-input
          v-model="currentCell.v"
          :disabled="currentCell.f && currentCell.f.length > 0"
          clearable
          @enter="changeValue"
          @blur="changeValue"
          @clear="clearCell"
        />
      </b-form-item>
      <b-form-item label="公式">
        <b-input v-model="currentCell.f" type="textarea" @enter="changeValue" @blur="changeValue" />
      </b-form-item>
      <b-divider style="margin: 12px 0" />

      <b-form-item label="映射转换">
        <template #label>
          <b-tooltip content="开启转换后，选择字典，渲染时会自动进行映射转换。" theme="light">
            <label class="underline-help">映射转换</label>
          </b-tooltip>
        </template>

        <b-select v-model="useMapping" clearable @change="changeMapping">
          <b-option
            v-for="item in dictConfig"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode"
          ></b-option>
        </b-select>
      </b-form-item>
      <b-divider style="margin: 12px 0" />

      <b-form-item label="动态合并">
        <template #label>
          <b-tooltip content="设置为动态合并后，单元格的合并区域会根据内容自动调整." theme="light">
            <label class="underline-help">动态合并</label>
          </b-tooltip>
        </template>

        <b-switch v-model="isDymamicMerge" @change="changeMerge" size="small"></b-switch>
      </b-form-item>
    </b-form>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import { getLetter } from '@/plugins/univer-excel/util'
import useUniverStore from '../hooks/useUniverStore'

const props = defineProps({
  currentRange: {
    type: Object,
    default: () => ({}),
  },
})

const currentPosition = computed({
  get: () => {
    const { startRow, startColumn } = props.currentRange
    return `${startRow},${startColumn}`
  },
})

const currentLetter = computed({
  get: () => {
    const { startRow, startColumn } = props.currentRange
    return getLetter(startRow, startColumn)
  },
})

const { uniPlugin, dictConfig } = useUniverStore()

const currentCell = ref({}) // 当前单元格cell

const isDymamicMerge = ref(false) // 动态合并
const useMapping = ref('') // 使用映射转换

// 选区变化事件
function rangeChange({ startRow, startColumn }) {
  if (!uniPlugin.value) return
  // console.log(startRow, startColumn)
  const cellData = uniPlugin.value.getCell(startRow, startColumn)
  currentCell.value = cellData.cell
  // console.log('cellData ========>', cellData)
  isDymamicMerge.value = currentCell.value.custom?.isDymamicMerge || false
  useMapping.value = currentCell.value.custom?.useMapping || ''
}

// 值改变 v
async function changeValue() {
  const { startRow, startColumn } = props.currentRange
  uniPlugin.value.setCell(startRow, startColumn, currentCell.value)
  await nextTick()
  rangeChange({ startRow, startColumn })
}

// 值清空 v
function clearCell() {
  const { startRow, startColumn } = props.currentRange
  uniPlugin.value.setCell(startRow, startColumn, '')
  currentCell.value = {}
}

// 动态合并
function changeMerge(val) {
  const { startRow, startColumn } = props.currentRange
  uniPlugin.value.setCell(startRow, startColumn, {
    ...currentCell.value,
    custom: { isDymamicMerge: val },
  })
}

// 映射转换
function changeMapping(val) {
  const { startRow, startColumn } = props.currentRange
  uniPlugin.value.setCell(startRow, startColumn, {
    ...currentCell.value,
    custom: { useMapping: val },
  })
}

// 监听选区变化，如果有变化则获取值
watch(
  () => props.currentRange,
  val => rangeChange(val),
  { deep: true },
)
</script>

<style scoped>
.base-config {
  padding: 8px 12px;
  :deep(.bin-form-item) {
    margin-bottom: 12px;
  }
}
.underline-help {
  text-decoration: underline dotted;
  cursor: help;
}
</style>
