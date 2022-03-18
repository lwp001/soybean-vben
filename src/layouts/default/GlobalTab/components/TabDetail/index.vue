<template>
  <div ref="tabRef" class="h-full" :class="[isChromeMode ? 'flex items-end' : 'flex-y-center']">
    <component
      :is="activeComponent"
      v-for="(item, index) in getTabsState"
      :key="item.path"
      :is-active="tabStore.activeRouterPath === item.path"
      :primary-color="theme.themeColor"
      :closable="!(item && item.meta && item.meta.affix)"
      :dark-mode="theme.darkMode"
      :class="{ '!mr-0': isChromeMode && index === getTabsState.length - 1, 'mr-10px': !isChromeMode }"
      @click="handleChange(item.path)"
      @close="handleClose(item.path)"
      @contextmenu="handleContextMenu($event, item)"
    >
      <!-- <Icon v-if="item.meta.icon" :icon="item.meta.icon" class="inline-block align-text-bottom mr-4px text-16px" /> -->
      {{ item.meta.title }}
    </component>
  </div>
  <context-menu v-model:visible="dropdown.visible" :tab-item="dropdown.tabItem" :x="dropdown.x" :y="dropdown.y" />
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, watch } from 'vue';
// import { useEventListener } from '@vueuse/core';
import { ChromeTab, ButtonTab } from 'soybean-admin-tab';
// import { Icon } from '@iconify/vue';
import { useThemeStore } from '/@/store/modules/theme';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

import { ContextMenu } from './components';
import { useRouter, RouteLocationNormalized } from 'vue-router';
import { useGo } from '/@/hooks/web/usePage';

interface Emits {
  (e: 'scroll', clientX: number): void;
}

const emit = defineEmits<Emits>();

const theme = useThemeStore();
const tabStore = useMultipleTabStore();
const router = useRouter();
const go = useGo();

const isChromeMode = computed(() => theme.tab.mode === 'chrome');
const activeComponent = computed(() => (isChromeMode.value ? ChromeTab : ButtonTab));

const getTabsState = computed(() => {
  return tabStore.getTabList.filter(item => !item.meta?.hideTab);
});

// 获取当前激活的tab的clientX
const tabRef = ref<HTMLElement>();
async function getActiveTabClientX() {
  await nextTick();
  if (tabRef.value) {
    const index = tabStore.getTabList.findIndex(tab => tab.path === tabStore.activeRouterPath);
    if (index < 0) return;
    const activeTabElement = tabRef.value.children[index];
    const { x, width } = activeTabElement.getBoundingClientRect();
    const clientX = x + width / 2;
    setTimeout(() => {
      emit('scroll', clientX);
    }, 50);
  }
}

/** 点击标签 */
function handleChange(activeKey: any) {
  go(activeKey, false);
}

function handleClose(activeKey: any) {
  tabStore.closeTabByKey(activeKey, router);
}

const dropdown = reactive({
  visible: false,
  x: 0,
  y: 0,
  tabItem: undefined
});
function showDropdown() {
  dropdown.visible = true;
}
function hideDropdown() {
  dropdown.visible = false;
}
function setDropdown(x: number, y: number, route: RouteLocationNormalized) {
  // console.log('标签邮件菜单:', route);
  Object.assign(dropdown, { x, y, tabItem: route });
}

/** 点击右键菜单 */
async function handleContextMenu(e: MouseEvent, route: RouteLocationNormalized) {
  e.preventDefault();
  const { clientX, clientY } = e;
  hideDropdown();
  setDropdown(clientX, clientY, route);
  await nextTick();
  showDropdown();
}

watch(
  () => tabStore.activeRouterPath,
  () => {
    getActiveTabClientX();
  },
  {
    immediate: true
  }
);
</script>
<style scoped></style>
