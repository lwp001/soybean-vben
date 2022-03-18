<template>
  <n-countdown
    v-if="active"
    :render="renderCountdown"
    :duration="60 * 1000"
    :active="active"
    @finish="getSmsCode(false)"
  />
  <n-button v-else class="mt-4" @click="getSmsCode(true)">获取验证码</n-button>
</template>
<script lang="ts" setup>
import { NCountdown } from 'naive-ui';
import { ref } from 'vue';
import { CountdownProps } from 'naive-ui';

const active = ref(false);
/** 是否开始倒计时 获取验证码 */
async function getSmsCode(flag: boolean) {
  active.value = flag;
  if (flag) {
    console.log('需要自定义倒计时 要做的事情');
  }
}
const renderCountdown: CountdownProps['render'] = time => {
  return `${String(time.seconds).padStart(2, '0')}秒后重新获取`;
};
</script>
