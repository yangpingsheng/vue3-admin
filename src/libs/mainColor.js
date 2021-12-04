import store from '@/store'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

/**
 * 设置主题颜色
 * @param {*} color 主色
 */
export const setThemeColor = async (color) => {
  // 1.1 获取主题色
  const newStyleText = await generateNewStyle(color)
  // 1.2 写入最新主题色
  writeNewStyle(newStyleText)
  // 2. 保存最新的主题色
  store.commit('theme/setMainColor', color)
}
