<template>
  <div class="sheet-wrapper">
    <Loading :loading="!render">
      <UniverRender />
    </Loading>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import Loading from './Loading.vue'
import UniverRender from './UniverRender.vue'

defineOptions({ name: 'ExcelDesign' })

const route = useRoute()
const render = ref(false)

watch(
  () => route.path,
  async () => {
    const { id } = route.query
    document.title = '报表设计'

    render.value = false
    // if (id) {
    //   // 如果是有id表示为修改，无id则获取创建对象来进行设置
    //   const detail = await api.getTempDetail(id)
    //   excelData.value = { ...detail }
    //   excelData.value.mapping = excelData.value.mapping.map(i => new MappingItem().getMerge(i))
    // } else {
    //   initData()
    //   excelData.value.name = '新模板'
    // }
    setTimeout(() => {
      render.value = true
    }, 500)
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
