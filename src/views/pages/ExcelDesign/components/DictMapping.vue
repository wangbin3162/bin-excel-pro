<template>
  <div>
    <b-modal v-model="visible" title="字典项配置" width="720px">
      <key-value-mapping v-model="mapping"></key-value-mapping>
      <template #footer>
        <b-button @click="handleCancel">取 消</b-button>
        <b-button type="primary" @click="handleSubmit">确 定</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['mapping'])
const visible = ref(false)
const editIndex = ref(-1)
const mapping = ref([])

function open(dict, index) {
  visible.value = true
  editIndex.value = index
  mapping.value = [...dict.mapping]
}

function handleCancel() {
  visible.value = false
}

function handleSubmit() {
  visible.value = false
  emit('mapping', mapping.value, editIndex.value)
}

defineExpose({
  open,
})
</script>

<style scoped></style>
