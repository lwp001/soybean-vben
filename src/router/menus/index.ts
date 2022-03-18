import type { Menu } from '/@/router/types';
import { usePermissionStore } from '/@/store/modules/permission';
import { getAllParentPath } from '/@/router/helper/menuHelper';
import { REDIRECT_NAME } from '/@/router/constant';
import type { RouteLocationNormalizedLoaded, RouteLocationMatched } from 'vue-router';
import { filter } from '/@/utils/helper/treeHelper';

function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  return permissionStore.getBackMenuList.filter(item => !item.meta?.hideMenu && !item.hideMenu);
}

/** 获取菜单数据 */
export const getMenus = (): Menu[] => {
  const menus = getAsyncMenus();
  return menus;
};

/** 获取当前菜单的父路径 */
export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

// Get the level 1 menu, delete children
/** 获取一级菜单 删除子菜单 */
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus();
  const shallowMenuList = menus.map(item => ({ ...item, children: undefined }));
  return shallowMenuList;
}

// Get the children of the menu
/** 获取当前菜单的子菜单数据 */
export async function getChildrenMenus(parentPath: string) {
  const menus = await getAsyncMenus();
  const parent = menus.find(item => item.path === parentPath);
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[];
  }
  return parent.children;
}

/** 获取匹配的菜单 */
function getMatched(menus: Menu[], parent: string[]) {
  const metched: Menu[] = [];
  menus.forEach(item => {
    if (parent.includes(item.path)) {
      metched.push({
        ...item,
        name: item.meta?.title || item.name
      });
    }
    if (item.children?.length) {
      metched.push(...getMatched(item.children, parent));
    }
  });
  return metched;
}

function filterItem(list: RouteLocationMatched[]) {
  return filter(list, item => {
    const { meta, name } = item;
    if (!meta) {
      return !!name;
    }
    const { title, hideBreadcrumb, hideMenu } = meta;
    if (!title || hideBreadcrumb || hideMenu) {
      return false;
    }
    return true;
  }).filter(item => !item.meta?.hideBreadcrumb);
}

/** 获取路由转换后的 面包屑 数据 */
export function getBreadCrumbFromMenu(route: RouteLocationNormalizedLoaded) {
  // 根据路由变化获取面包屑 数据内容
  if (route.name === REDIRECT_NAME) return;
  const permissionStore = usePermissionStore();
  const menus = permissionStore.getBackMenuList;

  const routeMatched = route.matched;
  // console.log('面包屑routeMatched:', routeMatched);
  const cur = routeMatched?.[routeMatched.length - 1];
  let path = route.path;

  if (cur && cur?.meta?.currentActiveMenu) {
    path = cur.meta.currentActiveMenu as string;
  }

  const parent = getAllParentPath(menus, path);
  const filterMenus = menus.filter(item => item.path === parent[0]);
  const matched = getMatched(filterMenus, parent) as any;

  if (!matched || matched.length === 0) return;

  const breadcrumbList = filterItem(matched);

  if (route.meta?.currentActiveMenu) {
    breadcrumbList.push({
      ...route,
      name: route.meta?.title || route.name
    } as unknown as RouteLocationMatched);
  }
  return breadcrumbList;
}
