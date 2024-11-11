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

          <b-divider type="vertical"></b-divider>
          <b-button type="primary" size="small" icon="login" plain @click="importExcel">
            导入
          </b-button>
          <b-button type="primary" size="small" icon="logout" plain @click="handleDownload">
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
          <b-divider type="vertical"></b-divider>
          <b-button type="primary" size="small" plain icon="eye" @click="handlePreview">
            预览
          </b-button>
          <b-divider type="vertical"></b-divider>
          <b-button type="danger" size="small" icon="close" @click="closePage">关闭</b-button>
        </b-space>
      </div>
    </div>

    <div class="sheet-body">
      <DatasetConfig />
      <div class="sheet-excel">
        <UniverSheet
          ref="univerSheetRef"
          v-if="isShow && univerInfo !== null"
          :data="univerInfo"
          :onSelectionChange="selectionChange"
          :onCellDrop="sellDrop"
        />
      </div>

      <div class="right-config">
        <div class="title-top">
          <TitleBar title="配置信息" tip-pos="left" :titleStyle="{ fontSize: '14px' }" />
        </div>
        <div class="body-content">
          <div class="top-tabs">
            <b-radio-group v-model="activeTab" type="capsule" style="width: 100%">
              <b-radio label="base">基础</b-radio>
              <b-radio label="global">全局</b-radio>
            </b-radio-group>
          </div>
          <div class="config-content">
            <b-scrollbar>
              <BaseConfig v-if="activeTab === 'base'" :currentRange="currentRange" />
              <GlobalConfig v-if="activeTab === 'global'" />
            </b-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRaw, ref, nextTick } from 'vue'
import { Message } from 'bin-ui-design'
import { useRouter, useRoute } from 'vue-router'
import DatasetConfig from './components/DatasetConfig.vue'
import BaseConfig from './components/BaseConfig.vue'
import GlobalConfig from './components/GlobalConfig.vue'

import UniverSheet from '@/plugins/univer-excel/UniverSheet.vue'
import { getLetter } from '@/plugins/univer-excel/util'

import * as api from '@/api/modules/excel.api'
import { sendMsg } from '@/utils/cross-tab-msg'
import { toJson, fromJson } from '@/utils/util'

import useUniverStore from './hooks/useUniverStore'
import { importExcelToUninver } from '@/plugins/univer-excel/luckToUniver'

const {
  title,
  univerSheetRef,
  uniPlugin,
  excelData,
  isShow,
  univerInfo,
  closePage,
  download,
  getUpdateData,
  debugStatus,
} = useUniverStore()

const router = useRouter()
const route = useRoute()

const currentRange = ref({})
const btnLoading = ref(false)
const activeTab = ref('base') // base, global

// 选区点击改变事件
function selectionChange(selection) {
  if (!selection) return
  if (selection.length > 0) currentRange.value = selection[0]
  activeTab.value = 'base'
}

// 单元格放置事件
function sellDrop(cell) {
  if (!cell) return
  const { dataTransfer, location } = cell
  const drop = dataTransfer.getData('field')
  if (!drop) return
  const { dataset, field } = fromJson(drop, {})
  // 组装数据，根据是否是列表型 列表组装为#{}，非列表组装为${}
  const value = dataset.isList
    ? `#{${dataset.code}.${field.fieldName}}`
    : '$' + `{${dataset.code}.${field.fieldName}}`
  // console.log('dropData ========>', dataset, field, value)
  // 设置单元格的值
  const { col, row } = location
  const letter = getLetter(row, col)
  console.log(`location ========>[${letter}]`, location)
  const sheet = uniPlugin.value.univerAPI.getActiveWorkbook().getActiveSheet()
  const range = sheet.getRange(letter)
  range.setValue(value)
  range.setWrapStrategy(2)
}

// 处理保存数据
function getSaveData() {
  getUpdateData()
  // 组装数据
  const data = {
    ...toRaw(excelData.value),
    datasetInfo: toJson(excelData.value.datasetInfo),
    univerInfo: toJson(excelData.value.univerInfo),
    config: toJson(excelData.value.config),
  }
  console.log('saveData ========>', data)
  return data
}

// 下载
async function handleDownload() {
  await saveSheetData()
  download()
}

// 导入excel
async function importExcel() {
  const file = await inputLoad()
  if (!file) return

  isShow.value = false
  const univerData = await importExcelToUninver(file)
  // console.log('univerData ========>', univerData)
  univerInfo.value = univerData
  await nextTick()
  isShow.value = true
}

// 创建载入
function inputLoad() {
  return new Promise(resolve => {
    let input = document.createElement('input')
    input.type = 'file'
    input.onchange = e => {
      const files = e.target.files
      if (!files || files.length === 0) {
        Message.error('没有选择文件!')
        resolve(null)
      }
      let file = files[0]
      const name = file.name
      let suffixArr = name.split('.'),
        suffix = suffixArr[suffixArr.length - 1]
      if (suffix !== 'xlsx') {
        Message.error('当前仅支持xlsx后缀的文件导入!')
        resolve(null)
      }

      resolve(file)
    }
    input.click()
  })
}

// 调用保存方法
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

// 预览
async function handlePreview() {
  await saveSheetData()
  const renderType = excelData.value.config.type
  let routeData = router.resolve({
    path: renderType === 'render' ? '/excel-preview' : '/excel-fill',
    query: { id: route.query.id },
  })
  window.open(routeData.href, '_blank')
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
      .top-tabs {
        padding: 5px;
      }
      .config-content {
        height: calc(100% - 44px);
      }
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
