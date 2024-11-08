<template>
  <div class="sheet-wrapper">
    <LoadingWrapper :loading="!render">
      <UniverRender />
    </LoadingWrapper>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getReportDetail } from '@/api/modules/excel.api'
import { getDatasetData } from '@/api/modules/dataset.api'
import useUniverStore from '@/views/pages/ExcelDesign/hooks/useUniverStore'
import UniverRender from './UniverRender.vue'

defineOptions({ name: 'ExcelFill' })

const route = useRoute()
const render = ref(false)
const { initData, dataList, excelData } = useUniverStore()

watch(
  () => route.path,
  async () => {
    const { id } = route.query
    render.value = false
    if (id) {
      // 如果是有id表示为修改，无id则获取创建对象来进行设置
      const detail = await getReportDetail(id)
      document.title = `[预览] ${detail.name}`
      await initData(detail)
      try {
        // 根据数据集获取数据集信息
        dataList.value = await getDatasetData(excelData.value.datasetInfo.list)
      } catch (error) {
        console.log(error)
      }
    }

    render.value = true
  },
  { immediate: true },
)
</script>

<style scoped>
.sheet-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
