<template>
  <div class="script-config mt-8">
    <b-card
      header="脚本配置"
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
              :paramsDesc="[]"
              :exampleDesc="[]"
              style="display: inline-flex; width: auto"
              label=""
              funcExplain="全局脚本，可以通过提供的脚本进行更灵活的配置和设置"
            />
          </div>
        </b-form-item>
      </b-form>
    </b-card>

    <JsonSave v-model="customScripts"></JsonSave>
  </div>
</template>

<script setup>
import { useUniverStatus } from '../hooks/useUniver'
import { useScriptsParams } from '../hooks/useScriptsParams'

const { customScripts } = useUniverStatus()

useScriptsParams()
</script>

<style scoped></style>
