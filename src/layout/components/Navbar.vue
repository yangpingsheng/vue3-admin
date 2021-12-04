<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { logout } from '@/libs/logout'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect'
import Screenfull from '@/components/Screenfull'
import HeaderSearch from '@/components/HeaderSearch'
import Guide from '@/components/Guide'

const Logout = defineComponent({
  setup(props, context) {
    return () => {
      return (
        <el-dropdown-item divided onClick={logout}>
          {context.slots.default()}
        </el-dropdown-item>
      )
    }
  },
})

export default defineComponent({
  setup() {
    const store = useStore()
    const i18n = useI18n()

    return () => {
      return (
        <div class="navbar">
          <Hamburger class="hamburger-container" />
          <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
          <div class="right-menu">
            <Guide class="right-menu-item hover-effect" />
            <HeaderSearch class="right-menu-item hover-effect" />
            <Screenfull class="right-menu-item hover-effect" />
            <ThemeSelect class="right-menu-item hover-effect" />
            <LangSelect class="right-menu-item hover-effect" />
            {/*头像*/}
            <el-dropdown class="avatar-container" trigger="click">
              {{
                default: () => (
                  <div class="avatar-wrapper">
                    {/*头像地址是由后端提供的网络地址*/}
                    <el-avatar
                      shape="square"
                      size={40}
                      src={
                        'https://opencollective.com/vuejs/tiers/gold-sponsors/5/avatar.svg' ||
                        store.getters.userInfo.avatar
                      }
                    ></el-avatar>
                    <i class="el-icon-s-tools"></i>
                  </div>
                ),
                dropdown: () => (
                  <el-dropdown-menu class="user-dropdown">
                    <router-link to="/">
                      <el-dropdown-item>
                        {i18n.t('navBar.home')}
                      </el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="">
                      <el-dropdown-item>
                        {i18n.t('navBar.course')}
                      </el-dropdown-item>
                    </a>
                    <Logout>{i18n.t('navBar.logout')}</Logout>
                  </el-dropdown-menu>
                ),
              }}
            </el-dropdown>
          </div>
        </div>
      )
    }
  },
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
