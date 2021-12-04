/**
 * 判断一个路径是否为外部资源
 * @param {string} path 文件路径
 * @returns
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
