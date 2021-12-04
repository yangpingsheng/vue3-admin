import { TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem, TIME_STAMP } from '@/utils/storage'

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 * - 设置为当前时间
 * - 目前本函数只在用户登录时调用一次，所以即使用户一直在线，超时后仍然会被强制退出
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getTimeStamp()

  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
