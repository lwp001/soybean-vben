<script setup lang="ts">
import { computed, reactive, unref } from 'vue';
import { $t } from '@/locales';

import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

import { LoginStateEnum, useLoginState } from './use-login';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();

const { formRef, validate } = useNaiveForm();
const { constantRules } = useFormRules();

interface FormModel {
  userName: string;
  password: string;
}

const model: FormModel = reactive({
  userName: 'Soybean',
  password: '123456'
});
const { setLoginState, getLoginState } = useLoginState();
const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

const rules: Record<keyof FormModel, App.Global.FormRule[]> = {
  userName: constantRules.userName,
  password: constantRules.pwd
};

async function handleSubmit() {
  await validate();
  await authStore.login(model.userName, model.password);
}
</script>

<template>
  <NForm
    v-show="show"
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
    @keyup.enter="handleSubmit"
  >
    <NFormItem path="userName">
      <NInput v-model:value="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" autofocus />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
        <!--     @click="setLoginState(LoginStateEnum.RESET_PASSWORD)" -->
        <NButton quaternary>{{ $t('page.login.pwdLogin.forgetPassword') }}</NButton>
      </div>
      <NButton type="primary" size="large" block round :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <div class="flex-y-center justify-between gap-12px">
        <NButton class="flex-1" block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ $t('page.login.codeLogin.title') }}
        </NButton>
        <NButton class="flex-1" block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ $t('page.login.register.title') }}
        </NButton>
      </div>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
