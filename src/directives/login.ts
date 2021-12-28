import type { App, Directive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useRouterPush } from '@/composables';

export default function setupLoginDirective(app: App) {
  const auth = useUserStore();
  const { toLogin } = useRouterPush(false);
  function listenerHandler(event: MouseEvent) {
    if (!auth.isLogin) {
      event.stopPropagation();
      toLogin();
    }
  }

  const loginDirective: Directive<HTMLElement, boolean | undefined> = {
    mounted(el: HTMLElement, binding) {
      if (binding.value === false) return;
      el.addEventListener('click', listenerHandler, { capture: true });
    },
    unmounted(el: HTMLElement, binding) {
      if (binding.value === false) return;
      el.removeEventListener('click', listenerHandler);
    }
  };

  app.directive('login', loginDirective);
}
