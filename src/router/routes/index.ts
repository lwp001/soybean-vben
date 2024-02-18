import type { RouteRecordItem } from '@/router/types';

import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

import { mainOutRoutes } from './mainOut';

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordItem[] = [];

// 加入到路由集合中
Object.keys(modules).forEach(key => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: RouteRecordItem = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: 'Root'
  }
};

export const LoginRoute: RouteRecordItem = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/_builtin/login/index.vue'),
  meta: {
    title: 'login',
    i18nKey: 'route.login'
  }
};

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [LoginRoute, RootRoute, ...mainOutRoutes, PAGE_NOT_FOUND_ROUTE];
