<template>
  <div :class="prefixCls" class="relative w-full h-full px-4 dark:bg-#293146">
    <div class="flex items-center absolute right-4 top-4">
      <dark-mode-switch
        :dark="theme.darkMode"
        class="absolute right-48px top-24px z-1001 text-20px"
        @update:dark="theme.setDarkMode"
      />
    </div>

    <span class="-enter-x xl:hidden">
      <!-- <AppLogo :always-show-title="true" /> -->
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <!-- <AppLogo class="-enter-x" /> -->
          <div class="my-auto">
            <img :alt="title" src="../../../assets/svg/login-box-bg.svg" class="w-1/2 -mt-16 -enter-x" />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">{{ $t('page.login.common.signInTitle') }}</span>
            </div>
            <div class="mt-5 font-normal text-white dark:text-gray-500 -enter-x">
              {{ $t('page.login.common.signInDesc') }}
            </div>
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <header class="flex-y-center justify-between">
              <system-logo class="text-64px text-primary" />
              <n-gradient-text type="primary" :size="28">{{ $t('system.title') }}</n-gradient-text>
            </header>
            <main class="pt-24px">
              <h3 class="text-18px text-primary font-medium">{{ formTitle }}</h3>
              <div class="pt-24px">
                <pwd-login v-if="currentState === 'pwd-login'" @set-state="setLoginState" />
                <register v-if="currentState === 'register'" @back-login="handleBackLogin" />
                <code-login v-if="currentState === 'code-login'" @back-login="handleBackLogin" />
                <reset-pwd v-if="currentState === 'reset-pwd'" @back-login="handleBackLogin" />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { loginModuleLabels } from '@/constants';
import { useThemeStore } from '@/store';
import { $t } from '@/locales';
import { CodeLogin, PwdLogin, Register, ResetPwd } from './components';

const currentState = ref<UnionKey.LoginModule>('pwd-login');
const formTitle = ref<string>(loginModuleLabels['pwd-login']);

const theme = useThemeStore();
const prefixCls = 'fc-login';

const title = '管理系统';
function setLoginState(state: UnionKey.LoginModule) {
  currentState.value = state;
  formTitle.value = loginModuleLabels[state];
}

function handleBackLogin() {
  setLoginState('pwd-login');
}
</script>

<style scoped lang="scss">
html[class='dark'] {
  .fc-login {
    &::before {
      background-image: url('../../../assets/svg/login-bg-dark.svg');
    }

    &-form {
      background: transparent !important;
    }
  }
}

.fc-login {
  min-height: 100%;
  overflow: hidden;

  @media (max-width: 1280px) {
    background-color: #293146;

    .fc-login-form {
      background-color: #fff;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('../../../assets/svg/login-bg.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;

    @media (max-width: 1280px) {
      display: none;
    }
  }
}
</style>
