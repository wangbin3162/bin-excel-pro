<template>
  <div class="global-config">
    <DictConfig />
    <ScriptConfig />
  </div>
</template>

<script setup>
import DictConfig from './DictConfig.vue'
import ScriptConfig from './ScriptConfig.vue'
</script>

<style scoped>
.global-config {
  padding: 5px 8px;
}
</style>
