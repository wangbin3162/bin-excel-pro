<template>
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
        <div class="dataset-config">
          <b-collapse-wrap
            v-for="ds in excelData.datasetInfo.list"
            :key="ds.id"
            :title="ds.name"
            collapse
            shadow="none"
            arrow-icon="caret-down"
          >
            <template #title>
              <span class="title">
                <b-tag :type="ds.isList ? 'primary' : 'info'">
                  {{ ds.name }}
                </b-tag>
              </span>
            </template>
            <template #right>
              <b-space>
                <b-button type="text" icon="edit"></b-button>
                <b-button type="text" icon="close"></b-button>
              </b-space>
            </template>
            <div class="p5">
              <div
                class="field-item"
                v-for="item in ds.fields"
                :key="item.id"
                draggable="true"
                @dragstart="fieldDrag($event, ds, item)"
              >
                <span class="field-name" :title="item.fieldName">
                  {{ item.fieldTitle }}
                </span>
                <span class="field-type" :title="item.type">
                  {{ item.type }}
                </span>
              </div>
            </div>
          </b-collapse-wrap>
        </div>
      </b-scrollbar>
    </div>
    <div class="tip">
      <b-space>
        <b-icon name="question-circle"></b-icon>
        <b-tag type="info">对象型</b-tag>
        <b-tag type="primary">列表型</b-tag>
      </b-space>
    </div>
  </div>
</template>

<script setup>
import { toJson } from '@/utils/util'
import { useUniverStatus } from './useUniver'

const { excelData } = useUniverStatus()

function fieldDrag(event, dataset, field) {
  // console.log('item ========>', field)
  event.dataTransfer.setData('field', toJson({ dataset, field }))
}
</script>

<style scoped>
.left-dataset {
  user-select: none;
  width: var(--v-left-width);
  border-right: 1px solid #f0f0f0;

  .body-content {
    height: calc(100% - 78px);
  }
  .tip {
    display: flex;
    height: 36px;
    padding: 0 16px;
    align-items: center;
    border-top: 1px solid #f0f0f0;
  }
}
.dataset-config {
  padding: 8px;
  :deep(.bin-collapse-wrap) {
    + .bin-collapse-wrap {
      margin-top: 0;
    }
    .header {
      > .title {
        cursor: default;
        font-size: 12px;
        padding: 0 8px 0 18px;
        width: calc(100% - 24px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arrow {
        right: unset;
        left: 0;
        transform: translateY(-50%) rotate(-90deg);
      }

      .right.can-collapse {
        padding-right: 5px;
      }
    }

    &.bin-collapse-wrap-active .header .arrow {
      transform: translateY(-50%) rotate(0deg);
    }
  }
  .field-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: grab;
    line-height: 24px;
    margin-left: 20px;
    border-radius: 3px;
    padding: 0 6px;
    margin-bottom: 4px;
    transition: 0.2s;
    &:hover {
      background-color: #f0f0f0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    .field-name {
      width: calc(100% - 42px);
      font-size: 12px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .field-type {
      text-align: right;
      width: 42px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
