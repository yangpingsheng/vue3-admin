import { generateColors } from '@/utils/theme'

export default {
  /**
   * 用户 Token
   * @param {*} state
   * @returns {string}
   */
  token: (state) => state.user.token,

  /**
   * 是否已经获取到用户信息
   * @returns {boolean} true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}' // 判断对象是否为空对象
  },

  /**
   * 用户信息
   * @param {*} state
   * @returns
   */
  userInfo: (state) => {
    return state.user.userInfo
  },

  /**
   * CSS 变量
   * @param {*} state
   * @returns
   */
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      ...generateColors(state.theme.mainColor),
    }
  },

  /**
   * 左侧菜单栏是否已展开
   * @param {*} state
   * @returns {boolean}
   */
  sidebarOpened: (state) => state.app.sidebarOpened,

  /**
   * 当前的界面语言
   * @param {*} state
   * @returns {'zh'|'en'}
   */
  language: (state) => state.app.language,

  /**
   * 当前的主题色
   * @param {*} state
   * @returns
   */
  mainColor: (state) => state.theme.mainColor,

  /**
   * 快捷菜单列表 Tags
   * @param {*} state
   * @returns
   */
  tagsViewList: (state) => state.app.tagsViewList,
}
