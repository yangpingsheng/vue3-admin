<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { ElConfigProvider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const store = useStore()

// ElementPlus 国际化
const locale = computed(() => {
  return store.getters.language === 'en' ? en : zhCn
})

// 初始化默认主题色
const mainColor = store.getters.mainColor
generateNewStyle(mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})

const i18n = useI18n()

const language = computed(() => store.getters.language)
watch(language, (lang) => {
  i18n.locale.value = lang
})
</script>

<style lang="scss"></style>
