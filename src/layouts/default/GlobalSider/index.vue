<template>
  <vertical-sider v-if="!isVerticalMix" class="global-sider" />
  <vertical-mix-sider v-else class="global-sider" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '/@/store/modules/theme';
import { VerticalSider, VerticalMixSider } from './components';

const theme = useThemeStore();

const isVerticalMix = computed(() => theme.layout.mode === 'vertical-mix');
// console.log('菜单模式:', isVerticalMix.value);
</script>
<style scoped>
.global-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
