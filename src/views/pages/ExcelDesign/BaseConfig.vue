<template>
  <div class="base-config">
    <b-form label-width="60px" label-position="left">
      {{ currentRange }}
      <b-form-item label="坐标">
        <b-space>
          <b-input readonly :model-value="currentLetter" />
          <b-input readonly :model-value="currentPosition" />
        </b-space>
      </b-form-item>
      <b-form-item label="值"></b-form-item>
    </b-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUniverStatus } from './useUniver'

const { excelData, univer, currentRange, currentPosition, currentLetter } = useUniverStatus()

const value = ref('')

// 选区变化事件
function rangeChange({ startRow, startColumn, endColumn, endRow }) {
  if (!univer.value) return
  // console.log(startRow, startColumn)
  const cell = univer.value.getCell(startRow, startColumn)

  const cell2 = univer.value.getCell('A3')
  console.log(cell, cell2)
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
