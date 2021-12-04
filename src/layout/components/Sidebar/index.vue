<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="44"
        shape="square"
        src="https://opencollective.com/vuejs/tiers/gold-sponsors/5/avatar.svg"
        src2="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />
      <h1
        class="logo-title"
        :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
      >
        imooc-admin
      </h1>
    </div>
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {} from 'vue'
import SidebarMenu from './SidebarMenu.vue'
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    padding-left: 10px;
    box-sizing: border-box;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    transition: all #{$sideBarDuration};
    width: 110px;

    &.hideSidebar {
      padding-left: 0;
      width: 0;
    }
  }
}

.el-avatar {
  --el-avatar-background-color: none;
}
</style>
