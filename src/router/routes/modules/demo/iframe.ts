import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/vue',
  meta: {
    orderNo: 1000,
    icon: 'carbon:document',
    title: '文档'
  },

  children: [
    {
      path: 'vue',
      name: 'DocVue',
      component: () => import('@/views/document/vue/index.vue'),
      meta: {
        title: 'Vue文档'
      }
    },
    {
      path: 'naive',
      name: 'DocNaive',
      component: () => import('@/views/document/naive/index.vue'),
      meta: {
        title: 'Naive文档'
      }
    },
    {
      path: 'vite',
      name: 'DocVite',
      component: () => import('@/views/document/vite/index.vue'),
      meta: {
        title: 'Vite文档'
      }
    }
  ]
};

export default iframe;
