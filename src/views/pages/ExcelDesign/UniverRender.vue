<template>
  <div class="sheet-container">
    <div class="sheet-header">
      <div class="left">
        <b-space>
          <h3>报表设计</h3>
          <b-input v-model="title" placeholder="报表名称" />
        </b-space>
      </div>
      <div class="right">
        <b-button type="primary" size="small" icon="login" plain>导入</b-button>
        <b-button type="primary" size="small" icon="logout" plain @click="download">导出</b-button>
        <b-divider type="vertical"></b-divider>
        <b-button type="primary" size="small" icon="save" :loading="btnLoading">保存</b-button>
        <b-button type="danger" size="small" icon="close" @click="closePage">关闭</b-button>
      </div>
    </div>

    <div class="sheet-body">
      <div class="left-dataset">
        <div class="title-top">
          <TitleBar title="数据集" tip-pos="left" :titleStyle="{ fontSize: '14px' }">
            <template #right>
              <b-button type="text" icon="plus" style="margin-right: 5px" />
            </template>
          </TitleBar>
        </div>

        <div class="body-content">
          <b-scrollbar>
            <div class="p8">left-content</div>
          </b-scrollbar>
        </div>
      </div>

      <div id="SheetContainer" class="sheet-excel has-config" ref="containerRef"></div>

      <div class="right-config">
        <div class="title-top">
          <TitleBar title="配置信息" tip-pos="left" :titleStyle="{ fontSize: '14px' }" />
        </div>
        <div class="body-content">
          <b-scrollbar>
            <div class="p8">right-content</div>
          </b-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUniver from './useUniver'

const { containerRef, title, btnLoading, closePage, download } = useUniver()
</script>

<style scoped>
.sheet-container {
  position: relative;
  width: 100%;
  height: 100%;
  --v-left-width: 220px;
  --v-right-width: 340px;
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
    display: flex;
    width: 100%;
    height: calc(100% - 50px);
    .left-dataset {
      width: var(--v-left-width);
      border-right: 1px solid #f0f0f0;
    }
    .sheet-excel {
      width: calc(100% - var(--v-left-width) - var(--v-right-width));
    }
    .right-config {
      width: var(--v-right-width);
      border-left: 1px solid #f0f0f0;
    }
    .title-top {
      height: 42px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding: 0;
    }
    .body-content {
      height: calc(100% - 42px);
    }
  }
}
</style>
