<template>
  <div ref="container" class="univer-container">univer-container</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { UniverPlugin } from '@/plugins/univer-excel/UniverPlugin'

const container = ref(null)

const univer = ref(null)

onMounted(() => {
  univer.value = UniverPlugin.init(container.value)
  univer.value.createSheet()
})

onBeforeUnmount(() => {
  univer.value?.destory()
})
</script>

<style scoped>
.univer-container {
  width: 100%;
  height: calc(100vh - 60px - 32px - 40px);
  overflow: hidden;
}
</style>
