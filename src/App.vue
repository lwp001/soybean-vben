<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { AppProvider } from '/@/components/Application';
import { useTitle } from '/@/hooks/web/useTitle';
import { zhCN, dateZhCN } from 'naive-ui';
import { useThemeStore } from '/@/store/modules/theme';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { subscribeStore } from '/@/store/subscribe';
import { getBreadCrumbFromMenu } from '/@/router/menus';

const theme = useThemeStore();
subscribeStore();

// Listening to page changes and dynamically changing site titles RouteLocationNormalizedLoaded
useTitle();
const route = useRoute();
// const vueRouter = useRouter();
const tabStore = useMultipleTabStore();

watch(
  () => route.path,
  newPath => {
    // 判断登录、异常等页面不进行操作
    // console.log('tab add router:', route.meta.icon);
    tabStore.setActivePath(newPath);

    if (theme.header.crumb.visible) {
      const breadcrumbList = getBreadCrumbFromMenu(route);
      tabStore.setBreadCrumb(breadcrumbList);
    }
  },
  {
    immediate: true
  }
);
</script>
