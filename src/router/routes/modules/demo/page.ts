import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const page: AppRouteModule = {
  path: '/page-demo',
  name: 'PageDemo',
  component: LAYOUT,
  redirect: '/page-demo/404',
  meta: {
    orderNo: 30,
    icon: 'ion:aperture-outline',
    title: '异常页面'
  },
  children: [
    {
      path: '404',
      name: 'PageNotFound',
      component: () => import('@/views/system/exception/404.vue'),
      meta: {
        title: '404'
      }
    },

    {
      path: '403',
      name: 'PageNotAccess',
      component: () => import('@/views/system/exception/403.vue'),
      meta: {
        title: '403'
      }
    },
    {
      path: '500',
      name: 'ServiceError',
      component: () => import('@/views/system/exception/500.vue'),
      meta: {
        title: '500'
      }
    }
  ]
};

export default page;
