<template>
  <n-form :model="formData" :rules="getFormRules" ref="formRef" :show-label="false">
    <n-form-item path="mobile">
      <n-input v-model:value="formData.mobile" placeholder="手机号码" />
    </n-form-item>
    <n-form-item path="sms">
      <CountdownInput v-model:value="formData.sms" placeholder="短信验证码" />
    </n-form-item>
    <n-button type="primary" size="large" block @click="handleLogin" :loading="loading">登录</n-button>
    <n-button size="large" block class="mt-4" @click="handleBackLogin">返回</n-button>
  </n-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { CountdownInput } from '/@/components/CountDown';
import { useLoginState, useFormRules } from './useLogin';

const { handleBackLogin } = useLoginState();
const { getFormRules } = useFormRules();

const formRef = ref();
const loading = ref(false);

const formData = reactive({
  mobile: '',
  sms: ''
});

async function handleLogin() {
  console.log(formData);
}
</script>
