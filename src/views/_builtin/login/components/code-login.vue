<script setup lang="ts">
import { computed, unref } from 'vue';
import { $t } from '@/locales';

import { LoginStateEnum, useLoginState } from './use-login';

defineOptions({
  name: 'CodeLogin'
});
const { handleBackLogin, getLoginState } = useLoginState();
const show = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);
</script>

<template>
  <NForm v-if="show" size="large" :show-label="false">
    <NFormItem>
      <NInput :placeholder="$t('page.login.common.phonePlaceholder')" />
    </NFormItem>
    <NFormItem>
      <NInput :placeholder="$t('page.login.common.codePlaceholder')" />
    </NFormItem>
    <NSpace vertical :size="18" class="w-full">
      <NButton type="primary" size="large" block round>
        {{ $t('common.confirm') }}
      </NButton>
      <NButton size="large" block round @click="handleBackLogin">
        {{ $t('page.login.common.back') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
