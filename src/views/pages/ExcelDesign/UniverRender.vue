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
        <b-space>
          <DebugModal :data="excelData" />

          <b-button @click="debugStatus" type="text" text-color="danger">
            <b-icon name="codelibrary" size="20"></b-icon>
          </b-button>

          <b-button type="primary" size="small" icon="login" plain @click="importExcel">
            导入
          </b-button>
          <b-button type="primary" size="small" icon="logout" plain @click="download">
            导出
          </b-button>
          <b-divider type="vertical"></b-divider>
          <b-button
            type="primary"
            size="small"
            icon="save"
            :loading="btnLoading"
            @click="saveSheetData"
          >
            保存
          </b-button>
          <b-button type="danger" size="small" icon="close" @click="closePage">关闭</b-button>
        </b-space>
      </div>
    </div>

    <div class="sheet-body">
      <DatasetConfig />

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
import { toRaw } from 'vue'
import { Message } from 'bin-ui-design'
import { useUniverDesign, debugStatus } from './useUniver'
import { useRouter } from 'vue-router'
import * as api from '@/api/modules/excel.api'
import { sendMsg } from '@/utils/cross-tab-msg'
import DatasetConfig from './DatasetConfig.vue'
import { toJson } from '@/utils/util'

const router = useRouter()

const {
  excelData,
  containerRef,
  title,
  btnLoading,
  closePage,
  download,
  importExcel,
  setUniverInfo,
} = useUniverDesign()

function getSaveData() {
  setUniverInfo()
  // 组装数据
  const data = {
    ...toRaw(excelData.value),
    datasetInfo: toJson(excelData.value.datasetInfo),
    univerInfo: toJson(excelData.value.univerInfo),
    config: toJson(excelData.value.config),
  }
  console.log('saveSheetData ========>', excelData.value, data)
  return data
}

async function saveSheetData() {
  try {
    btnLoading.value = true
    // 组装数据
    const data = getSaveData()
    // 判断是修改还是新增
    const isCreate = data.id === ''
    // 新增
    if (isCreate) {
      const id = await api.addReport(data)
      if (id) {
        Message.success('新增成功!')
        sendMsg('add-temp', { ...data })
        excelData.value.id = id
        excelData.value.reportCount = excelData.value.records = 0
        excelData.value.isPublish = '0'
        let routeData = router.resolve({
          path: '/excel-design',
          query: { id },
        })
        window.location.replace(routeData.href)
      }
    } else {
      // 修改
      await api.modifyReport(data)
      Message.success('修改成功!')
      sendMsg('modify-temp', { ...data })
    }
  } catch (error) {
    console.log(error)
  }
  btnLoading.value = false
}
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
