import { createI18n } from 'vue-i18n'
import store from '@/store'
import en from './lang/en'
import zh from './lang/zh'

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  globalInjection: true, // 全局使用 t 函数
  locale: store.getters.language, // 默认语言
  messages: {
    en,
    zh,
  },
})

export default i18n
