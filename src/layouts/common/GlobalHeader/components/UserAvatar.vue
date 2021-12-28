<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px">
      <img :src="avatar" class="w-32px h-32px" />
      <span class="pl-8px text-16px font-medium">{{ getUserInfo.realName }}</span>
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { NDropdown, useDialog } from 'naive-ui';
import { HoverContainer } from '@/components';
import { useUserStore } from '@/store/modules/user';
import { useRouterPush } from '@/composables';
import { iconifyRender } from '@/utils';
import avatar from '@/assets/svg/avatar/avatar01.svg';

type DropdownKey = 'user-center' | 'logout';

const route = useRoute();
const userStore = useUserStore();
// const { resetAuthState } = useAuthStore();
const { toLogin } = useRouterPush();
const dialog = useDialog();
const { getUserInfo } = userStore;
const options = [
  {
    label: '用户中心',
    key: 'user-center',
    icon: iconifyRender('carbon:user-avatar')
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconifyRender('carbon:logout')
  }
];

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === 'logout') {
    dialog.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        userStore.logout(true);
        if (route.meta.requiresAuth) {
          toLogin();
        }
      }
    });
  }
}
</script>
<style scoped></style>
