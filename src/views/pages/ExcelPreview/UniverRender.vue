<template>
  <div class="sheet-container">
    <div class="sheet-header">
      <div class="left">
        <h3>{{ excelData.name }}</h3>
      </div>
      <div class="right">
        <b-space>
          <b-button type="primary" size="small" icon="logout" plain @click="handleDownload">
            导出Excel
          </b-button>
          <b-divider type="vertical"></b-divider>
          <b-button type="danger" size="small" plain icon="close" @click="closePage">关闭</b-button>
        </b-space>
      </div>
    </div>
    <div class="sheet-body">
      <div class="sheet-excel">
        <UniverSheet
          ref="univerSheetRef"
          v-if="isShow"
          :data="univerInfo"
          :ui-config="{
            header: false,
            toolbar: false,
            footer: false,
            contextMenu: false,
          }"
          @onRendered="onRendered"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRaw } from 'vue'
import { deepCopy, fromJson } from '@/utils/util'
import UniverSheet from '@/plugins/univer-excel/UniverSheet.vue'
import useUniverStore from '@/views/pages/ExcelDesign/hooks/useUniverStore'
import cellDataConverter from './processing'
import { useUniverScripts } from './hooks/useUniverScripts'

const {
  excelData,
  rawData,
  dataList,
  univerSheetRef,
  uniPlugin,
  isShow,
  univerInfo,
  download,
  closePage,
} = useUniverStore(true)

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

// 下载
async function handleDownload() {
  download()
}
</script>

<style scoped>
.sheet-container {
  position: relative;
  width: 100%;
  height: 100%;
  .sheet-header {
    position: relative;
    height: 50px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
  }
  .sheet-body {
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100% - 50px);
    .sheet-excel {
      width: 100%;
      height: 100%;
    }
    .mask-toolbar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 20px;
      z-index: 10;
      background-color: #fff;
    }
    .mask-sidebar {
      position: absolute;
      top: 0;
      left: 0;
      width: 46px;
      height: 100%;
      z-index: 10;
      background-color: #fff;
    }
  }
}
</style>
