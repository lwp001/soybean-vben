<template>
  <dark-mode-container class="flex h-full" @mouseleave="resetFirstDegreeMenus">
    <div class="flex-1 flex-col-stretch h-full">
      <app-logo :show-title="false" :style="{ height: theme.header.height + 'px' }" />
      <n-scrollbar class="flex-1-hidden">
        <mix-menu-detail
          v-for="item in firstDegreeMenus"
          :key="item.path"
          :is-active="item.path === activeParentRoutePath"
          :label="item.label"
          :icon="item.icon"
          :is-mini="app.siderCollapse"
          @click="handleMixMenu(item.path, item.hasChildren)"
        />
      </n-scrollbar>
      <mix-menu-collapse />
    </div>
    <mix-menu-drawer :visible="drawerVisible" :menus="activeChildMenus" />
  </dark-mode-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DarkModeContainer, AppLogo } from '/@/components/Application';
import { useAppStore } from '/@/store/modules/app';
import { useThemeStore } from '/@/store/modules/theme';
import { useGo } from '/@/hooks/web/usePage';
import useBoolean from '/@/hooks/core/useBoolean';

import type { Menu } from '/@/router/types';
import { MixMenuDetail, MixMenuDrawer, MixMenuCollapse } from './components';
// import { getMenus } from '/@/router/menus';
import { usePermissionStore } from '/@/store/modules/permission';

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const permStore = usePermissionStore();
const go = useGo();

const { bool: drawerVisible, setTrue: openDrawer, setFalse: hideDrawer } = useBoolean();

const activeChildMenus = ref<Menu[]>([]);

function setActiveChildMenus(path: string) {
  permStore.getBackMenuList.some(item => {
    const flag = item.path === path && Boolean(item.children?.length);
    if (flag) {
      // tempMenus.push(...item.children!);
      activeChildMenus.value = item.children || [];
    }
    return flag;
  });
}

const activeParentRoutePath = ref('');
function setActiveParentRoutPath(routePath: string) {
  activeParentRoutePath.value = routePath;
  setActiveChildMenus(routePath);
}

// const menus = getMenus();
/** 获取一级菜单数据 */
const firstDegreeMenus = permStore.getBackMenuList.map(item => {
  const { path, name } = item;
  const icon = item?.icon;
  const hasChildren = Boolean(item.children && item.children.length);

  return {
    path,
    label: name,
    icon,
    hasChildren
  };
});

/** 获取当前激活的第一级路由的路径*/
function getActiveParentRoutePath() {
  firstDegreeMenus.some(item => {
    if (route.path.includes(item.path)) {
      setActiveParentRoutPath(item.path);
    }
    return false;
  });
}

function handleMixMenu(routePath: string, hasChildren: boolean) {
  setActiveParentRoutPath(routePath);
  if (hasChildren) {
    openDrawer();
  } else {
    go(routePath);
  }
}

function resetFirstDegreeMenus() {
  getActiveParentRoutePath();
  hideDrawer();
}

watch(
  () => route.path,
  () => {
    getActiveParentRoutePath();
  },
  { immediate: true }
);
</script>
<style scoped></style>
