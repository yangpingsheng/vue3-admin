<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

export default defineComponent({
  setup() {
    /** 是否全屏 */
    const isFullscreen = ref(false)

    /** 监听全屏变化 */
    const change = () => {
      isFullscreen.value = screenfull.isFullscreen
    }

    /** 切换全屏 */
    const onToggle = () => {
      screenfull.toggle()
    }

    // 设置侦听器
    onMounted(() => {
      screenfull.on('change', change)
    })

    // 删除侦听器
    onUnmounted(() => {
      screenfull.off('change', change)
    })

    return () => {
      return (
        <div>
          <svg-icon
            id="guide-full"
            icon={isFullscreen.value ? 'exit-fullscreen' : 'fullscreen'}
            onClick={onToggle}
          />
        </div>
      )
    }
  },
})
</script>

<style lang="less"></style>
