<template>
  <soybean-admin-layout
    :mode="mode"
    :min-width="theme.layout.minWidth"
    :fixed-header-and-tab="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :sider-visible="siderVisible"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :sider-collapse="app.siderCollapse"
    v-bind="lockEvents"
  >
    <template #header>
      <global-header v-bind="headerProps" />
    </template>
    <template #tab>
      <global-tab />
    </template>
    <template #sider>
      <global-sider />
    </template>
    <!-- <global-content /> -->
    <LayoutContent />
    <template #footer>
      <global-footer />
    </template>
  </soybean-admin-layout>
  <setting-drawer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SoybeanAdminLayout from 'soybean-admin-layout';
// import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

import LayoutContent from './content/index.vue';
import GlobalSider from './GlobalSider/index.vue';
import GlobalHeader from './GlobalHeader/index.vue';
import GlobalTab from './GlobalTab/index.vue';
import GlobalFooter from './GlobalFooter/index.vue';

import { useLockPage } from '/@/hooks/web/useLockPage';

// import { useAppInject } from '/@/hooks/web/useAppInject';
import { useThemeStore } from '/@/store/modules/theme';
import { useAppStore } from '/@/store/modules/app';
import { useBasicLayout } from '/@/hooks/web/useBasicLayout';
import SettingDrawer from '/@/layouts/default/SettingDrawer/index.vue';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    GlobalHeader,
    LayoutContent,
    GlobalSider,
    SettingDrawer,
    SoybeanAdminLayout,
    GlobalTab,
    GlobalFooter
  },
  setup() {
    // const { getIsMobile } = useAppInject();
    const app = useAppStore();
    const theme = useThemeStore();
    const { mode, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();
    // Create a lock screen monitor
    const lockEvents = useLockPage();

    return {
      lockEvents,
      app,
      theme,
      mode,
      headerProps,
      siderVisible,
      siderWidth,
      siderCollapsedWidth
    };
  }
});
</script>
<style scoped></style>
