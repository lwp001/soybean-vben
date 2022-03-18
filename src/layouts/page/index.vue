<template>
  <div
    :class="{ 'p-16px': showPadding }"
    class="h-full bg-[#f6f9f8] dark:bg-[#101014] transition duration-300 ease-in-out"
  >
    <router-view v-slot="{ Component, route }">
      <transition :name="theme.page.animate ? theme.page.animateMode : undefined" mode="out-in" appear>
        <keep-alive :include="getCaches">
          <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- 原来有判断是否显示 frame 改动后去掉 -->
    <FrameLayout />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FrameLayout from '/@/layouts/iframe/index.vue';

import { useThemeStore } from '/@/store/modules/theme';
import { useAppStore } from '/@/store/modules/app';

import { useMultipleTabStore } from '/@/store/modules/multipleTab';

export default defineComponent({
  name: 'PageLayout',
  components: { FrameLayout },
  props: {
    /** 显示padding */
    showPadding: { type: Boolean, default: true }
  },
  setup() {
    const tabStore = useMultipleTabStore();
    const app = useAppStore();
    const theme = useThemeStore();

    const getCaches = computed((): string[] => {
      return tabStore.getCachedTabList;
    });

    return {
      getCaches,
      app,
      theme
    };
  }
});
</script>
