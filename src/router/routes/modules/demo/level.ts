import type { AppRouteModule } from '@/router/types';

import { getParentLayout, LAYOUT } from '@/router/constant';

const permission: AppRouteModule = {
  path: '/level',
  name: 'Level',
  component: LAYOUT,
  redirect: '/level/menu1/menu1-1',
  meta: {
    orderNo: 2000,
    icon: 'ion:menu-outline',
    title: '多级菜单'
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      component: getParentLayout('Menu1Demo'),
      meta: {
        title: '一级菜单'
      },
      redirect: '/level/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          component: () => import('@/views/multi-menu/first/second/index.vue'),
          meta: {
            title: '二级菜单'
          }
        }
      ]
    }
  ]
};

export default permission;
