<template>
  <div>
    <b-ace-editor v-model="jsonStr" :height="height" />
    <div class="pt-8">
      <b-button type="primary" @click="save">保存</b-button>
    </div>
  </div>
</template>

<script setup>
import { Message } from 'bin-ui-design'
import { ref, watch } from 'vue'
defineOptions({ name: 'JsonSave' })

const data = defineModel({ type: [Object, Array] })

defineProps({
  height: {
    type: String,
    default: '200px',
  },
})

const jsonStr = ref('')

watch(
  () => data.value,
  val => {
    jsonStr.value = JSON.stringify(val, null, 2)
  },
  { immediate: true, deep: true },
)

function save() {
  try {
    data.value = JSON.parse(jsonStr.value)
    Message.success('保存成功')
  } catch (e) {
    console.log('e ========>', e)
  }
}
</script>
