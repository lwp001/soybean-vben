import type { RouteRecordItem } from '@/router/types';
import { BaseLayout } from '@/router/constant';

const manage: RouteRecordItem = {
  name: 'manage',
  path: '/manage',
  component: BaseLayout,
  redirect: '/manage/user',
  meta: {
    title: 'manage',
    i18nKey: 'route.manage',
    icon: 'carbon:cloud-service-management',
    order: 9,
    roles: ['R_ADMIN']
  },
  children: [
    {
      name: 'manage_menu',
      path: '/manage/menu',
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
      name: 'manage_role',
      path: '/manage/role',
      component: () => import('@/views/manage/role/index.vue'),
      meta: {
        title: 'manage_role',
        i18nKey: 'route.manage_role',
        icon: 'carbon:user-role',
        order: 2,
        roles: ['R_SUPER']
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
      meta: {
        title: 'manage_user-detail',
        i18nKey: 'route.manage_user-detail',
        hideInMenu: true,
        roles: ['R_ADMIN'],
        activeMenu: 'manage_user'
      }
    }
  ]
};

export default manage;
