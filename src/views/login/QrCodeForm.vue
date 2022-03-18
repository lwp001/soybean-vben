<template>
  <div class="min-w-64 min-h-64">
    <QrCode :value="qrCodeUrl" class="flex justify-center xl:justify-start" :width="280" />
    <n-divider>扫码后点击"确认"，即可完成登录</n-divider>
    <n-button size="large" block class="mt-4 enter-x" @click="handleBackLogin">返回</n-button>
  </div>
</template>
<script lang="ts" setup>
import { QrCode } from '/@/components/Qrcode/index';
import { useLoginState } from './useLogin';

const qrCodeUrl = 'https://vvbin.cn/next/login';

const { handleBackLogin } = useLoginState();
</script>
