<script>
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { filterRouters, generateMenus } from '@/utils/route'
import { generateTitle } from '@/libs/i18n'

const MenuItem = defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { title, icon } = props
      return (
        <>
          {icon.includes('el-icon') ? (
            <i class={['sub-el-icon', icon]}></i>
          ) : (
            <svg-icon icon={icon}></svg-icon>
          )}
          <span>{generateTitle(title)}</span>
        </>
      )
    }
  },
})

const SidebarItem = defineComponent({
  name: 'SidebarItem',
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { route } = props

      if (route.children.length > 0) {
        return (
          <el-sub-menu index={route.path}>
            {{
              default: () => (
                <>
                  {route.children.map((item) => (
                    <SidebarItem key={item.path} route={item} />
                  ))}
                </>
              ),
              title: () => (
                <MenuItem icon={route.meta.icon} title={route.meta.title} />
              ),
            }}
          </el-sub-menu>
        )
      } else {
        return (
          <el-menu-item index={route.path}>
            <MenuItem icon={route.meta.icon} title={route.meta.title} />
          </el-menu-item>
        )
      }
    }
  },
})

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const routes = computed(() => {
      const filterRoutes = filterRouters(router.getRoutes())
      return generateMenus(filterRoutes)
    })

    // 默认激活的菜单
    const route = useRoute()
    const active = computed(() => {
      return route.path
    })

    return () => (
      <el-menu
        collapse={!store.getters.sidebarOpened}
        uniqueOpened={true}
        default-active={active.value}
        router
        background-color={store.getters.cssVar.menuBg}
        text-color={store.getters.cssVar.menuText}
        active-text-color={store.getters.cssVar.menuActiveText}
      >
        {routes.value.map((route) => (
          <SidebarItem key={route.path} route={route} />
        ))}
      </el-menu>
    )
  },
})
</script>

<style lang="scss" scoped></style>
