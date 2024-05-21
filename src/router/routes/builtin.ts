import type { RouteRecordItem } from '@/router/types';
import { BlankLayout, PAGE_NOT_FOUND_NAME } from '@/router/constant';

export const ROOT_ROUTE: RouteRecordItem = {
  name: 'root',
  path: '/',
  redirect: '/home',
  meta: {
    title: 'root'
  }
};

const NOT_FOUND_ROUTE: RouteRecordItem = {
  name: PAGE_NOT_FOUND_NAME,
  path: '/:pathMatch(.*)*',
  component: BlankLayout,
  meta: {
    title: 'not-found'
  },
  children: [
    {
      path: '/:pathMatch(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: () => import('@/views/_builtin/404/index.vue'),
      meta: {
        title: 'not-found'
      }
    }
  ]
};

// const NOT_FOUND_ROUTE: RouteRecordItem = {
//   name: 'not-found',
//   path: '/:pathMatch(.*)*',
//   component: import('@/views/_builtin/404/index.vue'),
//   meta: {
//     title: 'not-found'
//   }
// };

const LOGIN_ROUTE: RouteRecordItem = {
  name: 'login',
  path: '/login',
  component: () => import('@/views/_builtin/login/index.vue'),
  meta: {
    title: 'login',
    i18nKey: 'route.login',
    hideInMenu: true
  }
};

// const LOGIN_ROUTE: RouteRecordItem = {
//   name: 'login',
//   path: '/login',
//   component: BlankLayout,
//   meta: {
//     title: 'login'
//   },
//   redirect: '/login',
//   children: [
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('@/views/_builtin/login/index.vue'),
//       meta: {
//         title: 'login',
//         i18nKey: 'route.login',
//         hideInMenu: true
//       }
//     }
//   ]
// };

const EXCEPTION_ROUTE: RouteRecordItem = {
  name: '403',
  path: '/403',
  component: () => import('@/views/_builtin/403/index.vue'),
  meta: {
    title: '403',
    i18nKey: 'route.403',
    hideInMenu: true
  }
};

// const EXCEPTION_ROUTE: RouteRecordItem = {
//   path: '/403',
//   name: '403',
//   component: BlankLayout,
//   meta: {
//     title: '403',
//     i18nKey: 'route.404',
//     hideBreadcrumb: true,
//     hideInMenu: true
//   },
//   children: [
//     {
//       path: '/403',
//       name: '403',
//       component: () => import('@/views/_builtin/403/index.vue'),
//       meta: {
//         title: '403',
//         hideBreadcrumb: true,
//         i18nKey: 'route.404'
//       }
//     }
//   ]
// };

/** builtin routes, it must be constant and setup in vue-router */
export const basicRoutes: RouteRecordItem[] = [LOGIN_ROUTE, ROOT_ROUTE, EXCEPTION_ROUTE, NOT_FOUND_ROUTE];
