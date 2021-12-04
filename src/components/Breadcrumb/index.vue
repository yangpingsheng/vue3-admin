<script>
import { defineComponent, watch, ref, TransitionGroup } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/libs/i18n'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    // 生成数组数据
    const breadcrumbData = ref([])
    const getBreadcrumbData = () => {
      breadcrumbData.value = route.matched.filter(
        (item) => item.meta && item.meta.title
      )
    }

    watch(route, () => getBreadcrumbData(), {
      immediate: true,
    })

    // 动态样式
    // eslint-disable-next-line
    const linkHoverColor = ref(store.getters.cssVar.menuBg)

    return () => {
      return (
        <el-breadcrumb class="breadcrumb" separator="/">
          <TransitionGroup name="breadcrumb">
            {breadcrumbData.value.map((item, index) =>
              index !== breadcrumbData.value.length - 1 ? (
                <el-breadcrumb-item key={item.path} to={{ path: item.path }}>
                  <span class="redirect">{generateTitle(item.meta.title)}</span>
                </el-breadcrumb-item>
              ) : (
                <el-breadcrumb-item key={item.path}>
                  <span class="no-redirect">
                    {generateTitle(item.meta.title)}
                  </span>
                </el-breadcrumb-item>
              )
            )}
          </TransitionGroup>
        </el-breadcrumb>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 主题色
    color: v-bind(linkHoverColor);
  }

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
