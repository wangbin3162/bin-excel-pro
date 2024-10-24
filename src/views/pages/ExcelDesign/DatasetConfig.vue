<template>
  <div class="dataset-config">
    <b-collapse-wrap
      v-for="ds in excelData.datasetInfo.list"
      :key="ds.id"
      collapse
      shadow="none"
      arrow-icon="caret-down"
    >
      <template #title>
        <span class="title">
          <b-tag :type="ds.isList ? 'primary' : 'info'">
            {{ ds.isList ? '列表型' : '对象型' }}
          </b-tag>
          <span class="pl-5" :title="ds.name">
            {{ ds.name }}
          </span>
        </span>
      </template>
      <div class="p5">
        {{ ds }}
      </div>
    </b-collapse-wrap>
  </div>
</template>

<script setup>
import { useUniverStatus } from './useUniver'

const { excelData } = useUniverStatus()
</script>

<style scoped>
.dataset-config {
  padding: 8px;
  :deep(.bin-collapse-wrap) {
    + .bin-collapse-wrap {
      margin-top: 0;
    }
    .header {
      > .title {
        font-size: 12px;
        padding: 0 8px 0 4px;
        width: calc(100% - 24px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arrow {
        right: 5px;
      }
    }
  }
}
</style>
