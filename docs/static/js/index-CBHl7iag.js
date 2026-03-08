import{ag as le,R as f,o as P,a as G,b as I,K as o,w as c,F as pe,Q as me,L as O,j as re,f as W,t as ce,l as Vt,r as $,n as Et,G as At,i as se,Z as be,ar as w,as as Q,at as Lt,au as ue,av as de,aw as fe,ax as Ot,ay as Bt,az as jt,ae as $t,af as Ut,a9 as Pt}from"./vendor-ceFelE5L.js";import{a as Mt,m as zt,g as Ht}from"./excel.api-nlxJIDK2.js";import{n as ne}from"./chunk-bin-ui-design-BcZ9pOMk.js";import{a as ie,g as ge,f as Kt}from"./index-SD2fDZmS.js";import{u as ee,g as It,n as Wt,U as Ft}from"./UniverSheet-C5t-sxCt.js";import{s as Rt}from"./cross-tab-msg-_sRHQ4ZL.js";import"./chunk-brace-CJH63gZ-.js";const qt={class:"left-dataset"},Gt={class:"title-top"},Qt={class:"body-content"},Jt={class:"dataset-config"},Xt={class:"title"},Zt={class:"p5"},Yt=["onDragstart"],ht=["title"],wt=["title"],St={class:"tip"},ea={__name:"DatasetConfig",setup(t){const{excelData:l}=ee();function g(s,r,n){s.dataTransfer.setData("field",ie({dataset:r,field:n}))}return(s,r)=>{const n=f("b-button"),i=f("TitleBar"),_=f("b-tag"),b=f("b-space"),R=f("b-collapse-wrap"),x=f("b-scrollbar"),T=f("b-icon");return P(),G("div",qt,[I("div",Gt,[o(i,{title:"数据集","tip-pos":"left",titleStyle:{fontSize:"14px"}},{right:c(()=>[o(n,{type:"text",icon:"plus",style:{"margin-right":"5px"}})]),_:1})]),I("div",Qt,[o(x,null,{default:c(()=>[I("div",Jt,[(P(!0),G(pe,null,me(O(l).datasetInfo.list,U=>(P(),re(R,{key:U.id,title:U.name,collapse:"",shadow:"none","arrow-icon":"caret-down"},{title:c(()=>[I("span",Xt,[o(_,{type:U.isList?"primary":"info"},{default:c(()=>[W(ce(U.name),1)]),_:2},1032,["type"])])]),right:c(()=>[o(b,null,{default:c(()=>[o(n,{type:"text",icon:"edit"}),o(n,{type:"text",icon:"close"})]),_:1})]),default:c(()=>[I("div",Zt,[(P(!0),G(pe,null,me(U.fields,B=>(P(),G("div",{class:"field-item",key:B.id,draggable:"true",onDragstart:N=>g(N,U,B)},[I("span",{class:"field-name",title:B.fieldName},ce(B.fieldTitle),9,ht),I("span",{class:"field-type",title:B.type},ce(B.type),9,wt)],40,Yt))),128))])]),_:2},1032,["title"]))),128))])]),_:1})]),I("div",St,[o(b,null,{default:c(()=>[o(T,{name:"question-circle"}),o(_,{type:"info"},{default:c(()=>r[0]||(r[0]=[W("对象型")])),_:1}),o(_,{type:"primary"},{default:c(()=>r[1]||(r[1]=[W("列表型")])),_:1})]),_:1})])])}}},ta=le(ea,[["__scopeId","data-v-77b44e60"]]),aa={class:"base-config"},la={__name:"BaseConfig",props:{currentRange:{type:Object,default:()=>({})}},setup(t){const l=t,g=Vt({get:()=>{const{startRow:N,startColumn:m}=l.currentRange;return`${N},${m}`}}),s=Vt({get:()=>{const{startRow:N,startColumn:m}=l.currentRange;return It(N,m)}}),{uniPlugin:r,dictConfig:n}=ee(),i=$({}),_=$(!1),b=$("");function R({startRow:N,startColumn:m}){var J,F;if(!r.value)return;const M=r.value.getCell(N,m);i.value=M.cell,_.value=((J=i.value.custom)==null?void 0:J.isDymamicMerge)||!1,b.value=((F=i.value.custom)==null?void 0:F.useMapping)||""}async function x(){const{startRow:N,startColumn:m}=l.currentRange;r.value.setCell(N,m,i.value),await At(),R({startRow:N,startColumn:m})}function T(){const{startRow:N,startColumn:m}=l.currentRange;r.value.setCell(N,m,""),i.value={}}function U(N){const{startRow:m,startColumn:M}=l.currentRange;r.value.setCell(m,M,{...i.value,custom:{isDymamicMerge:N}})}function B(N){const{startRow:m,startColumn:M}=l.currentRange;r.value.setCell(m,M,{...i.value,custom:{useMapping:N}})}return Et(()=>l.currentRange,N=>R(N),{deep:!0}),(N,m)=>{const M=f("b-input"),J=f("b-space"),F=f("b-form-item"),Y=f("b-divider"),L=f("b-tooltip"),C=f("b-option"),E=f("b-select"),X=f("b-switch"),v=f("b-form");return P(),G("div",aa,[o(v,{"label-width":"64px","label-position":"left"},{default:c(()=>[o(F,{label:"坐标"},{default:c(()=>[o(J,null,{default:c(()=>[o(M,{readonly:"","model-value":s.value},null,8,["model-value"]),o(M,{readonly:"","model-value":g.value},null,8,["model-value"])]),_:1})]),_:1}),o(F,{label:"值"},{default:c(()=>[o(M,{modelValue:i.value.v,"onUpdate:modelValue":m[0]||(m[0]=d=>i.value.v=d),disabled:i.value.f&&i.value.f.length>0,clearable:"",onEnter:x,onBlur:x,onClear:T},null,8,["modelValue","disabled"])]),_:1}),o(F,{label:"公式"},{default:c(()=>[o(M,{modelValue:i.value.f,"onUpdate:modelValue":m[1]||(m[1]=d=>i.value.f=d),type:"textarea",onEnter:x,onBlur:x},null,8,["modelValue"])]),_:1}),o(Y,{style:{margin:"12px 0"}}),o(F,{label:"映射转换"},{label:c(()=>[o(L,{content:"开启转换后，选择字典，渲染时会自动进行映射转换。",theme:"light"},{default:c(()=>m[4]||(m[4]=[I("label",{class:"underline-help"},"映射转换",-1)])),_:1})]),default:c(()=>[o(E,{modelValue:b.value,"onUpdate:modelValue":m[2]||(m[2]=d=>b.value=d),clearable:"",onChange:B},{default:c(()=>[(P(!0),G(pe,null,me(O(n),d=>(P(),re(C,{key:d.dictCode,label:d.dictName,value:d.dictCode},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(Y,{style:{margin:"12px 0"}}),o(F,{label:"动态合并"},{label:c(()=>[o(L,{content:"设置为动态合并后，单元格的合并区域会根据内容自动调整.",theme:"light"},{default:c(()=>m[5]||(m[5]=[I("label",{class:"underline-help"},"动态合并",-1)])),_:1})]),default:c(()=>[o(X,{modelValue:_.value,"onUpdate:modelValue":m[3]||(m[3]=d=>_.value=d),onChange:U,size:"small"},null,8,["modelValue"])]),_:1})]),_:1})])}}},oa=le(la,[["__scopeId","data-v-d70b40d9"]]),ra={__name:"DictMapping",emits:["mapping"],setup(t,{expose:l,emit:g}){const s=g,r=$(!1),n=$(-1),i=$([]);function _(x,T){r.value=!0,n.value=T,i.value=[...x.mapping]}function b(){r.value=!1}function R(){r.value=!1,s("mapping",i.value,n.value)}return l({open:_}),(x,T)=>{const U=f("key-value-mapping"),B=f("b-button"),N=f("b-modal");return P(),G("div",null,[o(N,{modelValue:r.value,"onUpdate:modelValue":T[1]||(T[1]=m=>r.value=m),title:"字典项配置",width:"720px"},{footer:c(()=>[o(B,{onClick:b},{default:c(()=>T[2]||(T[2]=[W("取 消")])),_:1}),o(B,{type:"primary",onClick:R},{default:c(()=>T[3]||(T[3]=[W("确 定")])),_:1})]),default:c(()=>[o(U,{modelValue:i.value,"onUpdate:modelValue":T[0]||(T[0]=m=>i.value=m)},null,8,["modelValue"])]),_:1},8,["modelValue"])])}}},na={class:"dict-config"},sa={class:"pt-8"},ia={key:0},ca={__name:"DictConfig",setup(t){const{dictConfig:l}=ee(),g=[{title:"字典名称",key:"dictName"},{title:"字典编码",key:"dictCode"},{slot:"action",width:90,title:"操作"}],s=$(null),r=$(null),n=$(!1),i=$(!1),_=$("add"),b=$({}),R=$(-1);function x(){i.value=!0,_.value="add",b.value=Wt()}function T(){i.value=!1,s.value.resetFields()}function U(L){i.value=!0,_.value="edit",R.value=L,b.value={...l.value[L]}}function B(L){l.value.splice(L,1)}function N(L){r.value.open(l.value[L],L)}function m(L,C){l.value[C].mapping=[...L]}function M(){s.value.validate(L=>{if(L){if(n.value=!0,_.value==="add")l.value.push(b.value);else{const C=l.value.findIndex(E=>E.dictCode===b.value.dictCode);l.value.splice(C,1,b.value)}n.value=!1,i.value=!1}else return!1})}const Y=$({dictName:[{required:!0,message:"必填项",trigger:"blur"},{validator:(L,C,E)=>{C.length&&(_.value==="edit"&&l.value[R.value].dictName===C&&E(),l.value.findIndex(v=>v.dictName===C)>-1?E(new Error("字典名称重复!")):E())},trigger:"blur"}],dictCode:[{required:!0,message:"必填项",trigger:"blur"},{validator:(L,C,E)=>{C.length&&(_.value==="edit"&&l.value[R.value].dictCode===C&&E(),l.value.findIndex(v=>v.dictCode===C)>-1?E(new Error("字典编码重复!")):E())},trigger:"blur"}]});return(L,C)=>{const E=f("b-button"),X=f("b-table"),v=f("b-card"),d=f("b-input"),H=f("b-form-item"),K=f("b-form"),q=f("b-modal");return P(),G("div",na,[o(v,{header:"字典配置",shadow:"never","head-tip":"",bordered:!1,"body-style":{padding:"8px 0"}},{default:c(()=>[o(X,{columns:g,data:O(l),"edit-table":"","edit-table-detail":""},{action:c(({index:j})=>[o(E,{type:"text",icon:"edit",onClick:z=>U(j)},null,8,["onClick"]),o(E,{type:"text",icon:"unorderedlist",onClick:z=>N(j)},null,8,["onClick"]),o(E,{type:"text","text-color":"danger",icon:"delete",onClick:z=>B(j)},null,8,["onClick"])]),_:1},8,["data"]),I("div",sa,[o(E,{icon:"plus",dashed:"",style:{width:"100%","border-radius":"8px"},onClick:x},{default:c(()=>C[3]||(C[3]=[W(" 新增字典 ")])),_:1})])]),_:1}),o(q,{modelValue:i.value,"onUpdate:modelValue":C[2]||(C[2]=j=>i.value=j),title:"字典配置"},{footer:c(()=>[o(E,{onClick:T},{default:c(()=>C[4]||(C[4]=[W("取 消")])),_:1}),o(E,{type:"primary",loading:n.value,onClick:M},{default:c(()=>C[5]||(C[5]=[W("确 定")])),_:1},8,["loading"])]),default:c(()=>[i.value?(P(),G("div",ia,[o(K,{ref_key:"formRef",ref:s,model:b.value,rules:Y.value,"label-width":"100px","label-suffix":":"},{default:c(()=>[o(H,{label:"字典名称",prop:"dictName"},{default:c(()=>[o(d,{modelValue:b.value.dictName,"onUpdate:modelValue":C[0]||(C[0]=j=>b.value.dictName=j),clearable:"",maxlength:200},null,8,["modelValue"])]),_:1}),o(H,{label:"字典编码",prop:"dictCode"},{default:c(()=>[o(d,{modelValue:b.value.dictCode,"onUpdate:modelValue":C[1]||(C[1]=j=>b.value.dictCode=j),clearable:"",maxlength:50},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])):se("",!0)]),_:1},8,["modelValue"]),o(ra,{ref_key:"mappingRef",ref:r,onMapping:m},null,512)])}}},ua=le(ca,[["__scopeId","data-v-e0ef5bfc"]]);function da(){return{paramsDesc:[{name:"univer (插件封装实例)",desc:"可以获取操作的univerAPI对象,可以进行控制univer表格,具体见下方说明",code:`/**
 * univer封装实例
 * @param {Object} univerAPI univerAPI对象,可以操作univer表格
 * @param {Object} univer univer原始实例(一般不需要直接操作)
 */
const { univerAPI, univer } = univer 
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
  getWorkBookData() {}

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
}`},{name:"utils (帮助函数集合)",desc:"帮助函数集合,包括一些辅助函数如单元格转换等",code:`/**
 * 帮助函数对象
 * @param {Object} util 工具函数集合
 * @param {Object} helper univer辅助函数集合
 * @param {Function} dayjs 日期处理函数
 */
const { util, helper, dayjs } = utils`},{name:"---- helper (univer辅助函数集合)",desc:"univer辅助函数集合",code:`/**
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
`},{name:"---- util (基本帮助函数)",desc:"基本帮助函数集合",code:`// 颜色转换函数
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
`},{name:"configData (原始的配置对象)",desc:"原始的配置对象",code:`/**
 * 原始的配置对象
 * @param {Object} univerInfo 原始univerInfo保存信息
 * @param {Object} dataset 原始数据集配置
 * @param {Object} config 全局配置
 */
const { univerInfo, dataset, config } = configData`},{name:"data (实际的数据对象)",desc:"实际的数据对象（注：需要根据实际情况判定，填报表单当前参数可能会为空）",code:`/**
 * 实际的数据对象
 * @param {Object} univerInfo 处理后的univerInfo保存信息
 * @param {Object} dataList 实际返回的数据集合
 */
const { univerInfo, dataList } = data`}],exampleDesc:[{name:"获取univerAPI对象",code:"const { univerAPI } = univer"},{name:"获取当前工作簿",code:"const workbook = univerAPI.getActiveWorkbook()"},{name:"获取当前激活的sheet",code:"const sheet = univerAPI.getActiveWorkbook().getActiveSheet()"},{name:"获取一个单元格",code:"const cell = univer.getCellByLetter('A1')"},{name:"全局字典配置",code:"const { dictConfig } = configData.config"},{name:"原始的数据集配置",code:"const { dataset } = configData"},{name:"univer帮助函数",code:"const { helper } = utils"},{name:"单元格转换",code:"const letter = utils.helper.getLetter(rowKey, colKey)"},{name:"当前数据集返回的数据列表",code:"const { univerInfo, dataList } = data"}]}}const fa={class:"script-config mt-8"},pa={flex:"main:justify"},ma={__name:"ScriptConfig",setup(t){const{customScripts:l}=ee(),{paramsDesc:g,exampleDesc:s}=da();return(r,n)=>{const i=f("b-switch"),_=f("CustomScripts"),b=f("b-form-item"),R=f("b-form"),x=f("b-card"),T=f("JsonSave");return P(),G("div",fa,[o(x,{header:"自定义脚本",shadow:"never","head-tip":"",bordered:!1,"body-style":{padding:"8px 0"}},{default:c(()=>[o(R,{"label-width":"64px","label-position":"left"},{default:c(()=>[o(b,{label:"是否启用"},{default:c(()=>[I("div",pa,[o(i,{size:"small",modelValue:O(l).enable,"onUpdate:modelValue":n[0]||(n[0]=U=>O(l).enable=U)},null,8,["modelValue"]),o(_,{modelValue:O(l).funcBody,"onUpdate:modelValue":n[1]||(n[1]=U=>O(l).funcBody=U),arguments:O(l).arguments,paramsDesc:O(g),exampleDesc:O(s),style:{display:"inline-flex",width:"auto"},label:"",modalTitle:"自定义脚本",funcExplain:"全局脚本，可以通过提供的脚本进行更灵活的配置和设置 <a href='https://univer.ai/zh-CN/guides/sheet/introduction' target='_blank'>[Univer官网]</a>"},null,8,["modelValue","arguments","paramsDesc","exampleDesc"])])]),_:1})]),_:1})]),_:1}),o(T,{modelValue:O(l),"onUpdate:modelValue":n[2]||(n[2]=U=>be(l)?l.value=U:null)},null,8,["modelValue"])])}}},ba={class:"global-config"},ga={__name:"GlobalConfig",setup(t){const{title:l,config:g}=ee();return(s,r)=>{const n=f("b-input"),i=f("b-form-item"),_=f("b-option"),b=f("b-select"),R=f("b-form"),x=f("b-card");return P(),G("div",ba,[o(x,{header:"报表信息",shadow:"never","head-tip":"",bordered:!1,"body-style":{padding:"16px 8px 0"}},{default:c(()=>[o(R,{"label-width":"64px","label-position":"left"},{default:c(()=>[o(i,{label:"报表名称"},{default:c(()=>[o(n,{modelValue:O(l),"onUpdate:modelValue":r[0]||(r[0]=T=>be(l)?l.value=T:null),placeholder:"请输入报表名称"},null,8,["modelValue"])]),_:1}),o(i,{label:"报表类型"},{default:c(()=>[o(b,{modelValue:O(g).type,"onUpdate:modelValue":r[1]||(r[1]=T=>O(g).type=T),placeholder:"请选择报表类型"},{default:c(()=>[o(_,{value:"render",label:"渲染报表"}),o(_,{value:"fill",label:"数据填报"})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),o(ua),o(ma)])}}},_a=le(ga,[["__scopeId","data-v-b63a7e32"]]),va={dropdown:w.LIST,dropdown_multiple:w.LIST_MULTIPLE,checkbox:w.CHECKBOX,number:w.WHOLE,number_integer:w.WHOLE,number_decimal:w.DECIMAL,text_length:w.TEXT_LENGTH,date:w.DATE},Da={bw:Q.BETWEEN,nb:Q.NOT_BETWEEN,eq:Q.EQUAL,ne:Q.NOT_EQUAL,gt:Q.GREATER_THAN,lt:Q.LESS_THAN,gte:Q.GREATER_THAN_OR_EQUAL,lte:Q.LESS_THAN_OR_EQUAL,bf:Q.LESS_THAN,nbf:Q.GREATER_THAN_OR_EQUAL,af:Q.GREATER_THAN,naf:Q.LESS_THAN_OR_EQUAL};function ya(t){if(t.dataVerification){const l=[];for(const g in t.dataVerification){const s=t.dataVerification[g];let r="";s.type==="dropdown"&&s.type2===!0?r="dropdown_multiple":r=s.type;const n=va[r];if(!n)continue;const[i,_]=g.split("_"),b=parseInt(i),R=parseInt(_),x={uid:ge(),type:n,ranges:[{startRow:b,endRow:b,startColumn:R,endColumn:R}]};switch(r){case"number":case"number_integer":case"number_decimal":case"text_length":case"date":x.operator=Da[""+s.type2||"eq"],s.type2==="bw"||s.type2==="nb"?(x.formula1=""+s.value1,x.formula2=""+s.value2):x.formula1=""+s.value1;break;case"dropdown":case"dropdown_multiple":x.formula1=""+s.value1;break}x.prompt=s.hintText,l.push(x)}return l}}function xa(t,l,g,s){return s.name!==void 0?(l.id=`${s.name}`,l.name=s.name):l.id=ge(),l.rowCount=s.row||200,l.columnCount=s.column||26,{worksheetDataVerification:ya(t)}}function Ca(t,l){var g,s,r,n,i,_,b,R,x,T,U,B,N,m,M,J,F,Y,L,C,E,X,v,d,H,K,q,j,z,Z,te,h,oe,S,ae,_e,ve,De,ye,xe,Ce,ke,Ne,Ve,Re,Te,Ee,Ae,Ue,Ie,Le,Oe,Be,je,$e,Pe,Me,ze,He,Ke,We,Fe,qe,Ge,Qe,Je,Xe,Ze,Ye,he,we,Se,et,tt,at,lt,ot,rt,nt,st,it,ct,ut,dt,ft,pt,mt,bt,gt,_t,vt,Dt,yt,xt,Ct,kt,Nt;t.cellData={};for(let u of l.config.borderInfo)if(u.rangeType==="cell"){const A=u.value.row_index,p=u.value.col_index;t.cellData[A]||(t.cellData[A]={}),t.cellData[A][p]||(t.cellData[A][p]={}),t.cellData[A][p].s||(t.cellData[A][p].s={});const y={};u.value.l&&(y.l={s:Number(u.value.l.style),cl:{rgb:u.value.l.color}},t.cellData[A]&&((r=(s=(g=t.cellData[A][p-1])==null?void 0:g.s)==null?void 0:s.bd)!=null&&r.r)&&((_=(i=(n=t.cellData[A][p-1])==null?void 0:n.s)==null?void 0:i.bd)==null||delete _.r)),u.value.r&&(y.r={s:Number(u.value.r.style),cl:{rgb:u.value.r.color}},t.cellData[A]&&((x=(R=(b=t.cellData[A][Number(p)+1])==null?void 0:b.s)==null?void 0:R.bd)!=null&&x.l)&&((B=(U=(T=t.cellData[A][p-1])==null?void 0:T.s)==null?void 0:U.bd)==null||delete B.l)),u.value.t&&(y.t={s:Number(u.value.t.style),cl:{rgb:u.value.t.color}},t.cellData[A-1]&&((M=(m=(N=t.cellData[A][p])==null?void 0:N.s)==null?void 0:m.bd)!=null&&M.b)&&((Y=(F=(J=t.cellData[A][p-1])==null?void 0:J.s)==null?void 0:F.bd)==null||delete Y.b)),u.value.b&&(y.b={s:Number(u.value.b.style),cl:{rgb:u.value.b.color}},t.cellData[Number(A)+1]&&((E=(C=(L=t.cellData[A][p])==null?void 0:L.s)==null?void 0:C.bd)!=null&&E.t)&&((d=(v=(X=t.cellData[A][p-1])==null?void 0:X.s)==null?void 0:v.bd)==null||delete d.t)),t.cellData[A][p].s.bd=Object.assign(t.cellData[A][p].s.bd||{},y)}else if(u.rangeType==="range")for(const A of u.range){const p=A.row[0],y=A.row[1],k=A.column[0],V=A.column[1];switch(u.borderType){case"border-left":for(let e=p;e<=y;e++)for(let a=k;a<k+1;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};D.l={s:Number(u.style),cl:{rgb:u.color}},t.cellData[e][a].s.bd=Object.assign(t.cellData[e][a].s.bd||{},D)}for(let e=p;e<=y;e++)for(let a=k-1;a<k;a++)t.cellData[e]&&((q=(K=(H=t.cellData[e][a])==null?void 0:H.s)==null?void 0:K.bd)!=null&&q.r)&&((z=(j=t.cellData[e][a].s)==null?void 0:j.bd)==null||delete z.r);break;case"border-right":for(let e=p;e<=y;e++)for(let a=V;a<V+1;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};D.r={s:Number(u.style),cl:{rgb:u.color}},t.cellData[e][a].s.bd=Object.assign(t.cellData[e][a].s.bd||{},D)}for(let e=p;e<=y;e++)for(let a=V+1;a<V+2;a++)t.cellData[e]&&((h=(te=(Z=t.cellData[e][a])==null?void 0:Z.s)==null?void 0:te.bd)!=null&&h.l)&&((oe=t.cellData[e][a].s.bd)==null||delete oe.l);break;case"border-top":for(let e=p;e<p+1;e++)for(let a=k;a<=V;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};D.t={s:Number(u.style),cl:{rgb:u.color}},t.cellData[e][a].s.bd=Object.assign(t.cellData[e][a].s.bd||{},D)}for(let e=p-1;e<p;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((_e=(ae=(S=t.cellData[e][a])==null?void 0:S.s)==null?void 0:ae.bd)!=null&&_e.b)&&((ve=t.cellData[e][a].s.bd)==null||delete ve.b);break;case"border-bottom":for(let e=y;e<y+1;e++)for(let a=k;a<=V;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};D.b={s:Number(u.style),cl:{rgb:u.color}},t.cellData[e][a].s.bd=Object.assign(t.cellData[e][a].s.bd||{},D)}for(let e=y+1;e<y+2;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((xe=(ye=(De=t.cellData[e][a])==null?void 0:De.s)==null?void 0:ye.bd)!=null&&xe.t)&&((Ce=t.cellData[e][a].s.bd)==null||delete Ce.t);break;case"border-all":for(let e=p;e<=y;e++)for(let a=k;a<=V;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};D.l={s:Number(u.style),cl:{rgb:u.color}},D.t={s:Number(u.style),cl:{rgb:u.color}},a===V&&(D.r={s:Number(u.style),cl:{rgb:u.color}}),e===y&&(D.b={s:Number(u.style),cl:{rgb:u.color}}),t.cellData[e][a].s.bd=D}for(let e=p;e<=y;e++)for(let a=k-1;a<k;a++)t.cellData[e]&&((Ve=(Ne=(ke=t.cellData[e][a])==null?void 0:ke.s)==null?void 0:Ne.bd)!=null&&Ve.r)&&((Re=t.cellData[e][a].s.bd)==null||delete Re.r);for(let e=p;e<=y;e++)for(let a=V+1;a<V+2;a++)t.cellData[e]&&((Ae=(Ee=(Te=t.cellData[e][a])==null?void 0:Te.s)==null?void 0:Ee.bd)!=null&&Ae.l)&&((Ue=t.cellData[e][a].s.bd)==null||delete Ue.l);for(let e=p-1;e<p;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((Oe=(Le=(Ie=t.cellData[e][a])==null?void 0:Ie.s)==null?void 0:Le.bd)!=null&&Oe.b)&&((Be=t.cellData[e][a].s.bd)==null||delete Be.b);for(let e=y+1;e<y+2;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((Pe=($e=(je=t.cellData[e][a])==null?void 0:je.s)==null?void 0:$e.bd)!=null&&Pe.t)&&((Me=t.cellData[e][a].s.bd)==null||delete Me.t);break;case"border-outside":for(let e=p;e<=y;e++)for(let a=k;a<=V;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};e===p&&(D.t={s:Number(u.style),cl:{rgb:u.color}}),e===y&&(D.b={s:Number(u.style),cl:{rgb:u.color}}),a===k&&(D.l={s:Number(u.style),cl:{rgb:u.color}}),a===V&&(D.r={s:Number(u.style),cl:{rgb:u.color}}),t.cellData[e][a].s.bd=Object.assign(t.cellData[e][a].s.bd||{},D)}for(let e=p;e<=y;e++)for(let a=k-1;a<k;a++)t.cellData[e]&&((Ke=(He=(ze=t.cellData[e][a])==null?void 0:ze.s)==null?void 0:He.bd)!=null&&Ke.r)&&((We=t.cellData[e][a].s.bd)==null||delete We.r);for(let e=p;e<=y;e++)for(let a=V+1;a<V+2;a++)t.cellData[e]&&((Ge=(qe=(Fe=t.cellData[e][a])==null?void 0:Fe.s)==null?void 0:qe.bd)!=null&&Ge.l)&&((Qe=t.cellData[e][a].s.bd)==null||delete Qe.l);for(let e=p-1;e<p;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((Ze=(Xe=(Je=t.cellData[e][a])==null?void 0:Je.s)==null?void 0:Xe.bd)!=null&&Ze.b)&&((Ye=t.cellData[e][a].s.bd)==null||delete Ye.b);for(let e=y+1;e<y+2;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((Se=(we=(he=t.cellData[e][a])==null?void 0:he.s)==null?void 0:we.bd)!=null&&Se.t)&&((et=t.cellData[e][a].s.bd)==null||delete et.t);break;case"border-inside":for(let e=p;e<=y;e++)for(let a=k;a<=V;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};e===p&&a===k||(e===p?D.l={s:Number(u.style),cl:{rgb:u.color}}:a===k?D.t={s:Number(u.style),cl:{rgb:u.color}}:(D.l={s:Number(u.style),cl:{rgb:u.color}},D.t={s:Number(u.style),cl:{rgb:u.color}}),t.cellData[e][a].s.bd=D)}break;case"border-horizontal":for(let e=p;e<y;e++)for(let a=k;a<=V;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};D.b={s:Number(u.style),cl:{rgb:u.color}},t.cellData[e][a].s.bd=Object.assign(t.cellData[e][a].s.bd||{},D)}for(let e=p+1;e<=y;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((lt=(at=(tt=t.cellData[e][a])==null?void 0:tt.s)==null?void 0:at.bd)!=null&&lt.t)&&((ot=t.cellData[e][a].s.bd)==null||delete ot.t);break;case"border-vertical":for(let e=p;e<=y;e++)for(let a=k;a<V;a++){t.cellData[e]||(t.cellData[e]={}),t.cellData[e][a]||(t.cellData[e][a]={}),t.cellData[e][a].s||(t.cellData[e][a].s={});const D={};D.r={s:Number(u.style),cl:{rgb:u.color}},t.cellData[e][a].s.bd=Object.assign(t.cellData[e][a].s.bd||{},D)}for(let e=p;e<=y;e++)for(let a=k+1;a<=V;a++)t.cellData[e]&&((st=(nt=(rt=t.cellData[e][a])==null?void 0:rt.s)==null?void 0:nt.bd)!=null&&st.l)&&((it=t.cellData[e][a].s.bd)==null||delete it.l);break;case"border-none":for(let e=p;e<=y;e++)for(let a=k;a<=V;a++){if(!t.cellData[e]||!t.cellData[e][a]||!t.cellData[e][a].s)continue;const D={};t.cellData[e][a].s.bd=D}for(let e=p;e<=y;e++)for(let a=k-1;a<k;a++)t.cellData[e]&&((dt=(ut=(ct=t.cellData[e][a])==null?void 0:ct.s)==null?void 0:ut.bd)!=null&&dt.r)&&((ft=t.cellData[e][a].s.bd)==null||delete ft.r);for(let e=p;e<=y;e++)for(let a=V+1;a<V+2;a++)t.cellData[e]&&((bt=(mt=(pt=t.cellData[e][a])==null?void 0:pt.s)==null?void 0:mt.bd)!=null&&bt.l)&&((gt=t.cellData[e][a].s.bd)==null||delete gt.l);for(let e=p-1;e<p;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((Dt=(vt=(_t=t.cellData[e][a])==null?void 0:_t.s)==null?void 0:vt.bd)!=null&&Dt.b)&&((yt=t.cellData[e][a].s.bd)==null||delete yt.b);for(let e=y+1;e<y+2;e++)for(let a=k;a<=V;a++)t.cellData[e]&&((kt=(Ct=(xt=t.cellData[e][a])==null?void 0:xt.s)==null?void 0:Ct.bd)!=null&&kt.t)&&((Nt=t.cellData[e][a].s.bd)==null||delete Nt.t);break}}}function ka(t,l,g,s){if(s.config){if(s.config.merge){l.mergeData=[];for(const r of Object.keys(s.config.merge)){const n=s.config.merge[r],i={startRow:n.r,endRow:n.r+n.rs-1,startColumn:n.c,endColumn:n.c+n.cs-1};l.mergeData.push(i)}}if(s.config.borderInfo&&Ca(l,s),s.config.rowlen){l.rowData={};for(const[r,n]of Object.entries(s.config.rowlen))l.rowData[Number(r)]={h:Number(n),hd:0}}if(s.config.columnlen){l.columnData={};for(const[r,n]of Object.entries(s.config.columnlen))l.columnData[Number(r)]={w:Number(n),hd:0}}if(s.config.rowhidden){l.rowData||(l.rowData={});let r=l.rowData;for(const[n,i]of Object.entries(s.config.rowhidden))r[Number(n)]||(r[Number(n)]={}),r[Number(n)].hd=1}if(s.config.colhidden){l.columnData||(l.columnData={});let r=l.columnData;for(const[n,i]of Object.entries(s.config.colhidden))r[Number(n)]||(r[Number(n)]={}),r[Number(n)].hd=1}}}const Na={0:"Times New Roman",1:"Arial",2:"Tahoma",3:"Verdana",4:"Microsoft YaHei",5:"SimSun",6:"SimHei",7:"Kaiti",8:"FangSong",9:"NSimSun",10:"STXinwei",11:"STXingkai",12:"STLiti"};function Va(t,l,g,s){if(s.celldata){l.cellData||(l.cellData={});for(const r of s.celldata){const{r:n,c:i}=r;l.cellData[n]||(l.cellData[n]={}),l.cellData[n][i]||(l.cellData[n][i]={});const _=r.v,b=l.cellData[n][i];Ra(b,_)}}}function Ra(t,l){var g;if(l!==null){if(typeof l=="string"){t.v=l;return}if(((g=l==null?void 0:l.ct)==null?void 0:g.t)==="inlineStr"){const s=[];let r="";const n=l.ct.s;if(!n)return;let i=0;n.forEach(_=>{const b={};Tt(b,_);const R=Ea(String(_.v))||"";r+=R;let x=i;i=x+R.length,s.push({st:x,ed:i,ts:b})}),r+=`\r
`,t.p={id:ge(),body:{dataStream:r,textRuns:s},documentStyle:{}}}else{if(l.v!==void 0){let r=l.v;typeof r=="boolean"&&(r=r?1:0,t.t=Lt.BOOLEAN),t.v=l.v}else l.m!==void 0&&(t.v=l.m);l.f!==void 0&&(t.f=l.f,l.f.startsWith("==")&&(t.f=l.f.slice(1)));const s={};Tt(s,l),Ta(s,l),t.s=Object.assign(t.s||{},s)}}}function Tt(t,l){l.ff!==void 0&&(t.ff=Na[l.ff]),l.fc!==void 0&&(t.cl={rgb:l.fc}),l.fs!==void 0&&(t.fs=Number(l.fs)),l.bl!==void 0&&(t.bl=l.bl),l.it!==void 0&&(t.it=l.it),l.cl!==void 0&&(t.st={s:l.cl}),l.un!==void 0&&(t.ul={s:l.un})}function Ta(t,l){if(l.bg&&(t.bg={rgb:l.bg}),l.vt)switch(String(l.vt)){case"0":t.vt=ue.MIDDLE;break;case"1":t.vt=ue.TOP;break;case"2":t.vt=ue.BOTTOM;break}if(l.ht)switch(String(l.ht)){case"0":t.ht=de.CENTER;break;case"1":t.ht=de.LEFT;break;case"2":t.ht=de.RIGHT;break}if(l.tr)switch(l.tr){case"0":t.tr={a:0,v:0};break;case"1":t.tr={a:-45,v:0};break;case"2":t.tr={a:45,v:0};break;case"3":t.tr={a:0,v:1};break;case"4":t.tr={a:-90,v:0};break;case"5":t.tr={a:90,v:0};break}if(l.tb)switch(String(l.tb)){case"0":t.tb=fe.CLIP;break;case"1":t.tb=fe.OVERFLOW;break;case"2":t.tb=fe.WRAP;break}}function Ea(t){return t.replace(/\n/g,"\r")}async function Aa(t){return new Promise(l=>{Ot.transformExcelToLucky(t,g=>{if(!g.sheets||g.sheets.length===0){console.error("Failed to read the content of the excel file, currently does not support xls files!"),l(!1);return}l(Ua(g))})})}function Ua(t){const{info:l,sheets:g}=t;console.log("-------------luckyToUniver------------------"),console.log("info ========>",l),console.log("sheets ========>",g),console.log("--------------------------------------------");const s={},r={},n={name:l.name,locale:Bt.ZH_CN,styles:s,sheetOrder:["sheet1"],sheets:{sheet1:{id:"sheet1",name:"Sheet1",freeze:{xSplit:1,ySplit:1,startRow:1,startColumn:1},columnCount:26,rowCount:200,cellData:{0:{0:{v:"测试"}}}}}};if(Array.isArray(g)){n.sheetOrder=[],n.sheets={};for(let i of g){const _={},{worksheetDataVerification:b}=xa(n,_,t,i),R=_.id;b&&b.length>0&&(r[R]=b),ka(n,_,t,i),Va(n,_,t,i),n.sheets[R]=_,n.sheetOrder.push(R)}}return n.resources=[{name:jt,data:JSON.stringify(r)}],console.log("workbookData ========>",n),console.log("--------------------------------------------"),n}const Ia={class:"sheet-container"},La={class:"sheet-header"},Oa={class:"left"},Ba={class:"right"},ja={class:"sheet-body"},$a={class:"sheet-excel"},Pa={class:"right-config"},Ma={class:"title-top"},za={class:"body-content"},Ha={class:"top-tabs"},Ka={class:"config-content"},Wa={__name:"UniverRender",setup(t){const{title:l,univerSheetRef:g,uniPlugin:s,excelData:r,isShow:n,univerInfo:i,closePage:_,download:b,getUpdateData:R,debugStatus:x}=ee(),T=$t(),U=Ut(),B=$({}),N=$(!1),m=$("base");function M(v){v&&(v.length>0&&(B.value=v[0]),m.value="base")}function J(v){if(!v)return;const{dataTransfer:d,location:H}=v,K=d.getData("field");if(!K)return;const{dataset:q,field:j}=Kt(K,{}),z=q.isList?`#{${q.code}.${j.fieldName}}`:`\${${q.code}.${j.fieldName}}`,{col:Z,row:te}=H,h=It(te,Z);console.log(`location ========>[${h}]`,H);const S=s.value.univerAPI.getActiveWorkbook().getActiveSheet().getRange(h);S.setValue(z),S.setWrapStrategy(2)}function F(){R();const v={...Pt(r.value),datasetInfo:ie(r.value.datasetInfo),univerInfo:ie(r.value.univerInfo),config:ie(r.value.config)};return console.log("saveData ========>",v),v}async function Y(){await E(),b()}async function L(){const v=await C();if(!v)return;n.value=!1;const d=await Aa(v);i.value=d,await At(),n.value=!0}function C(){return new Promise(v=>{let d=document.createElement("input");d.type="file",d.onchange=H=>{const K=H.target.files;(!K||K.length===0)&&(ne.error("没有选择文件!"),v(null));let q=K[0],z=q.name.split(".");z[z.length-1]!=="xlsx"&&(ne.error("当前仅支持xlsx后缀的文件导入!"),v(null)),v(q)},d.click()})}async function E(){try{N.value=!0;const v=F();if(v.id===""){const H=await Mt(v);if(H){ne.success("新增成功!"),Rt("add-temp",{...v}),r.value.id=H,r.value.reportCount=r.value.records=0,r.value.isPublish="0";let K=T.resolve({path:"/excel-design",query:{id:H}});window.location.replace(K.href)}}else await zt(v),ne.success("修改成功!"),Rt("modify-temp",{...v})}catch(v){console.log(v)}N.value=!1}async function X(){await E();const v=r.value.config.type;let d=T.resolve({path:v==="render"?"/excel-preview":"/excel-fill",query:{id:U.query.id}});window.open(d.href,"_blank")}return(v,d)=>{const H=f("b-input"),K=f("b-space"),q=f("DebugModal"),j=f("b-icon"),z=f("b-button"),Z=f("b-divider"),te=f("TitleBar"),h=f("b-radio"),oe=f("b-radio-group"),S=f("b-scrollbar");return P(),G("div",Ia,[I("div",La,[I("div",Oa,[o(K,null,{default:c(()=>[d[2]||(d[2]=I("h3",null,"报表设计",-1)),o(H,{modelValue:O(l),"onUpdate:modelValue":d[0]||(d[0]=ae=>be(l)?l.value=ae:null),placeholder:"报表名称"},null,8,["modelValue"])]),_:1})]),I("div",Ba,[o(K,null,{default:c(()=>[o(q,{data:O(r)},null,8,["data"]),o(z,{onClick:O(x),type:"text","text-color":"danger"},{default:c(()=>[o(j,{name:"codelibrary",size:"20"})]),_:1},8,["onClick"]),o(Z,{type:"vertical"}),o(z,{type:"primary",size:"small",icon:"login",plain:"",onClick:L},{default:c(()=>d[3]||(d[3]=[W(" 导入 ")])),_:1}),o(z,{type:"primary",size:"small",icon:"logout",plain:"",onClick:Y},{default:c(()=>d[4]||(d[4]=[W(" 导出 ")])),_:1}),o(Z,{type:"vertical"}),o(z,{type:"primary",size:"small",icon:"save",loading:N.value,onClick:E},{default:c(()=>d[5]||(d[5]=[W(" 保存 ")])),_:1},8,["loading"]),o(Z,{type:"vertical"}),o(z,{type:"primary",size:"small",plain:"",icon:"eye",onClick:X},{default:c(()=>d[6]||(d[6]=[W(" 预览 ")])),_:1}),o(Z,{type:"vertical"}),o(z,{type:"danger",size:"small",icon:"close",onClick:O(_)},{default:c(()=>d[7]||(d[7]=[W("关闭")])),_:1},8,["onClick"])]),_:1})])]),I("div",ja,[o(ta),I("div",$a,[O(n)&&O(i)!==null?(P(),re(Ft,{key:0,ref_key:"univerSheetRef",ref:g,data:O(i),onSelectionChange:M,onCellDrop:J},null,8,["data"])):se("",!0)]),I("div",Pa,[I("div",Ma,[o(te,{title:"配置信息","tip-pos":"left",titleStyle:{fontSize:"14px"}})]),I("div",za,[I("div",Ha,[o(oe,{modelValue:m.value,"onUpdate:modelValue":d[1]||(d[1]=ae=>m.value=ae),type:"capsule",style:{width:"100%"}},{default:c(()=>[o(h,{label:"base"},{default:c(()=>d[8]||(d[8]=[W("基础")])),_:1}),o(h,{label:"global"},{default:c(()=>d[9]||(d[9]=[W("全局")])),_:1})]),_:1},8,["modelValue"])]),I("div",Ka,[o(S,null,{default:c(()=>[m.value==="base"?(P(),re(oa,{key:0,currentRange:B.value},null,8,["currentRange"])):se("",!0),m.value==="global"?(P(),re(_a,{key:1})):se("",!0)]),_:1})])])])])])}}},Fa=le(Wa,[["__scopeId","data-v-da5f0ca4"]]),qa={class:"sheet-wrapper"},Ga=Object.assign({name:"ExcelDesign"},{__name:"index",setup(t){const l=Ut(),g=$(!1),{initData:s}=ee();return Et(()=>l.path,async()=>{const{id:r}=l.query;if(document.title="报表设计",g.value=!1,r){const n=await Ht(r);s(n)}else s();g.value=!0},{immediate:!0}),(r,n)=>{const i=f("LoadingWrapper");return P(),G("div",qa,[o(i,{loading:!g.value},{default:c(()=>[o(Fa)]),_:1},8,["loading"])])}}}),Sa=le(Ga,[["__scopeId","data-v-cda086c5"]]);export{Sa as default};
