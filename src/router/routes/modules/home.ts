import type { RouteRecordItem } from '@/router/types';

import { BaseLayout } from '@/router/constant';

const home: RouteRecordItem = {
  path: '/home',
  name: 'home',
  component: BaseLayout,
  redirect: '/home',
  meta: {
    hideChildrenInMenu: true,
    title: 'home',
    i18nKey: 'route.home',
    single: true,
    order: 1
  },
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: 'home',
        i18nKey: 'route.home',
        icon: 'mdi:monitor-dashboard'
      }
    }
  ]
};

export default home;
