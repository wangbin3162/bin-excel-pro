/**
 * 封装的请求信息，注意，这里需要根据自己定义的请求函数进行包装并引入
 */
export function buildFun(funcBody, ...args) {
  const paramsStr = new Set([...args])
  const AsyncFunction = async function () {}.constructor
  const fun = new AsyncFunction(...paramsStr, funcBody)

  return async (...params) => {
    return await fun(...params)
  }
}
