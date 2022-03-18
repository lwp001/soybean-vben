<template>
  <n-breadcrumb class="px-12px">
    <template v-for="item in routes" :key="item.path">
      <n-breadcrumb-item>
        <n-dropdown v-if="hasRedirect(routes, item)" key-field="path" :options="item.children" @select="dropdownSelect">
          <span>
            <component
              :is="getIcon(item)"
              v-if="theme.header.crumb.showIcon"
              class="inline-block align-text-bottom mr-4px text-16px"
            />
            <span>{{ item.name || item.meta.title }}</span>
          </span>
        </n-dropdown>
        <template v-else>
          <component
            :is="getIcon(item)"
            v-if="theme.header.crumb.showIcon"
            class="inline-block align-text-bottom mr-4px text-16px"
          />
          <span>{{ item.name || item.meta.title }}</span>
        </template>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationMatched } from 'vue-router';
import { useThemeStore } from '/@/store/modules/theme';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

import { useGo } from '/@/hooks/web/usePage';

const theme = useThemeStore();
const go = useGo();

const tabStore = useMultipleTabStore();

const routes = computed(() => tabStore.getBreadCrumb);

function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
  return routes.indexOf(route) !== routes.length - 1;
}

function getIcon(route) {
  return route.icon || route.meta?.icon;
}

function dropdownSelect(key: string) {
  go(key);
}
</script>
<style scoped></style>
