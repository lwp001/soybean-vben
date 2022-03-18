<template>
  <n-menu :value="activeKey" key-field="path" mode="horizontal" :options="menus" @update:value="handleUpdateMenu" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { getMenus } from '/@/router/menus';
import { useGo } from '/@/hooks/web/usePage';

const route = useRoute();
const go = useGo();

const menus = getMenus();
const activeKey = computed(() => route.path);

function handleUpdateMenu(key: string, _item: MenuOption) {
  go(key);
}
</script>
<style scoped></style>
