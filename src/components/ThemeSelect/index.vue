<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { setThemeColor } from '@/libs/mainColor'

/** 预定义色值 */
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]

/** 颜色选择对话框 */
const SelectColor = defineComponent({
  props: {
    /** 是否显示对话框 */
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const store = useStore()
    const i18n = useI18n()

    // 默认色值
    const mColor = ref(store.getters.mainColor)

    /**
     * 关闭对话框
     */
    const closed = () => {
      emit('update:modelValue', false)
    }

    /**
     * 确定修改主题色
     * - 同时将关闭对话框
     */
    const comfirm = () => {
      setThemeColor(mColor.value)
      closed()
    }

    return () => {
      return (
        <el-dialog
          title={i18n.t('universal.title')}
          model-value={props.modelValue}
          onClose={closed}
          width="22%"
        >
          {{
            default: () => (
              <div class="center">
                <p class="title">{i18n.t('theme.themeColorChange')}</p>
                <el-color-picker
                  v-model={mColor.value}
                  predefine={predefineColors}
                ></el-color-picker>
              </div>
            ),
            footer: () => (
              <span class="dialog-footer">
                <el-button onClick={closed}>
                  {i18n.t('universal.cancel')}
                </el-button>
                <el-button type="primary" onClick={comfirm}>
                  {i18n.t('universal.confirm')}
                </el-button>
              </span>
            ),
          }}
        </el-dialog>
      )
    }
  },
})

export default defineComponent({
  inheritAttrs: false,
  setup(props, { attrs }) {
    const i18n = useI18n()
    const selectColorVisible = ref(false)
    const handleSetTheme = (command) => {
      selectColorVisible.value = true
    }

    return () => {
      return (
        // 这里可以使用 <>，但会导致 el-dropdown 等标签不会添加 data-v-xxxxxxxx 等属性
        <div>
          <el-dropdown
            {...attrs}
            id="guide-theme"
            trigger="click"
            class="theme"
            onCommand={handleSetTheme}
          >
            {{
              default: () => (
                <div>
                  <el-tooltip
                    content={i18n.t('navBar.themeChange')}
                    placement="bottom"
                    show-after={1000}
                  >
                    <svg-icon icon="change-theme" />
                  </el-tooltip>
                </div>
              ),
              dropdown: () => (
                <el-dropdown-menu>
                  <el-dropdown-item command="color">
                    {i18n.t('theme.themeColorChange')}
                  </el-dropdown-item>
                </el-dropdown-menu>
              ),
            }}
          </el-dropdown>
          <SelectColor v-model={selectColorVisible.value} />
        </div>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
:deep(.center) {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
