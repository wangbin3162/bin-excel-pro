<template>
  <div class="global-config">
    <DictConfig />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUniverStatus } from './useUniver'
import DictConfig from './components/DictConfig.vue'

const { excelData, currentRange } = useUniverStatus()
</script>

<style scoped>
.global-config {
  padding: 5px 8px;
}
</style>
