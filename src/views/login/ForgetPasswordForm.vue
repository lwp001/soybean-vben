<template>
  <n-form :model="formData" :rules="getFormRules" ref="formRef" size="large" :show-label="false">
    <n-form-item path="account">
      <n-input v-model:value="formData.account" placeholder="账号" />
    </n-form-item>
    <n-form-item path="mobile">
      <n-input v-model:value="formData.mobile" placeholder="手机号码" />
    </n-form-item>
    <n-form-item name="sms">
      <CountdownInput v-model:value="formData.sms" placeholder="短信验证码" />
    </n-form-item>

    <n-button type="primary" block size="large" @click="handleReset" :loading="loading">重置</n-button>
    <n-button size="large" block class="mt-4" @click="handleBackLogin">返回</n-button>
  </n-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useLoginState, useFormRules } from './useLogin';
import { CountdownInput } from '/@/components/CountDown';
// import { CountButton } from '/@/components/CountDown';

const { handleBackLogin } = useLoginState();
const { getFormRules } = useFormRules();

const formRef = ref();
const loading = ref(false);

const formData = reactive({
  account: '',
  mobile: '',
  sms: ''
});

async function handleReset() {
  console.log('重置密码:', formData);
}
</script>
