<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    /** 切换左侧菜单栏的展开或收缩 */
    const toggleClick = () => {
      store.commit('app/triggerSidebarOpened')
    }

    /** 图标 */
    const icon = computed(() =>
      store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
    )

    return () => {
      return (
        <div class="hamburger-container" onClick={toggleClick}>
          <svg-icon
            id="guide-hamburger"
            class="hamburger"
            icon={icon.value}
          ></svg-icon>
        </div>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  :deep(.hamburger) {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
