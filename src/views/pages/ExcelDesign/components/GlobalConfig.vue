<template>
  <div class="global-config">
    <b-card
      header="报表信息"
      shadow="never"
      head-tip
      :bordered="false"
      :body-style="{ padding: '16px 8px 0' }"
    >
      <b-form label-width="64px" label-position="left">
        <b-form-item label="报表名称">
          <b-input v-model="title" placeholder="请输入报表名称" />
        </b-form-item>

        <b-form-item label="报表类型">
          <b-select v-model="config.type" placeholder="请选择报表类型">
            <b-option value="render" label="渲染报表"></b-option>
            <b-option value="fill" label="数据填报"></b-option>
          </b-select>
        </b-form-item>
      </b-form>
    </b-card>
    <DictConfig />

    <ScriptConfig />
  </div>
</template>

<script setup>
import DictConfig from './DictConfig.vue'
import ScriptConfig from './ScriptConfig.vue'
import useUniverStore from '../hooks/useUniverStore'

const { title, config } = useUniverStore()
</script>

<style scoped>
.global-config {
  padding: 5px 8px;

  :deep(.bin-form-item) {
    margin-bottom: 12px;
  }
}
</style>
