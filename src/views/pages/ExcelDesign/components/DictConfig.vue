<template>
  <div class="dict-config">
    <b-card
      header="字典配置"
      shadow="never"
      head-tip
      :bordered="false"
      :body-style="{ padding: '8px 0' }"
    >
      <b-table :columns="columns" :data="dictConfig" edit-table edit-table-detail>
        <template #action="{ index }">
          <b-button type="text" icon="edit" @click="handEdit(index)" />
          <b-button type="text" icon="unorderedlist" @click="handMapping(index)" />
          <b-button type="text" text-color="danger" icon="delete" @click="handleRemove(index)" />
        </template>
      </b-table>

      <div class="pt-8">
        <b-button icon="plus" dashed style="width: 100%; border-radius: 8px" @click="handleAdd">
          新增字典
        </b-button>
      </div>
    </b-card>

    <b-modal v-model="visible" title="字典配置">
      <div v-if="visible">
        <b-form
          ref="formRef"
          :model="dict"
          :rules="ruleValidate"
          label-width="100px"
          label-suffix=":"
        >
          <b-form-item label="字典名称" prop="dictName">
            <b-input v-model="dict.dictName" clearable :maxlength="200"></b-input>
          </b-form-item>
          <b-form-item label="字典编码" prop="dictCode">
            <b-input v-model="dict.dictCode" clearable :maxlength="50"></b-input>
          </b-form-item>
        </b-form>
      </div>
      <template #footer>
        <b-button @click="handleCancel">取 消</b-button>
        <b-button type="primary" :loading="btnLoading" @click="handleSubmit">确 定</b-button>
      </template>
    </b-modal>

    <DictMapping ref="mappingRef" @mapping="handleMapping" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUniverStatus } from '../hooks/useUniver'
import { newDict } from '../hooks/useConfig'
import DictMapping from './DictMapping.vue'

const { dictConfig } = useUniverStatus()

const columns = [
  { title: '字典名称', key: 'dictName' },
  { title: '字典编码', key: 'dictCode' },
  { slot: 'action', width: 90, title: '操作' },
]

const formRef = ref(null)
const mappingRef = ref(null)
const btnLoading = ref(false)
const visible = ref(false)
const status = ref('add')
const dict = ref({})
const editIndex = ref(-1)

function handleAdd() {
  visible.value = true
  status.value = 'add'
  dict.value = newDict()
}

function handleCancel() {
  visible.value = false
  formRef.value.resetFields()
}

function handEdit(index) {
  visible.value = true
  status.value = 'edit'
  editIndex.value = index
  dict.value = { ...dictConfig.value[index] }
}

function handleRemove(index) {
  dictConfig.value.splice(index, 1)
}

function handMapping(index) {
  mappingRef.value.open(dictConfig.value[index], index)
}

function handleMapping(mapping, index) {
  dictConfig.value[index].mapping = [...mapping]
}

function handleSubmit() {
  formRef.value.validate(valid => {
    if (valid) {
      btnLoading.value = true
      if (status.value === 'add') {
        dictConfig.value.push(dict.value)
      } else {
        const index = dictConfig.value.findIndex(i => i.dictCode === dict.value.dictCode)
        dictConfig.value.splice(index, 1, dict.value)
      }
      btnLoading.value = false
      visible.value = false
    } else {
      return false
    }
  })
}

// 校验函数
const validateDictName = (rule, value, callback) => {
  if (value.length) {
    if (status.value === 'edit' && dictConfig.value[editIndex.value].dictName === value) {
      callback()
    }
    const hasSame = dictConfig.value.findIndex(i => i.dictName === value) > -1
    if (hasSame) {
      callback(new Error('字典名称重复!'))
    } else {
      callback()
    }
  }
}
const validateDictCode = (rule, value, callback) => {
  if (value.length) {
    if (status.value === 'edit' && dictConfig.value[editIndex.value].dictCode === value) {
      callback()
    }
    const hasSame = dictConfig.value.findIndex(i => i.dictCode === value) > -1
    if (hasSame) {
      callback(new Error('字典编码重复!'))
    } else {
      callback()
    }
  }
}

const ruleValidate = ref({
  dictName: [
    { required: true, message: '必填项', trigger: 'blur' },
    { validator: validateDictName, trigger: 'blur' },
  ],
  dictCode: [
    { required: true, message: '必填项', trigger: 'blur' },
    { validator: validateDictCode, trigger: 'blur' },
  ],
})
</script>

<style scoped>
.dict-config {
  :deep(.bin-table-wrapper.is-edit-table) {
    .bin-table .bin-table-cell .bin-input {
      background-color: transparent;
      padding: 5px 6px;
    }
    .bin-form-item__error {
      right: 6px;
      transform: scale3d(0.9, 0.9, 0.9);
    }
    &.is-edit-table-detail .bin-table .bin-table-cell {
      padding: 0 8px;
    }
  }
}
</style>
