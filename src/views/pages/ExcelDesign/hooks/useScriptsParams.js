/**
 * 脚本参数组装
 * @returns
 */
export function useScriptsParams() {
  const paramsDesc = [
    {
      name: 'univer',
      desc: 'univer插件封装实例,可以获取操作的univerAPI对象,可以进行控制univer表格',
      code: `/**
 * univer封装实例
 * @param {Object} univerAPI univerAPI对象,可以操作univer表格
 * @param {Object} univer univer原始实例(一般不需要直接操作)
 */
const { univerAPI, univer } = univer `,
    },
    {
      name: 'utils',
      desc: '帮助函数集合,包括一些辅助函数如单元格转换等',
      code: `/**
 * 帮助函数对象
 * @param {Object} util 工具函数集合
 * @param {Object} helper univer辅助函数集合
 * @param {Function} dayjs 日期处理函数
 */
const { util, helper, dayjs } = utils`,
    },
    {
      name: 'configData',
      desc: '原始的配置对象',
      code: `/**
 * 原始的配置对象
 * @param {Object} univerInfo 原始univerInfo保存信息
 * @param {Object} dataset 原始数据集配置
 * @param {Object} config 全局配置
 */
const { univerInfo, dataset, config } = configData`,
    },
    {
      name: 'data',
      desc: '实际的数据对象（注：需要根据实际情况判定，填报表单当前参数可能会为空）',
      code: `/**
 * 实际的数据对象
 * @param {Object} univerInfo 处理后的univerInfo保存信息
 * @param {Object} dataList 实际返回的数据集合
 */
const { univerInfo, dataList } = data`,
    },
  ]

  // 校验的示例代码编写
  const exampleDesc = [
    {
      name: '获取univerAPI对象',
      code: `const { univerAPI } = univer`,
    },
    {
      name: '获取当前工作簿',
      code: `const workbook = univerAPI.getActiveWorkbook()`,
    },
    {
      name: '获取当前激活的sheet',
      code: `const sheet = univerAPI.getActiveWorkbook().getActiveSheet()`,
    },
    {
      name: '获取一个单元格',
      code: `const cell = univer.getCellByLetter('A1')`,
    },
    {
      name: '全局字典配置',
      code: `const { dictConfig } = configData.config`,
    },
    {
      name: '原始的数据集配置',
      code: `const { dataset } = configData`,
    },
    {
      name: 'univer帮助函数',
      code: `const { helper } = utils`,
    },
    {
      name: '单元格转换',
      code: `const letter = utils.helper.getLetter(rowKey, colKey)`,
    },
    {
      name: '当前数据集返回的数据列表',
      code: `const { univerInfo, dataList } = data`,
    },
  ]
  return {
    paramsDesc,
    exampleDesc,
  }
}
