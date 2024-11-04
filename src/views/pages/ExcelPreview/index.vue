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
import UniverRender from './UniverRender.vue'
import useUniverRender from './hooks/useUniverRender'

defineOptions({ name: 'ExcelPreview' })

const route = useRoute()
const render = ref(false)
const { initData } = useUniverRender()

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
