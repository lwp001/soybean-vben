<template>
  <hover-container class="w-40px h-full" :tooltip-content="!isFullscreen ? '全屏' : '退出全屏'" @click="toggle">
    <icon-gridicons-fullscreen-exit v-if="isFullscreen" class="text-18px" />
    <icon-gridicons-fullscreen v-else class="text-18px" />
  </hover-container>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core';
import { HoverContainer } from '/@/components/Application';

const { isFullscreen, toggle } = useFullscreen();
</script>
<style scoped></style>
