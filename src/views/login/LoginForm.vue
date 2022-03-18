<template>
  <n-form
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    size="large"
    :show-label="false"
    @keypress.enter="handleLogin"
  >
    <n-form-item path="account">
      <n-input v-model:value="formData.account" placeholder="账号" />
    </n-form-item>
    <n-form-item path="password">
      <n-input show-password-on="mousedown" type="password" v-model:value="formData.password" placeholder="密码" />
    </n-form-item>

    <n-form-item class="-mt-2">
      <n-space justify="space-between" class="w-full mt-10">
        <n-checkbox v-model:checked="rememberMe" size="small">记住我</n-checkbox>
        <n-button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">忘记密码?</n-button>
      </n-space>
    </n-form-item>

    <n-button type="primary" block size="large" :loading="loading" class="-mt-5 mb-4" @click="handleLogin">
      登录
    </n-button>

    <n-grid cols="3" item-responsive responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item span="3 m:3 l:1">
        <n-button block @click="setLoginState(LoginStateEnum.MOBILE)">手机登录</n-button>
      </n-grid-item>
      <n-grid-item span="3 m:3 l:1">
        <n-button block @click="setLoginState(LoginStateEnum.QR_CODE)">二维码登录</n-button>
      </n-grid-item>
      <n-grid-item span="3 m:3 l:1">
        <n-button block @click="setLoginState(LoginStateEnum.REGISTER)">注册</n-button>
      </n-grid-item>
    </n-grid>

    <n-divider>其他登录方式</n-divider>

    <!-- <n-space>
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </n-space> -->
  </n-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

// import {
//   GithubFilled,
//   WechatFilled,
//   AlipayCircleFilled,
//   GoogleCircleFilled,
//   TwitterCircleFilled
// } from '@ant-design/icons-vue';

import { useNotification, useDialog } from 'naive-ui';
import { useUserStore } from '/@/store/modules/user';
import { LoginStateEnum, useLoginState, useFormRules } from './useLogin';

const notification = useNotification();

const dialog = useDialog();
const userStore = useUserStore();

const { setLoginState } = useLoginState();
const { getFormRules } = useFormRules();

const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const formData = reactive({
  account: 'vben',
  password: '123456'
});

// const { validForm } = useFormValid(formRef);

//onKeyStroke('Enter', handleLogin);

async function handleLogin() {
  if (!formRef.value) return;
  // e.preventDefault();

  formRef.value.validate(async errors => {
    if (!errors) {
      try {
        loading.value = true;
        const userInfo = await userStore.login({
          password: formData.password,
          username: formData.account,
          mode: 'none' //不要默认的错误提示
        });
        if (userInfo) {
          notification.success({
            title: '登录成功！',
            content: `欢迎回来: ${userInfo.realName}!`,
            duration: 3000
          });
        }
      } catch (error) {
        dialog.error({
          title: '错误提示',
          content: (error as unknown as Error).message || '网络异常，请检查您的网络连接是否正常!'
        });
      } finally {
        loading.value = false;
      }
    }
  });
}
</script>
