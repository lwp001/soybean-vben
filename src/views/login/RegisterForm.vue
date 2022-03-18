<template>
  <n-form :show-label="false" :model="formData" :rules="getFormRules" ref="formRef" size="medium">
    <n-form-item path="account">
      <n-input class="fix-auto-fill" v-model:value="formData.account" placeholder="账号" />
    </n-form-item>
    <n-form-item path="mobile">
      <n-input v-model:value="formData.mobile" placeholder="手机号码" class="fix-auto-fill" />
    </n-form-item>
    <n-form-item path="sms">
      <CountdownInput v-model:value="formData.sms" placeholder="短信验证码" />
    </n-form-item>
    <n-form-item path="password">
      <!-- <StrengthMeter v-model:value="formData.password" :placeholder="t('')" />-->
      <n-input show-password-on="click" type="password" v-model:value="formData.password" placeholder="密码" />
    </n-form-item>
    <n-form-item path="confirmPassword">
      <n-input
        show-password-on="click"
        type="password"
        v-model:value="formData.confirmPassword"
        placeholder="确认密码"
      />
    </n-form-item>

    <n-form-item path="policy">
      <!-- No logic, you need to deal with it yourself -->
      <n-checkbox v-model:checked="formData.policy" size="small">我同意xxx隐私政策</n-checkbox>
    </n-form-item>

    <n-button type="primary" block @click="handleRegister" :loading="loading">注册</n-button>
    <n-button block class="mt-4" @click="handleBackLogin">返回</n-button>
  </n-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { CountdownInput } from '/@/components/CountDown';
import { useLoginState, useFormRules } from './useLogin';

const { handleBackLogin } = useLoginState();

const formRef = ref();
const loading = ref(false);

const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false
});

const { getFormRules } = useFormRules(formData);

async function handleRegister() {
  console.log(formData);
}
</script>
