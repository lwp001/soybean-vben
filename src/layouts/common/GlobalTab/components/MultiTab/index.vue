<template>
  <div v-if="theme.multiTabStyle.mode === 'chrome'" ref="tabRef" class="flex items-end h-full">
    <chrome-tab
      v-for="(item, index) in getTabsState"
      :key="item.query ? item.fullPath : item.path"
      :is-active="activeKeyRef === item.path"
      :primary-color="theme.themeColor"
      :closable="!(item && item.meta && item.meta.affix)"
      :dark-mode="theme.darkMode"
      :is-last="index === getTabsState.length - 1"
      @click="handleClickTab(item)"
      @close="removeMultiTab(item)"
      @contextmenu="handleContextMenu($event, item)"
    >
      {{ item.meta?.title }}
    </chrome-tab>
  </div>
  <div v-if="theme.multiTabStyle.mode === 'button'" ref="tabRef" class="flex-y-center h-full">
    <button-tab
      v-for="item in getTabsState"
      :key="item.query ? item.fullPath : item.path"
      class="mr-10px"
      :is-active="activeKeyRef === item.path"
      :primary-color="theme.themeColor"
      :closable="!(item && item.meta && item.meta.affix)"
      :dark-mode="theme.darkMode"
      @click="handleClickTab(item)"
      @close="removeMultiTab(item)"
      @contextmenu="handleContextMenu($event, item)"
    >
      {{ item.meta?.title }}
    </button-tab>
  </div>
  <context-menu
    :visible="dropdownVisible"
    :route="dropdownConfig.route"
    :is-cur-item="dropdownConfig.isCurItem"
    :x="dropdownConfig.x"
    :y="dropdownConfig.y"
  />
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, computed, unref } from 'vue';
// import { useEventListener } from '@vueuse/core';
import { useRouter } from 'vue-router';
import type { RouteLocationNormalized, RouteMeta } from 'vue-router';
import { useThemeStore } from '@/store';
import { ChromeTab, ButtonTab } from '@/components';
import { useBoolean } from '@/hooks';
// import { setTabRouteStorage } from '@/utils';
import { ContextMenu } from './components';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useUserStore } from '@/store/modules/user';
import { listenerRouteChange } from '@/logics/mitt/routeChange';
import { REDIRECT_NAME } from '@/router/constant';
import { useGo } from '@/hooks/web/usePage';
import { useTabs } from '@/hooks/web/useTabs';

// interface Emits {
//   (e: 'scroll', clientX: number): void;
// }

// const emit = defineEmits<Emits>();
// 当前激活的标签
const activeKeyRef = ref('');

const theme = useThemeStore();
const tabStore = useMultipleTabStore();
const userStore = useUserStore();
const go = useGo();
const router = useRouter();

const getTabsState = computed(() => {
  return tabStore.getTabList.filter(item => !item.meta?.hideTab);
});
// 监听路由变化
listenerRouteChange(route => {
  const { name } = route;
  if (name === REDIRECT_NAME || !route || !userStore.getToken) {
    return;
  }

  const { path, meta = {} } = route;
  const { currentActiveMenu, hideTab } = meta as RouteMeta;
  const isHide = !hideTab ? null : currentActiveMenu;
  // const p = isHide || fullPath || path;
  if (activeKeyRef.value !== path) {
    activeKeyRef.value = path;
  }

  if (isHide) {
    const findParentRoute = router.getRoutes().find(item => item.path === currentActiveMenu);

    findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
  } else {
    tabStore.addTab(unref(route));
  }
});

// const { removeMultiTab, handleClickTab } = useAppStore();
const { bool: dropdownVisible, setTrue: showDropdown, setFalse: hideDropdown } = useBoolean();

const dropdownConfig = reactive({
  x: 0,
  y: 0,
  route: null, // getTabsState.value[0],
  isCurItem: false
});
function setDropdownConfig(x: number, y: number, route: RouteLocationNormalized) {
  Object.assign(dropdownConfig, { x, y, route, isCurItem: activeKeyRef.value === route.path });
}
// 切换页面
function handleClickTab(route: RouteLocationNormalized) {
  // activeKeyRef.value = activeKey;
  go(route.fullPath, false);
}
const { close } = useTabs();
function removeMultiTab(route: RouteLocationNormalized) {
  console.log('关闭标签', route.meta.title);
  close(route);
}
// 获取当前激活的tab的clientX
// const tabRef = ref<HTMLElement | null>(null);
// async function getActiveTabClientX() {
//   await nextTick();
//   const index = app.activeMultiTabIndex;
//   if (tabRef.value) {
//     const activeTabElement = tabRef.value.children[index];
//     const { x, width } = activeTabElement.getBoundingClientRect();
//     const clientX = x + width / 2;
//     setTimeout(() => {
//       emit('scroll', clientX);
//     }, 50);
//   }
// }

// 右键菜单
function handleContextMenu(e: MouseEvent, roter: RouteLocationNormalized) {
  e.preventDefault();
  const { clientX, clientY } = e;
  hideDropdown();
  setDropdownConfig(clientX, clientY, roter);
  nextTick(() => {
    showDropdown();
  });
}

/** 页面离开时缓存多页签数据 */
// useEventListener(window, 'beforeunload', () => {
//   setTabRouteStorage(app.multiTab.routes);
// });

// watch(
//   () => app.activeMultiTabIndex,
//   () => {
//     getActiveTabClientX();
//   },
//   {
//     immediate: true
//   }
// );
</script>
<style scoped></style>
