import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const comp: AppRouteModule = {
  path: '/component',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: '组件'
  },
  children: [
    {
      path: 'button',
      name: 'ButtonDemo',
      component: () => import('@/views/component/button/index.vue'),
      meta: {
        title: '按钮'
      }
    },

    {
      path: 'card',
      name: 'CardDemo',
      component: () => import('@/views/component/card/index.vue'),
      meta: {
        title: '卡片'
      }
    },
    {
      path: 'table',
      name: 'TableDemo',
      component: () => import('@/views/component/table/index.vue'),
      meta: {
        title: '表格'
      }
    }
  ]
};

export default comp;
