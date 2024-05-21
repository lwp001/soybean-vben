<script setup lang="ts">
import { computed, ref } from 'vue';

import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { moduleMap } from './data';

import PwdLogin from './modules/pwd-login.vue';
import CodeLogin from './modules/code-login.vue';
import Register from './modules/register.vue';
import ResetPwd from './modules/reset-pwd.vue';
import BindWechat from './modules/bind-wechat.vue';

const appStore = useAppStore();
const themeStore = useThemeStore();

const activeModule = ref('pwd-login');

const bgThemeColor = computed(() =>
  themeStore.darkMode ? getPaletteColorByNumber(themeStore.themeColor, 600) : themeStore.themeColor
);

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';

  const ratio = themeStore.darkMode ? 0.5 : 0.2;

  return mixColor(COLOR_WHITE, themeStore.themeColor, ratio);
});

function toLogin() {
  activeModule.value = 'pwd-login';
}
</script>

<template>
  <div class="relative size-full flex-center overflow-hidden" :style="{ backgroundColor: bgColor }">
    <WaveBg :theme-color="bgThemeColor" />
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px">
      <div class="w-400px lt-sm:w-300px">
        <header class="flex-y-center justify-between">
          <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
          <h3 class="text-28px text-primary font-500 lt-sm:text-22px">{{ $t('system.title') }}</h3>
          <div class="i-flex-col">
            <ThemeSchemaSwitch
              :theme-schema="themeStore.themeScheme"
              :show-tooltip="false"
              class="text-20px lt-sm:text-18px"
              @switch="themeStore.toggleThemeScheme"
            />
            <LangSwitch
              :lang="appStore.locale"
              :lang-options="appStore.localeOptions"
              :show-tooltip="false"
              @change-lang="appStore.changeLocale"
            />
          </div>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">{{ $t(moduleMap[activeModule]) }}</h3>
          <div class="pt-24px">
            <PwdLogin v-if="activeModule === 'pwd-login'" @change-login-compent="val => (activeModule = val)" />
            <CodeLogin v-if="activeModule === 'code-login'" @to-login="toLogin" />
            <Register v-if="activeModule === 'register'" @to-login="toLogin" />
            <ResetPwd v-if="activeModule === 'reset-pwd'" @to-login="toLogin" />
            <BindWechat v-if="activeModule === 'bind-wechat'" @to-login="toLogin" />
          </div>
        </main>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
