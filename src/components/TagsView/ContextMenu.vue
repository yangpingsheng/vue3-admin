<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    /** 快捷菜单在列表中的索引号 */
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const i18n = useI18n()

    /** 刷新 */
    const onRefreshClick = () => {
      router.go(0)
    }

    /** 关闭右侧 */
    const onCloseRightClick = () => {
      store.commit('app/removeTagsView', {
        type: 'rigth',
        index: props.index,
      })
    }

    /** 关闭其他 */
    const onCloseOtherClick = () => {
      store.commit('app/removeTagsView', {
        type: 'other',
        index: props.index,
      })
    }

    return () => {
      return (
        <ul class="context-menu-container">
          <li onClick={onRefreshClick}>{i18n.t('tagsView.refresh')}</li>
          <li onClick={onCloseRightClick}>{i18n.t('tagsView.closeRight')}</li>
          <li onClick={onCloseOtherClick}>{i18n.t('tagsView.closeOther')}</li>
        </ul>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
