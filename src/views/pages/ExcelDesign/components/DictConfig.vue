<template>
  <div>
    字典配置
    {{ config }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUniverStatus } from '../useUniver'

const { excelData } = useUniverStatus()

const config = computed(() => {
  return excelData.value?.config
})
</script>

<style scoped></style>
