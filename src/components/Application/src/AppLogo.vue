<template>
  <!--  justify-start  mt-1 -->
  <router-link :to="routeHomePath" class="vben-app-logo flex-center w-full nowrap-hidden">
    <!-- ml-4 -->
    <div class="w-32px text-primary">
      <img src="../../../assets/images/logo.png" />
    </div>
    <h2
      class="pl-8px vben-app-logo__title font-bold text-primary transition duration-300 ease-in-out"
      v-show="showTitle"
    >
      {{ title }}
    </h2>
  </router-link>
</template>
<script lang="ts" setup>
import { useGlobSetting } from '/@/hooks/setting';
import { PageEnum } from '/@/enums/pageEnum';
import { useUserStore } from '/@/store/modules/user';

interface Props {
  /** 显示名字 */
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true
});

const userStore = useUserStore();
const { title } = useGlobSetting();
const routeHomePath = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
</script>
<style scoped></style>
