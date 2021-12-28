<template>
  <div>
    <n-menu
      :value="activeKey"
      :collapsed="app.menu.collapsed"
      :collapsed-width="theme.menuStyle.collapsedWidth"
      :collapsed-icon-size="22"
      :options="menusRef"
      :expanded-keys="expandedKeys"
      :indent="18"
      key-field="path"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { useThemeStore } from '@/store';
import { useAppStore } from '@/store/modules/app';
import { getMenus } from '@/router/menus';
// import { GlobalMenuOption } from '@/interface';
import { isUrl } from '@/utils/is';
import { Menu } from '@/router/types';
import { useGo } from '@/hooks/web/usePage';

const theme = useThemeStore();
const app = useAppStore();
// const router = useRouter();
const route = useRoute();
const go = useGo();

const activeKey = computed(() => route.path as string);

const menusRef = ref<Menu[]>([]);
const expandedKeys = ref<string[]>(getExpendedKeys());

function getExpendedKeys() {
  const keys = menusRef.value.map(menu => getActiveKeysInMenus(menu)).flat();
  return keys;
}

function getActiveKeysInMenus(menu: Menu) {
  const keys: string[] = [];
  if (activeKey.value.includes(menu.path)) {
    keys.push(menu.path);
  }
  if (menu.children) {
    keys.push(...menu.children.map(item => getActiveKeysInMenus(item as Menu)).flat());
  }
  return keys;
}

function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as Menu;
  if (isUrl(menuItem.path)) {
    window.open(menuItem.path, '__blank');
  } else {
    // router.push(menuItem.path);
    go(menuItem.path);
  }
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

// get menus
async function genMenus() {
  // normal mode
  menusRef.value = await getMenus();
}

watch(
  () => route.name,
  () => {
    genMenus();
    expandedKeys.value = getExpendedKeys();
  },
  {
    immediate: true
  }
);
</script>
<style scoped></style>
