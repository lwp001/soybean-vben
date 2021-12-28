<template>
  <div class="pt-24px">
    <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
      <n-form-item path="phone">
        <n-input v-model:value="model.phone" placeholder="请输入手机号码" />
      </n-form-item>
      <n-form-item path="pwd">
        <n-input v-model:value="model.pwd" type="password" show-password-on="click" placeholder="请输入密码" />
      </n-form-item>
      <n-space :vertical="true" :size="24">
        <div class="flex-y-center justify-between">
          <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
          <span class="text-primary cursor-pointer" @click="toCurrentLogin('reset-pwd')">忘记密码？</span>
        </div>
        <login-agreement v-model:value="agreement" />
        <n-button type="primary" size="large" :block="true" :round="true" :loading="loading" @click="handleSubmit">
          确定
        </n-button>
        <div class="flex-y-center justify-between">
          <n-button class="flex-1" :block="true" @click="toCurrentLogin('code-login')">
            {{ EnumLoginModule['code-login'] }}
          </n-button>
          <div class="w-12px"></div>
          <n-button class="flex-1" :block="true" @click="toCurrentLogin('register')">
            {{ EnumLoginModule.register }}
          </n-button>
        </div>
      </n-space>
    </n-form>
    <other-login />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { NForm, NFormItem, NInput, NSpace, NCheckbox, NButton, useNotification, useDialog } from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';
import { EnumLoginModule } from '@/enum';
import { useRouterPush } from '@/composables';
import { useAgreement, useLoading } from '@/hooks';
import { formRules } from '@/utils/form';
import { OtherLogin } from './components';
import { LoginAgreement } from '../common';
import { useUserStore } from '@/store/modules/user';

const { toCurrentLogin } = useRouterPush();
// const { loading, login } = useLogin();
const { agreement, isAgree } = useAgreement();
const { loading, startLoading, endLoading } = useLoading();
const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
  phone: '15170283876',
  pwd: 'a123456789'
});
const rules: FormRules = {
  phone: formRules.phone,
  pwd: formRules.pwd
};
const rememberMe = ref(false);
const userStore = useUserStore();
const notification = useNotification();
const dialog = useDialog();

function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();

  formRef.value.validate(async errors => {
    if (!errors) {
      if (!isAgree()) return;
      // startLoading();
      // const { phone, pwd } = model;
      // const userInfo = await userStore.login({
      //   password: pwd,
      //   username: phone,
      //   mode: 'none' // 不要默认的错误提示
      // });
      // endLoading();
      startLoading();
      try {
        const userInfo = await userStore.login({
          password: model.pwd,
          username: model.phone,
          mode: 'none' // 不要默认的错误提示
        });
        if (userInfo) {
          notification.success({
            title: '登录成功！',
            content: `欢迎回来: ${userInfo.realName}!`,
            duration: 3000
          });
          // toHome();
        }
      } catch (error) {
        dialog.error({
          title: '错误提示',
          content: (error as unknown as Error).message || '网络异常，请检查您的网络连接是否正常!'
        });
      } finally {
        endLoading();
      }
    }
  });
}
</script>
<style scoped></style>
