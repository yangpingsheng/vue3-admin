<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'

export default defineComponent({
  setup() {
    const i18n = useI18n()

    const guideStart = () => {
      const driver = new Driver({
        // 禁止点击蒙版关闭
        allowClose: false,
        closeBtnText: i18n.t('guide.close'),
        nextBtnText: i18n.t('guide.next'),
        prevBtnText: i18n.t('guide.prev'),
      })
      driver.defineSteps(steps(i18n))
      driver.start()
    }

    return () => {
      return (
        <div id="guide-start">
          <el-tooltip content={i18n.t('navBar.guide')}>
            <svg-icon icon="guide" onClick={guideStart} />
          </el-tooltip>
        </div>
      )
    }
  },
})
</script>

<style lang="scss" scoped></style>
