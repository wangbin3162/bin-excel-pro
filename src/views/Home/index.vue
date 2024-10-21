<template>
  <div class="p20">
    <b-button type="primary" @click="goToExcelList">报表设计</b-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToExcelList() {
  router.push('/ExcelList')
}
</script>

<style scoped></style>
