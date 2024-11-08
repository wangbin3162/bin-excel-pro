<template>
  <div class="script-config mt-8">
    <b-card
      header="自定义脚本"
      shadow="never"
      head-tip
      :bordered="false"
      :body-style="{ padding: '8px 0' }"
    >
      <b-form label-width="64px" label-position="left">
        <b-form-item label="是否启用">
          <div flex="main:justify">
            <b-switch size="small" v-model="customScripts.enable"></b-switch>

            <CustomScripts
              v-model="customScripts.funcBody"
              :arguments="customScripts.arguments"
              :paramsDesc="paramsDesc"
              :exampleDesc="exampleDesc"
              style="display: inline-flex; width: auto"
              label=""
              modalTitle="自定义脚本"
              funcExplain="全局脚本，可以通过提供的脚本进行更灵活的配置和设置 <a href='https://univer.ai/zh-CN/guides/sheet/introduction' target='_blank'>[Univer官网]</a>"
            />
          </div>
        </b-form-item>
      </b-form>
    </b-card>

    <JsonSave v-model="customScripts"></JsonSave>
  </div>
</template>

<script setup>
import useUniverStore from '../hooks/useUniverStore'
import { useScriptsParams } from '../hooks/useScriptsParams'

const { customScripts } = useUniverStore()
const { paramsDesc, exampleDesc } = useScriptsParams()
</script>

<style scoped></style>
