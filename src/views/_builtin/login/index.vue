<script setup lang="ts">
import { computed, unref } from 'vue';
import { NH2 } from 'naive-ui';
import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';
import { LoginStateEnum, useLoginState } from './components/use-login';

import PwdLogin from './components/pwd-login.vue';
import CodeLogin from './components/code-login.vue';
import RegisterForm from './components/register.vue';
// import ResetPwd from './components/reset-pwd.vue';

const themeStore = useThemeStore();
const title = '测试管理系统';

const { getLoginState } = useLoginState();

const formTitle = computed(() => {
  const titleMap = {
    [LoginStateEnum.RESET_PASSWORD]: $t('page.login.resetPwd.title'),
    [LoginStateEnum.LOGIN]: $t('page.login.pwdLogin.title'),
    [LoginStateEnum.REGISTER]: $t('page.login.register.title'),
    [LoginStateEnum.MOBILE]: $t('page.login.codeLogin.title'),
    [LoginStateEnum.QR_CODE]: $t('page.login.qrSign.title')
  };
  return titleMap[unref(getLoginState)];
});
</script>

<template>
  <div class="login">
    <div class="login_slogan hidden xl:flex z-100">
      <div class="login_logo">
        <img :title="title" :alt="title" src="@/assets/images/logo.png" />
        <div class="truncate login_logo-title">
          {{ title }}
        </div>
      </div>

      <div class="my-auto">
        <img :alt="title" src="@/assets/svg/login-box-bg.svg" class="w-2/3 -enter-x" />
        <div class="mt-10 font-medium text-white -enter-x">
          <span class="inline-block mt-4 text-2xl">
            {{ $t('system.title') }}
          </span>
        </div>
        <div class="mt-4 font-normal text-white text-md -enter-x">
          {{ $t('system.Description') }}
        </div>
      </div>
    </div>
    <div class="enter-x login_form">
      <div class="absolute mt-4 right-4">
        <ThemeSchemaSwitch
          :theme-schema="themeStore.themeScheme"
          :show-tooltip="false"
          class="text-20px <sm:text-18px"
          @switch="themeStore.toggleThemeScheme"
        />
      </div>
      <div class="sm:w-4/6 xl:w-4/5 w-full mx-auto my-auto p-4 rounded-md shadow-md xl:shadow-none b-2 z-10001">
        <div class="py-5 px-4 b-1 rounded-5">
          <NH2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
            {{ formTitle }}
          </NH2>
          <PwdLogin />
          <RegisterForm />
          <CodeLogin />
          <!-- <ForgetPasswordForm />   <QrCodeForm /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html[class='light dark'] {
  .login {
    background-color: #293146;
    &::before {
      background-image: url(@/assets/svg/login-bg-dark.svg);
    }
  }
}

.login {
  height: 100%;
  width: 100%;
  min-height: 100%;
  display: flex;
  background-color: #fff;

  &_slogan {
    min-height: 100%;
    padding-left: 50px;
    margin-right: 40px;
    flex-direction: column;
  }

  &_slogan,
  &_form {
    flex: 1;
  }

  &_form {
    display: flex;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
  }

  &_logo {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: absolute;
    top: 12px;
    height: 80px;
    &-title {
      font-size: 24px;
      color: #fff;
      margin-left: 8px;
    }
    img {
      width: 48px;
    }
  }

  .sign-in-way {
    .anticon {
      font-size: 22px;
      color: #888;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .count-down-input input {
    min-width: unset;
  }
}
</style>
