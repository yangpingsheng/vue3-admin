<script>
import {
  defineComponent,
  withModifiers,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { filterRouters } from '@/utils/route'
import { watchSwitchLang } from '@/libs/i18n'
import { generateRoutes } from './fuseData'

export default defineComponent({
  setup() {
    const router = useRouter()
    // 控制 search 显示
    const isShow = ref(false)

    // search 相关
    const search = ref('')

    const searchOptions = ref([])

    // el-select 实例
    const headerSearchSelectRef = ref(null)

    const close = () => {
      isShow.value = false
      headerSearchSelectRef.value.blur()
      searchOptions.value = []
    }

    const handleBodyClick = (e) => {
      // console.log(headerSearchSelectRef.value.$el)
      // document.createElement('div').contains
      if (!headerSearchSelectRef.value.$el.contains(e.target)) {
        close()
      }
    }

    onMounted(() => {
      document.body.addEventListener('click', handleBodyClick, true)
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('click', handleBodyClick, true)
    })

    /**
     * 搜索库相关
     */
    let fuse
    const initFuse = (searchPool) => {
      fuse = new Fuse(searchPool, {
        // 是否按优先级进行排序
        shouldSort: true,
        // 匹配长度超过这个值的才会被认为是匹配的
        minMatchCharLength: 1,
        // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
        // name：搜索的键
        // weight：对应的权重
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'path',
            weight: 0.3,
          },
        ],
      })
    }

    // 检索数据源

    let searchPool = computed(() => {
      const filterRoutes = filterRouters(router.getRoutes())
      return generateRoutes(filterRoutes)
    })
    initFuse(searchPool.value)

    watchSwitchLang(() => {
      searchPool = computed(() => {
        const filterRoutes = filterRouters(router.getRoutes())
        return generateRoutes(filterRoutes)
      })
      initFuse(searchPool.value)
    })

    const onShowClick = () => {
      isShow.value = !isShow.value
      if (isShow.value) headerSearchSelectRef.value.focus()
      else headerSearchSelectRef.value.blur()
    }

    // 搜索方法
    const querySearch = (query) => {
      if (query) {
        searchOptions.value = fuse.search(query)
      } else {
        searchOptions.value = []
      }
    }

    // 选中回调
    const onSelectChange = (val) => {
      router.push(val.path)
    }

    return () => {
      return (
        <div class={{ show: isShow.value }} class="header-search">
          <svg-icon
            id="guide-search"
            class-name="search-icon"
            icon="search"
            onClick={withModifiers(onShowClick, ['stop'])}
          />
          <el-select
            ref={headerSearchSelectRef}
            class="header-search-select"
            v-model={search.value}
            filterable
            default-first-option
            remote
            placeholder="Search"
            remote-method={querySearch}
            onChange={onSelectChange}
          >
            {searchOptions.value.map((option) => (
              <el-option
                key={option.item.path}
                label={option.item.title.join(' > ')}
                value={option.item}
              ></el-option>
            ))}
          </el-select>
        </div>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
