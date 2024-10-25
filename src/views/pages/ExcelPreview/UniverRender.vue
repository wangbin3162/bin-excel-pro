<template>
  <div class="sheet-container">
    <div id="SheetContainer" class="sheet-excel" ref="containerRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUniverRender from './useUniverRender'

const { excelData, containerRef } = useUniverRender(true)
</script>

<style scoped>
.sheet-container {
  position: relative;
  width: 100%;
  height: 100%;
  .sheet-excel {
    width: 100%;
    height: 100%;
  }
}
</style>
