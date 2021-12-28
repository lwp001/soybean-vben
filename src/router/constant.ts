export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'BlankLayout'; // 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('@/views/system/exception/Exception.vue');

/**
 * @description: default layout
 */
export const LAYOUT = () => import('@/layouts/BasicLayout/index.vue');

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        name: PARENT_LAYOUT_NAME
      });
    });
};
