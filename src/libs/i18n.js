import { watch } from 'vue'
import store from '@/store'
import i18n from '@/i18n'

/**
 * 使用菜单标题具备国际化功能
 * @param {*} title 菜单标题
 * @returns
 */
export function generateTitle(title) {
  return i18n.global.t('route.' + title)
}

/**
 * 添加语言切换回调
 * - 可以添加多个回调函数，这些函数将在语言切换时自动调用
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
