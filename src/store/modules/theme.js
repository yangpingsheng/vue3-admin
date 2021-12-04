import { getItem, setItem, MAIN_COLOR } from '@/utils/storage'
import { DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.scss'

export default {
  namespaced: true,
  state: () => ({
    /** 主题色 */
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    /** Sass 中定义的变量，主要包括颜色和尺寸 */
    variables,
  }),
  mutations: {
    /**
     * 设置主题色
     * @param {*} state
     * @param {string} newColor 新的主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    },
  },
}
