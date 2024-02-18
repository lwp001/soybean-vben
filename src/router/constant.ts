// import type { RouteComponent } from 'vue-router';

// import BaseLayout from '@/layouts/base-layout/index.vue';
// import BlankLayout from '@/layouts/blank-layout/index.vue';

export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'not-found';
export const LOGIN_PATH = '/login';
export const LOGIN_ROUTER_NAME = 'login';

export const EXCEPTION_COMPONENT = () => import('@/components/common/exception-base.vue');
export const BaseLayout = () => import('@/layouts/base-layout/index.vue');
export const BlankLayout = () => import('@/layouts/blank-layout/index.vue');

/** @description: parent-layout */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME
      });
    });
};

// export const layouts: Record<RouteLayout, RouteComponent | (() => Promise<RouteComponent>)> = {
//   base: BaseLayout,
//   blank: BlankLayout
// };
