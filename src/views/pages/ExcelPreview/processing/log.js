export const log = true

// 打印标题标记
export function logTitle(title, color = '#1089ff') {
  if (log) console.log(`%c----------------${title}----------------`, `color: ${color};`)
}

// 打印分割线
export function logLine(color = '#1089ff') {
  if (log) console.log('%c --------------------------------------------', `color: ${color};`)
}
