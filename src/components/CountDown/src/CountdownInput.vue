<template>
  <n-input-group>
    <n-input placeholder="请输入验证码" />
    <n-button :disabled="isStart" @click="handleStart">{{ getButtonText }}</n-button>
  </n-input-group>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, computed, unref, PropType } from 'vue';

import { useCountdown } from './useCountdown';
import { isFunction } from '/@/utils/is';

import { useRuleFormItem } from '/@/hooks/component/useFormItem';

const props = {
  value: { type: String },
  size: { type: String, validator: v => ['tiny', 'small', 'medium', 'large'].includes(v) },
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null
  }
};

export default defineComponent({
  name: 'CountDownInput',
  inheritAttrs: false,
  props,
  setup(props) {
    const [state] = useRuleFormItem(props);
    const loading = ref(false);

    const { currentCount, isStart, start, reset } = useCountdown(props.count);

    const getButtonText = computed(() => {
      return !unref(isStart) ? '获取验证码' : `${currentCount.value}秒后重新获取`;
    });

    watchEffect(() => {
      props.value === undefined && reset();
    });

    /**
     * @description: Judge whether there is an external function before execution, and decide whether to start after execution
     */
    async function handleStart() {
      const { sendCodeApi: beforeStartFunc } = props;
      if (beforeStartFunc && isFunction(beforeStartFunc)) {
        loading.value = true;
        try {
          const canStart = await beforeStartFunc();
          canStart && start();
        } finally {
          loading.value = false;
        }
      } else {
        start();
      }
    }
    return { state, handleStart, currentCount, loading, getButtonText, isStart };
  }
});
</script>
<style></style>
