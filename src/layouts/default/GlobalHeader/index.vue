<template>
  <dark-mode-container class="global-header flex-y-center h-full">
    <app-logo v-if="showLogo" :show-title="true" class="h-full" :style="{ width: theme.sider.width + 'px' }" />
    <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
      <menu-collapse v-if="showMenuCollape" />
      <global-breadcrumb v-if="theme.header.crumb.visible" />
    </div>
    <div v-else class="flex-1-hidden flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
      <header-menu />
    </div>
    <div class="flex justify-end h-full">
      <!-- <global-search /> -->
      <github-site />
      <full-screen />
      <theme-mode />
      <user-avatar />
      <hover-container class="w-40px h-full" tooltip-content="全屏" @click="app.toggleSettingdrawerVisible">
        <icon-ant-design-setting-outlined class="text-18px" />
      </hover-container>
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { DarkModeContainer } from '/@/components/Application';
import { useThemeStore } from '/@/store/modules/theme';
import type { GlobalHeaderProps } from '/@/typings';
import { AppLogo } from '/@/components/Application';
import { useAppStore } from '/@/store/modules/app';

// import GlobalSearch from '../GlobalSearch/index.vue';
import {
  MenuCollapse,
  GlobalBreadcrumb,
  HeaderMenu,
  GithubSite,
  FullScreen,
  ThemeMode,
  UserAvatar
} from './components';

interface Props {
  /** 显示logo */
  showLogo: GlobalHeaderProps['showLogo'];
  /** 显示头部菜单 */
  showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
  /** 显示菜单折叠按钮 */
  showMenuCollape: GlobalHeaderProps['showMenuCollape'];
}

defineProps<Props>();
const app = useAppStore();
const theme = useThemeStore();
</script>
<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
