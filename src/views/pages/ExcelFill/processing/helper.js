/**
 * 判断字符串是否被${}包裹
 * @param {*} value
 * @returns
 */
export function isWrappedWithDollarBrackets(value) {
  return /\$\{([^}]+)\}/g.test(value)
}

/**
 * 判断字符串是否被#\{}包裹
 * @param {*} value
 * @returns
 */
export function isWrappedWithHashBrackets(value) {
  return /#\{([^}]+)\}/g.test(value)
}

/**
 * 根据字符串获取对象中的值
 * @param {*} cell  cell.v = ${code001.name}
 * @returns ['code001','name']
 */
export function getDollarBracketsPropertys(cell) {
  const val = cell.v
  const regex = /\$\{([^}]+)\}/g
  const flag = regex.test(val)
  if (!flag) return null
  const matches = val.match(regex)
  if (matches && matches[0]) {
    // console.log('matches ========>', matches)
    const propertyName = matches[0].replace(regex, '$1')
    // console.log('propertyName ========>', propertyName)
    return propertyName.split('.')
  }
  return null
}

/**
 * 判断是否是#{} 包裹的内容，并返回flag以及解析出的propertyPath
 * @param {*} cell  cell.v = #{code002.name}
 * @returns  ['code002','name']
 */
export function getHashBracketsPropertys(cell) {
  const val = cell.v
  const regex = /#\{([^}]+)\}/g
  const flag = regex.test(val)
  if (!flag) return null
  const matches = val.match(regex)

  if (matches && matches[0]) {
    // console.log('matches ========>', matches)
    const propertyName = matches[0].replace(regex, '$1')
    // console.log('propertyName ========>', propertyName)
    return propertyName.split('.')
  }
  return null
}
