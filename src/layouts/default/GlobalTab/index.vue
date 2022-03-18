<template>
  <dark-mode-container class="global-tab flex-y-center w-full pl-16px" :style="{ height: theme.tab.height + 'px' }">
    <div ref="bsWrapper" class="flex-1-hidden h-full">
      <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: canClick }">
        <tab-detail @scroll="handleScroll" />
      </better-scroll>
    </div>
    <reload-button />
  </dark-mode-container>
</template>

<script setup lang="ts">
import { ref, unref, toRaw } from 'vue';
import { RouteMeta, useRouter, RouteLocationNormalized } from 'vue-router';
import { useElementBounding } from '@vueuse/core';
import { DarkModeContainer } from '/@/components/Application';
import { BetterScroll } from '/@/components/BetterScroll';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useThemeStore } from '/@/store/modules/theme';
import { useDeviceInfo } from '/@/utils/env';
import type { ExposeBetterScroll } from '/@/typings';
import { TabDetail, ReloadButton } from './components';
import { REDIRECT_NAME } from '/@/router/constant';
import { listenerRouteChange } from '/@/logics/mitt/routeChange';

const theme = useThemeStore();
const tabStore = useMultipleTabStore();
const vueRouter = useRouter();
// const vueRoute = useRoute();
const deviceInfo = useDeviceInfo();

const bsWrapper = ref<HTMLElement>();
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper);

const bsScroll = ref<ExposeBetterScroll>();

const canClick = Boolean(deviceInfo.device.type);

function handleScroll(clientX: number) {
  const currentX = clientX - bsWrapperLeft.value;
  const deltaX = currentX - bsWrapperWidth.value / 2;
  if (bsScroll.value) {
    const { maxScrollX, x: leftX } = bsScroll.value.instance;
    const rightX = maxScrollX - leftX;
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
    bsScroll.value?.instance.scrollBy(update, 0, 300);
  }
}

// 初始化标签
/**
 * @description: Filter all fixed routes
 */
function filterAffixTabs(routes: RouteLocationNormalized[]) {
  const tabs: RouteLocationNormalized[] = [];
  routes &&
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        tabs.push(toRaw(route));
      }
    });
  return tabs;
}

/**
 * @description: Set fixed tabs
 */
function addAffixTabs(): void {
  const affixTabs = filterAffixTabs(vueRouter.getRoutes() as unknown as RouteLocationNormalized[]);
  // affixList.value = affixTabs;
  for (const tab of affixTabs) {
    tabStore.addTab({
      meta: tab.meta,
      name: tab.name,
      path: tab.path
    } as unknown as RouteLocationNormalized);
  }
}

addAffixTabs();

listenerRouteChange(route => {
  const { name } = route;
  // console.log('tab add router:', route);
  // 不用判断是否已经登录
  if (name === REDIRECT_NAME || !route) {
    return;
  }

  const { meta = {} } = route;
  const { currentActiveMenu, hideTab } = meta as RouteMeta;
  const isHide = !hideTab ? null : currentActiveMenu;

  if (isHide) {
    const findParentRoute = vueRouter.getRoutes().find(item => item.path === currentActiveMenu);

    findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
  } else {
    tabStore.addTab(unref(route));
  }
});
</script>
<style scoped>
.global-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
