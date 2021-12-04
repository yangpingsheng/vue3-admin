<script>
import {
  defineComponent,
  withModifiers,
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isTags } from '@/utils/tags'
import { generateTitle, watchSwitchLang } from '@/libs/i18n'
import ContextMenu from './ContextMenu.vue'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    // contextMenu 相关

    /** 上下文菜单对应的快捷菜单索引 */
    const selectIndex = ref(0)
    /** 是否显示上下文菜单 */
    const visible = ref(false)
    /** 上下文菜单的样式 */
    const menuStyle = reactive({
      left: 0,
      top: 0,
    })

    // 在菜单之外点击时，关闭菜单

    const refContextMenu = ref(null)
    const closeContextMenu = () => {
      visible.value = false
    }
    const handleClickContextMenuOut = (e) => {
      if (!refContextMenu.value.$el.contains(e.target)) {
        closeContextMenu()
      }
    }
    onMounted(() => {
      document.body.addEventListener('click', handleClickContextMenuOut)
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('click', handleClickContextMenuOut)
    })

    /**
     * 生成 title
     */
    const getTitle = (route) => {
      let title = ''
      if (!route.meta) {
        // 处理无 meta 的路由
        const pathArr = route.path.split('/')
        title = pathArr[pathArr.length - 1]
      } else {
        title = generateTitle(route.meta.title)
      }
      return title
    }

    // 路由变化时添加快捷菜单
    watch(
      route,
      (to) => {
        if (!isTags(to.path)) return
        const { fullPath, meta, name, params, path, query } = to
        store.commit('app/addTagsViewList', {
          fullPath,
          meta,
          name,
          params,
          path,
          query,
          title: getTitle(to),
        })
      },
      {
        immediate: true,
      }
    )

    // 语言变化时更新快捷菜单（国际化）
    watchSwitchLang(() => {
      store.getters.tagsViewList.forEach((route, index) => {
        store.commit('app/changeTagsView', {
          index,
          tag: {
            ...route,
            title: getTitle(route),
          },
        })
      })
    })

    /**
     * 显示上下文菜单
     * @param {MouseEvent} e 鼠标事件
     * @param {number} index 快捷菜单的索引号
     */
    const openMenu = (e, index) => {
      const { x, y } = e
      menuStyle.left = x + 'px'
      menuStyle.top = y + 'px'
      selectIndex.value = index
      visible.value = true
    }

    /**
     * 快捷菜单是否处于激活状态
     */
    const isActive = (tag) => {
      return tag.path === route.path
    }

    /**
     * 删除某个快捷菜单
     */
    const onCloseClick = (index) => {
      store.commit('app/removeTagsView', {
        type: 'index',
        index: index,
      })
    }

    return () => {
      return (
        <div class="tags-view-container">
          <el-scrollbar class="tags-view-wrapper">
            {store.getters.tagsViewList.map((tag, index) => {
              const active = isActive(tag)
              return (
                <router-link
                  key={tag.fullPath}
                  class="tags-view-item"
                  class={{ active: active }}
                  style={{
                    backgroundColor: active ? store.getters.cssVar.menuBg : '',
                    borderColor: active ? store.getters.cssVar.menuBg : '',
                  }}
                  to={{ path: tag.fullPath }}
                  onContextmenu={withModifiers(
                    (e) => {
                      openMenu(e, index)
                    },
                    ['prevent']
                  )}
                >
                  {tag.title}
                  <i
                    v-show={!active}
                    class="el-icon-close"
                    onClick={withModifiers(
                      () => onCloseClick(index),
                      ['prevent', 'stop']
                    )}
                  />
                </router-link>
              )
            })}
          </el-scrollbar>
          <ContextMenu
            ref={refContextMenu}
            v-show={visible.value}
            style={menuStyle}
            index={selectIndex.value}
          />
        </div>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
