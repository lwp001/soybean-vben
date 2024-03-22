import type { RouteRecordItem } from '@/router/types';

import { BaseLayout, BlankLayout, PAGE_NOT_FOUND_NAME } from '@/router/constant';

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordItem = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: BlankLayout,
  meta: {
    title: '404',
    i18nKey: 'route.404',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: () => import('@/views/_builtin/404/index.vue'),
      meta: {
        title: '404',
        i18nKey: 'route.404',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
};

// 403 on a page
export const PAGE_403_ROUTE: RouteRecordItem = {
  path: '/403',
  name: '403',
  component: BaseLayout,
  meta: {
    title: '403',
    i18nKey: 'route.403',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/_builtin/403/index.vue'),
      meta: {
        title: '403',
        i18nKey: 'route.403',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
};

// export const REDIRECT_ROUTE: AppRouteRecordRaw = {
//   path: '/redirect',
//   component: LAYOUT,
//   name: 'RedirectTo',
//   meta: {
//     title: REDIRECT_NAME,
//     hideBreadcrumb: true,
//     hideMenu: true
//   },
//   children: [
//     {
//       path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
//       name: REDIRECT_NAME,
//       component: () => import('@/views/sys/redirect/index.vue'),
//       meta: {
//         title: REDIRECT_NAME,
//         hideBreadcrumb: true
//       }
//     }
//   ]
// };

// export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
//   path: '/error-log',
//   name: 'ErrorLog',
//   component: LAYOUT,
//   redirect: '/error-log/list',
//   meta: {
//     title: 'ErrorLog',
//     hideBreadcrumb: true,
//     hideChildrenInMenu: true
//   },
//   children: [
//     {
//       path: 'list',
//       name: 'ErrorLogList',
//       component: () => import('@/views/sys/error-log/index.vue'),
//       meta: {
//         title: t('routes.basic.errorLogList'),
//         hideBreadcrumb: true,
//         currentActiveMenu: '/error-log'
//       }
//     }
//   ]
// };
