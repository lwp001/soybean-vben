<template>
  <dark-mode-container class="flex-col-stretch h-full">
    <app-logo v-if="!isHorizontalMix" :show-title="showTitle" :style="{ height: theme.header.height + 'px' }" />
    <n-scrollbar class="flex-1-hidden">
      <n-menu
        :value="activeKey"
        key-field="path"
        label-field="name"
        :collapsed="app.siderCollapse"
        :collapsed-width="theme.sider.collapsedWidth"
        :collapsed-icon-size="22"
        :options="menus"
        :expanded-keys="expandedKeys"
        :indent="18"
        @update:value="handleUpdateMenu"
        @update:expanded-keys="handleUpdateExpandedKeys"
      />
    </n-scrollbar>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DarkModeContainer } from '/@/components/Application';
import { AppLogo } from '/@/components/Application';
import { useAppStore } from '/@/store/modules/app';
import { useThemeStore } from '/@/store/modules/theme';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { usePermissionStore } from '/@/store/modules/permission';
import { getAllParentPath } from '/@/router/helper/menuHelper';
import { useRoute } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { useGo } from '/@/hooks/web/usePage';

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const tabStore = useMultipleTabStore();
const permStore = usePermissionStore();
const activeKey = computed(() => tabStore.activeRouterPath);
const expandedKeys = ref<string[]>([]);
const go = useGo();

const menus = permStore.getBackMenuList; //getMenus();

const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix');
const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');

function handleUpdateMenu(key: string, _item: MenuOption) {
  go(key);
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.path,
  newPath => {
    expandedKeys.value = getAllParentPath(permStore.getBackMenuList, newPath);
  },
  { immediate: true }
);
</script>
<style scoped></style>
