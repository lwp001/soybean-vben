export const REDIRECT_NAME = 'redirect';
export const ROOT_NAME = 'root';

export const PARENT_LAYOUT_NAME = 'parent-layout';

export const PAGE_NOT_FOUND_NAME = 'not-found';

export const EXCEPTION_COMPONENT = () => import('@/components/common/exception-base.vue');

/** @description: default layout */
export const BaseLayout = () => import('@/layouts/base-layout/index.vue');
export const BlankLayout = () => import('@/layouts/blank-layout/index.vue');
export const IFRAME = () => import('@/views/_builtin/iframe-page/[url].vue');

/** @description: parent-layout */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME
      });
    });
};
