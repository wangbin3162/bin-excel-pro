<template>
  <div class="base-config">
    <b-form label-width="65px" label-position="left">
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
      <b-divider></b-divider>
      <b-form-item label="动态合并">
        <b-space>
          <b-switch v-model="isDymamicMerge" @change="changeMerge" size="small"></b-switch>

          <b-tooltip content="设置为动态合并后，单元格的合并区域会根据内容自动调整" theme="light">
            <b-icon name="question-circle"></b-icon>
          </b-tooltip>
        </b-space>
      </b-form-item>

      {{ currentCell }}
      <b-divider></b-divider>
      {{ isDymamicMerge }}
    </b-form>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useUniverStatus } from './useUniver'

const { univer, currentRange, currentPosition, currentLetter } = useUniverStatus()

const currentCell = ref({})

const isDymamicMerge = ref(false)

// 选区变化事件
function rangeChange({ startRow, startColumn }) {
  if (!univer.value) return
  // console.log(startRow, startColumn)
  const cellData = univer.value.getCell(startRow, startColumn)
  currentCell.value = cellData.cell
  // console.log('cellData ========>', cellData)
  isDymamicMerge.value = currentCell.value.custom?.isDymamicMerge || false
}

// 值改变
async function changeValue() {
  const { startRow, startColumn } = currentRange.value
  univer.value.setCell(startRow, startColumn, currentCell.value)
  await nextTick()
  rangeChange({ startRow, startColumn })
}

// 值清空
function clearCell() {
  const { startRow, startColumn } = currentRange.value
  univer.value.setCell(startRow, startColumn, '')
  currentCell.value = {}
}

// 动态合并
function changeMerge(val) {
  const { startRow, startColumn } = currentRange.value
  univer.value.setCell(startRow, startColumn, {
    ...currentCell.value,
    custom: { isDymamicMerge: val },
  })
}

// 监听选区变化，如果有变化则获取值
watch(
  () => currentRange.value,
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
</style>
