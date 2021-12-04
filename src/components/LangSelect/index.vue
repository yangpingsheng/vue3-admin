<script>
import { defineComponent, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    /** Tooltip 主题色 */
    effect: {
      type: String,
      default: 'dark',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['dark', 'light'].includes(value)
      },
    },
  },
  setup(props) {
    const store = useStore()
    const i18n = useI18n()

    const language = computed(() => store.getters.language)

    /**
     * 切换语言
     * @param {'zh'|'en'} lang 语言
     */
    const handleSetLanguage = async (lang) => {
      store.commit('app/setLanguage', lang)
      await nextTick()
      ElMessage.success(i18n.t('toast.switchLangSuccess'))
    }

    return () => {
      return (
        <el-dropdown
          trigger="click"
          class="international"
          onCommand={handleSetLanguage}
        >
          {{
            default: () => (
              <div>
                <el-tooltip
                  content={i18n.t('navBar.lang')}
                  placement="bottom"
                  show-after={1000}
                  effect={props.effect}
                >
                  <svg-icon id="guide-lang" icon="language" />
                </el-tooltip>
              </div>
            ),
            dropdown: () => (
              <el-dropdown-menu>
                <el-dropdown-item
                  vShow={language.value !== 'zh'}
                  disabled={language.value === 'zh'}
                  command="zh"
                >
                  中文
                </el-dropdown-item>
                <el-dropdown-item
                  v-show={language.value !== 'en'}
                  disabled={language.value === 'en'}
                  command="en"
                >
                  English
                </el-dropdown-item>
              </el-dropdown-menu>
            ),
          }}
        </el-dropdown>
      )
    }
  },
})
</script>

<style lang="scss" scoped></style>
