<script>
import { computed, defineComponent } from 'vue'
import { isExternal as external } from '@/utils/validate'

export default defineComponent({
  props: {
    /** icon 图标 */
    icon: {
      type: String,
      required: true,
    },
    /** 图标类名 */
    className: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs }) {
    /**
     * 当前图标是否为外部图标
     */
    const isExternal = computed(() => external(props.icon))

    /**
     * 外部图标样式
     */
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.icon}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
    }))

    /**
     * 内部图标
     * - 也就是 `src/icons/svg` 中的图标，`icon-` 前缀由 webpack 配置
     */
    const iconName = computed(() => `#icon-${props.icon}`)

    return () => {
      const { className } = props

      return isExternal.value ? (
        // 外部样式
        <div
          style={styleExternalIcon.value}
          class={['svg-icon', 'svg-external-icon', className, attrs.class]}
        ></div>
      ) : (
        // 内部样式
        <svg class={['svg-icon', className, attrs.class]} aria-hidden="true">
          <use xlink:href={iconName.value} />
        </svg>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
