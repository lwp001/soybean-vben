import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '@/enum';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: PageEnum.BASE_HOME,
  component: '', // 因提示错误添加 不知是否有问题
  meta: {
    title: 'Root'
  }
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/system/login/index.vue'),
  meta: {
    title: '登录'
  }
};

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, ...mainOutRoutes, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
