import type { RouteRecordItem } from '@/router/types';

import { BaseLayout } from '@/router/constant';

const about: RouteRecordItem = {
  path: '/about',
  name: 'about_1',
  component: BaseLayout,
  redirect: '/about',
  meta: {
    hideChildrenInMenu: true,
    title: 'about',
    i18nKey: 'route.about',
    single: true,
    order: 10
  },
  children: [
    {
      path: '',
      name: 'about',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: 'about',
        i18nKey: 'route.about',
        icon: 'fluent:book-information-24-regular'
      }
    }
  ]
};

export default about;
