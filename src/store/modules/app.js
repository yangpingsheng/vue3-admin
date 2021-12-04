import { getItem, setItem, LANG, TAGS_VIEW } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    /** 左侧菜单栏是否展开 */
    sidebarOpened: true,
    /** 当前界面语言 */
    language: getItem(LANG) || 'zh',
    /** 快捷链接 */
    tagsViewList: getItem(TAGS_VIEW) || [],
  }),
  mutations: {
    /**
     * 切换左侧菜单栏的展开和收缩
     * @param {*} state
     */
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },

    /**
     * 设置国际化语言
     * @param {*} state
     * @param {'zh'|'en'} lang 新的语言
     */
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },

    /**
     * 添加快捷菜单 Tag
     * - 自动根据 path 进行去重
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },

    /**
     * 更新指定的快捷菜单 Tag
     * - 可用于标题文本的更新
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },

    /**
     * 删除快捷菜单 Tag
     * - 删除指定 Tag 本身或之外或之后的 Tag
     * @param {*} state
     * @param {{type: 'other'|'right'|'index', index: number}} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        // 删除指定的 Tag
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        // 删除指定 Tag 之外的所有 Tag
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        // 删除指定 Tag 之后的所有 Tag
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    },
  },
  actions: {},
}
