import dayjs from 'dayjs'
import * as util from '@/utils/util'
import * as helper from '@/plugins/univer-excel/util'
import { buildFun } from '@/utils/customScriptsUtil'

// 执行univer脚本
export async function useUniverScripts(univer, configData, data) {
  const { customScripts } = configData.config

  if (!customScripts?.enable) return

  const utils = { util, helper, dayjs }
  // console.log('univer ========>', univer)
  // console.log('utils ========>', utils)
  // console.log('configData ========>', configData)
  // console.log('data ========>', data)
  const fun = buildFun(customScripts.funcBody, customScripts.arguments)
  try {
    await fun(univer, utils, configData, data)
  } catch (error) {
    console.log('useUniverScripts error ========>', error)
  }
}
