<script setup lang="ts">
import { computed, unref } from 'vue';
import { $t } from '@/locales';

// import LoginFormTitle from './login-form-title.vue';
import { LoginStateEnum, useLoginState } from './use-login';

defineOptions({
  name: 'RegisterForm'
});

const { handleBackLogin, getLoginState } = useLoginState();

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);
</script>

<template>
  <template v-if="getShow">
    <!-- <LoginFormTitle class="enter-x" /> -->
    <NForm size="large" :show-label="false">
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
</template>

<style scoped></style>
