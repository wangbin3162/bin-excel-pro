<template>
  <div class="p20">
    <b-button type="primary" @click="goToExcelList">报表设计</b-button>

    <b-button type="primary" icon="plus" @click="createReport">新增报表</b-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToExcelList() {
  router.push('/ExcelList')
}

function createReport() {
  let routeData = router.resolve({
    path: '/excel-design',
    query: {},
  })
  window.open(routeData.href, '_blank')
}
</script>

<style scoped></style>
