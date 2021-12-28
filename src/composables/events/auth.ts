import { onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/store/modules/user';

/** 添加用户权益变更的全局点击事件监听 */
export function useAuthChangeEvent() {
  const userStore = useUserStore();

  function eventHandler(event: MouseEvent) {
    const change = userStore.getIsAuthChange;
    if (change) {
      event.stopPropagation();
      window.location.reload();
    }
  }

  function addAuthChangeListener() {
    console.log('添加监听事件');
    document.addEventListener('click', eventHandler, { capture: true });
  }

  function removeAuthChangeListener() {
    console.log('去除监听事件');
    document.removeEventListener('click', eventHandler);
  }

  onMounted(() => {
    addAuthChangeListener();
  });

  onUnmounted(() => {
    console.log('去除监听事件');
    removeAuthChangeListener();
  });
}
