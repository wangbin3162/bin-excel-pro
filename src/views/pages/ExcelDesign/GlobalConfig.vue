<template>
  <div class="global-config">
    {{ excelData }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useUniverStatus } from './useUniver'

const { excelData, currentRange } = useUniverStatus()
</script>

<style scoped>
.global-config {
  padding: 8px;
}
</style>
