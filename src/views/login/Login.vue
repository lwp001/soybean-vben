<template>
  <div class="vben-login relative w-full h-full px-4">
    <span class="xl:hidden">
      <AppLogo :showTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo />
          <div class="my-auto">
            <img :alt="title" src="../../assets/svg/login-box-bg.svg" class="w-1/2 -mt-16" />
            <div class="mt-10 font-medium text-white">
              <span class="inline-block mt-4 text-3xl">开箱即用的中后台管理系统</span>
            </div>
            <div class="mt-5 font-normal text-white text-md dark:text-gray-500">输入您的个人详细信息开始使用</div>
          </div>
        </div>
        <!-- <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12"> -->
        <div
          class="vben-login-form relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
        >
          <LoginFormTitle />
          <LoginForm v-if="getLoginState === LoginStateEnum.LOGIN" />
          <ForgetPasswordForm v-if="getLoginState === LoginStateEnum.RESET_PASSWORD" />
          <RegisterForm v-if="getLoginState === LoginStateEnum.REGISTER" />
          <MobileForm v-if="getLoginState === LoginStateEnum.MOBILE" />
          <QrCodeForm v-if="getLoginState === LoginStateEnum.QR_CODE" />
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { AppLogo } from '/@/components/Application';
import LoginForm from './LoginForm.vue';
import ForgetPasswordForm from './ForgetPasswordForm.vue';
import RegisterForm from './RegisterForm.vue';
import MobileForm from './MobileForm.vue';
import QrCodeForm from './QrCodeForm.vue';
import { useGlobSetting } from '/@/hooks/setting';
import LoginFormTitle from './LoginFormTitle.vue';
import { LoginStateEnum, useLoginState } from './useLogin';

defineProps({
  sessionTimeout: {
    type: Boolean
  }
});

const globSetting = useGlobSetting();
const { getLoginState } = useLoginState();

const title = computed(() => globSetting?.title ?? '');
// const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
</script>
<style lang="scss">
$dark-bg: #293146;

html[data-theme='dark'] {
  .vben-login {
    background-color: $dark-bg;

    &::before {
      background-image: url(/@/assets/svg/login-bg-dark.svg);
    }

    &-form {
      background: transparent !important;
    }

    // .app-iconify {
    //   color: #fff;
    // }
  }

  input.fix-auto-fill,
  .fix-auto-fill input {
    -webkit-text-fill-color: #c9d1d9 !important;
    box-shadow: inherit !important;
  }
}

.vben-login {
  min-height: 100%;
  overflow: hidden;
  @media (max-width: $screen-xl) {
    background-color: #293146;

    &-form {
      background-color: #fff;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(/@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
    @media (max-width: $screen-xl) {
      display: none;
    }
  }

  .vben-app-logo {
    position: absolute;
    top: 12px;
    height: 30px;

    &__title {
      font-size: 16px;
      color: #fff;
    }

    img {
      width: 32px;
    }
  }

  .container {
    top: 48px;

    .vben-app-logo {
      display: flex;
      width: 60%;
      height: 80px;

      &__title {
        font-size: 24px;
        color: #fff;
      }

      img {
        width: 48px;
      }
    }
  }

  &-sign-in-way {
    .anticon {
      font-size: 22px;
      color: #888;
      cursor: pointer;
    }
  }

  // input:not([type='checkbox'])
  .vben-login-form {
    min-width: 360px;

    @media (max-width: $screen-xl) {
      min-width: 320px;
    }

    @media (max-width: $screen-lg) {
      min-width: 260px;
    }

    @media (max-width: $screen-md) {
      min-width: 240px;
    }

    @media (max-width: $screen-sm) {
      min-width: 160px;
    }
  }
}
</style>
