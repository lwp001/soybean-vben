import { watch, onUnmounted } from 'vue';
import useBodyScroll from '/@/hooks/web/useBodyScroll';
import { useAppStore } from '../modules/app';

/** 订阅app store */
export default function subscribeAppStore() {
  const app = useAppStore();
  const { scrollBodyHandler } = useBodyScroll();

  // 弹窗打开时禁止滚动条
  const stopHandle = watch(
    () => app.settingDrawerVisible,
    newValue => {
      scrollBodyHandler(newValue);
    }
  );

  onUnmounted(() => {
    stopHandle();
  });
}
