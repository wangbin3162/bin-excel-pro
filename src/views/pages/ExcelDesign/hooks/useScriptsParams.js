/**
 * 脚本参数组装
 * @returns
 */
export function useScriptsParams() {
  const univerInstanceStr = `
/**
 *  Univer实例化对象
 */
export class UniverPlugin {
  static init(container, cfg = {}, ui = {}) {
    return new UniverPlugin(container, cfg, ui)
  }

  // 注册初始化，并绑定容器
  constructor(container, cfg = {}, ui = {}) {
    // ... 初始化内容
    this.univer = univer // 保存实例
    this.univerAPI = FUniver.newAPI(univer) // 注册插件
  }

  // 销毁
  destory() {}

  // 销毁工作簿
  destoryWorkbook() {}

  /**
   * 创建一个工作簿
   * @param {*} data 一个IWorkbookData 类型的数据对象
   */
  createSheet(data = {}) {}

  // 禁用工作簿编辑
  disableEdit() {}

  // 获取工作簿数据
  getWorkBook() {}

  // 获取选区
  getRange(startRow, startColumn, width, height) {}

  // 根据字符获取选区如 A1或者A1:B2
  getRangeByLetter(letter) {}

  // 获取当前选区的第一个单元格range
  getCellRange(startRow, startColumn) {}

  // 获取当前选区的所有单元格
  getCellsByRange(startRow, startColumn, width, height) {}

  // 根据letter获取所有单元格
  getCellsByLetter(letter) {}

  // 获取一个单元格
  getCell(startRow, startColumn) {}

  // 根据letter获取一个单元格
  getCellByLetter(letter) {}

  // 设置区域的值
  setRange(row, column, width = 1, height = 1, cellValue) {}

  // 设置单元格的值
  setCell(row, column, cellValue) {}

  // 根据letter设置单元格的值
  setCellByLetter(letter, cellValue) {}

  // 获取所有工作表数据
  getAllSheets() {}

  // 下载Excel
  downloadExcel() {}
}`

  const utilHelperStr = `/**
 * 获取单元格的列名如 A,B,C AA
 * @param {*} colKey
 * @returns
 */
export function getCellColName(colKey) {}

/**
 * 导出一个函数，用于获取字母
 * @param {String|Number} rowKey  单元格的行号
 * @param {String|Number} colKey 单元格的列号
 * @returns
 */
export function getLetter(rowKey, colKey) {}

/**
 * 根据单元格的字母获取单元格的行号和列号
 * @param {*} letter
 * @returns
 */
export function getCellKeyByLetter(letter) {}

/**
 * 根据rowkey和colkey安全获取单元格的值
 * @param {*} cellData  单元格所有对象
 * @param {*} rowKey 目标的行索引
 * @param {*} colKey 目标列索引
 */
export function getCellDataByKey(cellData, rowKey, colKey) {}

/**
 * 安全获取单元格的值 ,根据letter
 * @param {*} cellData  单元格所有对象
 * @param {*} letter  单元格标记 如A3
 */
export function getCellDataByLetter(cellData, letter) {}

/**
 * 根据插件名称获取当前sheet的配置
 * @param {*} resources   //插件资源
 * @param {*} sheetId     // 当前sheet的id
 * @param {*} pluginName  //插件名称
 * @returns
 */
export function getCurrentSheetPlugin(resources, sheetId, pluginName) {}

/**
 * 根据一个起始-结束位置获取一个选区
 * @param {*} range
 * @returns
 */
export function getCellsByRange(range) {}

/**
 * 格式化cellData，将空值去掉
 * @param {*} cellData
 * @returns
 */
export function clearEmptyInCellData(cellData) {}

/**
 * 根据cellData获取最大行和列
 * @param {*} cellData
 */
export function getMaxRowColumn(cellData) {}

/**
 * 根据字符串解析出单元格标识字段，如A1,B2,C3
 * @param {*} str
 * @returns
 */
export function getCellIdentifiers(str) {}
`

  const utilStr = `// 颜色转换函数
export const Color = Utils.color
// 生成唯一id
export const generateId = Utils.helper.generateId
// 生成uuid
export const getUuid = Utils.util.uuid
// 复制文本
export const copyText = Utils.util.copy
// 获取数据类型
export const typeOf = Utils.util.typeOf
// 深度拷贝
export const deepCopy = Utils.util.deepCopy
// 深度合并
export const deepMerge = Utils.util.deepMerge
// 解析时间
export const parseTime = Utils.util.parseTime
// 节流
export const throttle = Utils.util.throttle
// 防抖
export const debounce = Utils.util.debounce
// 判断两个对象是否相等
export const isEqual = Utils.util.isEqual
// 判断对象是否为空
export const isEmpty = Utils.helper.isEmpty
// 绑定事件
export const on = Utils.dom.on
// 解绑事件
export const off = Utils.dom.off
// 滚动到顶部
export const scrollTop = Utils.dom.scrollTop
// 添加类名
export const addClass = Utils.dom.addClass
// 移除类名
export const removeClass = Utils.dom.removeClass
// 添加resize监听
export const addResizeListener = Utils.resize.addResizeListener
// 移除resize监听
export const removeResizeListener = Utils.resize.removeResizeListener

/**
 * arraybuffer 流文件转换为base64图像
 * @param data
 */
export function arraybuffer2Base64(data) {}

/**
 * 数组转对象值
 * @param {*} arr
 * @param {*} keyCode 默认 key
 * @param {*} valueCode 默认 value
 * @returns
 */
export function arrToObj(arr = [], keyCode = 'key', valueCode = 'value') {}

/**
 * 判断是否包含属性
 * @param {*} obj 
 * @param {*} key 
 * @returns 
 */
export function hasKey(obj, key) {}

/**
 * 处理拉平树结构
 * @param stateTree
 * @returns {*[]}
 */
export function compileFlatState(stateTree) {}

/**
 * 字符串转为unicode编码后的字符串
 * @param {*} str 
 * @returns 
 */
export function strToUnicode(str) {}

/**
 * unicode转为字符串
 * @param {*} str 
 * @returns 
 */
export function unicodeToStr(str) {}

/**
 * 获取当前时间
 * @param {*} cFormat 默认值 '{y}-{m}-{d} {h}:{i}:{s}'
 * @returns
 */
export function getNow(cFormat) {}

/**
 * 从json字符串中获取数据
 * @param jsonStr json字符串
 * @param defaultValue 默认值，必须填写，用于初始化失败的时候使用
 * @returns {any} // 返回json字符串中的数据
 */
export function fromJson(jsonStr, defaultValue) {}

/**
 * 转换为json字符串
 * @param {*} obj 对象
 * @param {*} format 是否格式化
 * @returns json字符串
 */
export function toJson(obj, format = false) {}
`

  const paramsDesc = [
    {
      name: 'univer (插件封装实例)',
      desc: '可以获取操作的univerAPI对象,可以进行控制univer表格,具体见下方说明',
      code: `/**
 * univer封装实例
 * @param {Object} univerAPI univerAPI对象,可以操作univer表格
 * @param {Object} univer univer原始实例(一般不需要直接操作)
 */
const { univerAPI, univer } = univer ${univerInstanceStr}`,
    },
    {
      name: 'utils (帮助函数集合)',
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
      name: '---- helper (univer辅助函数集合)',
      desc: 'univer辅助函数集合',
      code: utilHelperStr,
    },
    {
      name: '---- util (基本帮助函数)',
      desc: '基本帮助函数集合',
      code: utilStr,
    },
    {
      name: 'configData (原始的配置对象)',
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
      name: 'data (实际的数据对象)',
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
