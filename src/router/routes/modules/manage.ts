import type { RouteRecordItem } from '@/router/types';
import { BaseLayout } from '@/router/constant';

const manage: RouteRecordItem = {
  path: '/manage',
  name: 'manage',
  component: BaseLayout,
  redirect: '/dashboard/analysis',
  meta: {
    order: 9,
    i18nKey: 'route.manage',
    icon: 'carbon:cloud-service-management',
    title: 'manage'
    // roles: ['R_ADMIN']
  },
  children: [
    {
      path: '/manage/role',
      name: 'manage_role',
      component: () => import('@/views/manage/role/index.vue'),

      meta: {
        title: 'manage_role',
        i18nKey: 'route.manage_role',
        icon: 'carbon:user-role',
        order: 2
      }
    },
    {
      path: 'manage_menu',
      name: '/manage/menu',
      component: () => import('@/views/manage/menu/index.vue'),
      meta: {
        title: 'manage_menu',
        i18nKey: 'route.manage_menu',
        icon: 'material-symbols:route',
        order: 3,
        roles: ['R_ADMIN'],
        keepAlive: true
      }
    },
    {
      name: 'manage_user',
      path: '/manage/user',
      component: () => import('@/views/manage/user/index.vue'),
      meta: {
        title: 'manage_user',
        i18nKey: 'route.manage_user',
        icon: 'ic:round-manage-accounts',
        order: 1,
        roles: ['R_ADMIN']
      }
    },
    {
      name: 'manage_user-detail',
      path: '/manage/user-detail/:id',
      component: () => import('@/views/manage/user-detail/[id].vue'),
      props: true,
      meta: {
        title: 'manage_user-detail',
        i18nKey: 'route.manage_user-detail',
        hideMenu: true,
        roles: ['R_ADMIN'],
        activeMenu: 'manage_user'
      }
    }
  ]
};

export default manage;
