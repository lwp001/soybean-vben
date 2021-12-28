<template>
  <n-menu :value="activeKey" mode="horizontal" :options="menusRef" key-field="path" @update:value="handleUpdateMenu" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { NMenu } from 'naive-ui';
import type { Menu } from '@/router/types';
// import { menus } from '@/router';
import { getMenus } from '@/router/menus';

import { usePermissionStore } from '@/store/modules/permission';

const router = useRouter();
const route = useRoute();
const permissionStore = usePermissionStore();

const activeKey = computed(() => getActiveKey());
const menusRef = ref<Menu[]>([]);

function getActiveKey() {
  return route.path as string;
}

function handleUpdateMenu(key: string, item: MenuOption) {
  const menuItem = item as Menu;
  router.push(menuItem.path);
  // if (isUrl(key)) {
  //   openWindow(key);
  //   return;
  // }
}

// Menu changes
watch(
  [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
  () => {
    genMenus();
  },
  {
    immediate: true
  }
);

// get menus
async function genMenus() {
  // normal mode
  menusRef.value = await getMenus();
}
</script>
<style scoped></style>
