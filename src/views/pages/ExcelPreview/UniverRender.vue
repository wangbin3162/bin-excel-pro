<template>
  <div class="sheet-container">
    <div class="sheet-header">
      <div class="left">
        <h3>{{ rawData.name }}</h3>
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
      <!-- <div class="mask-toolbar"></div>
      <div class="mask-sidebar"></div> -->
      <div id="SheetContainer" class="sheet-excel" ref="containerRef" />
    </div>
  </div>
</template>

<script setup>
import useUniverRender from './hooks/useUniverRender'

const { containerRef, rawData, download, closePage } = useUniverRender(true)

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
    /* padding: 24px; */
    .sheet-excel {
      width: 100%;
      height: 100%;
      /* border: 1px solid #f0f0f0; */
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
