/** 需要被保存为快捷菜单的页面 */
const whiteList = ['/login', '/import', '/404', '/401']

/**
 * Path 对应的页面是否需要被保存为快捷菜单
 * @param {string} path 页面路径
 * @returns
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
