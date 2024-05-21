import type { RouteRecordItem } from '@/router/types';
import { BaseLayout, getParentLayout } from '@/router/constant';

const multi: RouteRecordItem = {
  path: '/multi-menu',
  name: 'multi-menu',
  component: BaseLayout,
  redirect: '/multi-menu/first/child',
  meta: {
    title: 'multi-menu',
    i18nKey: 'route.multi-menu',
    icon: 'ion:menu-outline',
    order: 8
  },

  children: [
    {
      name: 'multi-menu_first',
      path: '/multi-menu/first',
      component: getParentLayout('multi-menu_first'),
      redirect: '/multi-menu/first/child',
      meta: {
        title: 'multi-menu_first',
        i18nKey: 'route.multi-menu_first',
        order: 1
      },
      children: [
        {
          name: 'multi-menu_first_child',
          path: '/multi-menu/first/child',
          component: () => import('@/views/multi-menu/first_child/index.vue'),
          meta: {
            title: 'multi-menu_first_child',
            i18nKey: 'route.multi-menu_first_child'
          }
        }
      ]
    },
    {
      name: 'multi-menu_second',
      path: '/multi-menu/second',
      component: getParentLayout('multi-menu_second'),
      redirect: '/multi-menu/second/child',
      meta: {
        title: 'multi-menu_second',
        i18nKey: 'route.multi-menu_second',
        order: 2
      },
      children: [
        {
          name: 'multi-menu_second_child',
          path: '/multi-menu/second/child',
          component: getParentLayout('multi-menu_second_child'),
          redirect: '/multi-menu/second/child/home',
          meta: {
            title: 'multi-menu_second_child',
            i18nKey: 'route.multi-menu_second_child'
          },
          children: [
            {
              name: 'multi-menu_second_child_home',
              path: '/multi-menu/second/child/home',
              component: () => import('@/views/multi-menu/second_child_home/index.vue'),
              meta: {
                title: 'multi-menu_second_child_home',
                i18nKey: 'route.multi-menu_second_child_home'
              }
            }
          ]
        }
      ]
    }
  ]
};

export default multi;
