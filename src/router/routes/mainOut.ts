/**
 * The routing of this file will not show the layout. It is an independent new page. the contents of the file still need
 * to log in to access
 */
import type { RouteRecordItem } from '@/router/types';

// test
// http:ip:port/main-out
export const mainOutRoutes: RouteRecordItem[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('@/views/_builtin/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true
    }
  }
];

export const mainOutRouteNames = mainOutRoutes.map(item => item.name);
