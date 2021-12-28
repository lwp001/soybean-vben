import { watch, unref } from 'vue';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useGlobSetting } from '@/hooks/setting';

import { REDIRECT_NAME } from '@/router/constant';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { title } = useGlobSetting();
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }

      const tTitle = route?.meta?.title as string;
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true }
  );
}
