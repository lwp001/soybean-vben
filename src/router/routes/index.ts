import type { RouteRecordRaw } from 'vue-router';
import { BlankLayout } from '@/layouts';

export const PAGE_NOT_FOUND = () => import('@/views/_builtin/404/index.vue');

/** 根路由: / */
export const ROOT_ROUTE: RouteRecordRaw = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root'
  }
};

/** 404页面 */
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  name: '404',
  path: '/404',
  component: PAGE_NOT_FOUND,
  meta: {
    title: '未找到',
    singleLayout: 'blank'
  }
};

/** 固定的路由 */
export const constantRoutes: RouteRecordRaw[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/_builtin/login/index.vue'),
    meta: {
      title: '登录',
      singleLayout: 'blank'
    }
  },
  {
    name: 'constant-page',
    path: '/constant-page',
    component: () => import('@/views/_builtin/constant-page/index.vue'),
    meta: {
      title: '固定页面',
      singleLayout: 'blank'
    }
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/_builtin/403/index.vue'),
    meta: {
      title: '无权限',
      singleLayout: 'blank'
    }
  },
  PAGE_NOT_FOUND_ROUTE,
  {
    name: '500',
    path: '/500',
    component: () => import('@/views/_builtin/500/index.vue'),
    meta: {
      title: '服务器错误',
      singleLayout: 'blank'
    }
  },
  // 匹配无效路径的路由
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: BlankLayout,
    meta: {
      title: '未找到',
      singleLayout: 'blank'
    }
  }
];
