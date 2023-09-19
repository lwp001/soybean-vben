// 已无作用 可以删除

export const PARENT_LAYOUT_NAME = 'ParentLayout';

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME
      });
    });
};
