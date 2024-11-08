<template>
  <div class="sheet-container">
    <div class="sheet-excel">
      <UniverSheet ref="univerSheetRef" v-if="isShow" :data="univerInfo" @onRendered="onRendered" />
    </div>
  </div>
</template>

<script setup>
import { toRaw } from 'vue'
import { deepCopy, fromJson } from '@/utils/util'
import UniverSheet from '@/plugins/univer-excel/UniverSheet.vue'
import useUniverStore from '@/views/pages/ExcelDesign/hooks/useUniverStore'
import cellDataConverter from '@/views/pages/ExcelPreview/processing'
import { useUniverScripts } from '@/views/pages/ExcelPreview/hooks/useUniverScripts'

const { excelData, rawData, dataList, univerSheetRef, uniPlugin, isShow, univerInfo } =
  useUniverStore(true)

let rawConfig = null
let rawDataset = null
let rawDataList = null

function initData() {
  // 缓存4个原始数据
  const rawUniverInfo = deepCopy(toRaw(excelData.value.univerInfo))
  rawConfig = deepCopy(toRaw(excelData.value.config))
  rawDataList = deepCopy(toRaw(dataList.value))
  rawDataset = deepCopy(toRaw(excelData.value.datasetInfo.list))
  // 处理univer数据
  excelData.value.univerInfo = cellDataConverter(rawUniverInfo, rawDataList, rawDataset, rawConfig)
}

initData()

// 渲染完成
function onRendered() {
  const configData = {
    univerInfo: fromJson(rawData.value.univerInfo, {}),
    dataset: rawDataset,
    config: rawConfig,
  }
  const data = {
    univerInfo: toRaw(excelData.value.univerInfo),
    dataList: rawDataList,
  }
  console.log('onRendered ========>', configData, data)
  useUniverScripts(toRaw(uniPlugin.value), configData, data)
}
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
