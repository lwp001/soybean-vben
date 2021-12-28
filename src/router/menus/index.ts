// import type { RouteRecordNormalized } from 'vue-router';
// import { pathToRegexp } from 'path-to-regexp';
import type { Menu, MenuModule } from '@/router/types';

// import { useAppStoreWithOut } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { transformMenuModule, getAllParentPath } from '@/router/helper/menuHelper';
// import { filter } from '@/utils/helper/treeHelper';
// import { isUrl } from '@/utils/is';
// import { router } from '@/router';
// import { PermissionModeEnum } from '@/enums/appEnum';

const modules = import.meta.globEager('./modules/**/*.ts');

const menuModules: MenuModule[] = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
});

// ===========================
// ==========Helper===========
// ===========================

const isBackMode = () => {
  // return getPermissionMode() === PermissionModeEnum.BACK;
  return false;
};

const isRouteMappingMode = () => {
  // return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
  return true;
};

const staticMenus: Menu[] = [];
(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
  });

  // for (const menu of menuModules) {
  //   staticMenus.push(transformMenuModule(menu));
  // }
  menuModules.forEach(menu => {
    staticMenus.push(transformMenuModule(menu));
  });
})();

async function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  if (isBackMode()) {
    return permissionStore.getBackMenuList.filter(item => !item.meta?.hideMenu && !item.hideMenu);
  }
  if (isRouteMappingMode()) {
    return permissionStore.getFrontMenuList.filter(item => !item.hideMenu);
  }
  return staticMenus;
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  return menus;
};

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus();
  const shallowMenuList = menus.map(item => ({ ...item, children: undefined }));
  return shallowMenuList;
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus();
  const parent = menus.find(item => item.path === parentPath);
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[];
  }
  return parent.children;
}

// function basicFilter(routes: RouteRecordNormalized[]) {
//   return (menu: Menu) => {
//     const matchRoute = routes.find(route => {
//       if (isUrl(menu.path)) return true;

//       if (route.meta?.carryParam) {
//         return pathToRegexp(route.path).test(menu.path);
//       }
//       const isSame = route.path === menu.path;
//       if (!isSame) return false;

//       if (route.meta?.ignoreAuth) return true;

//       return isSame || pathToRegexp(route.path).test(menu.path);
//     });

//     if (!matchRoute) return false;
//     menu.icon = (menu.icon || matchRoute.meta.icon) as string;
//     menu.meta = matchRoute.meta;
//     return true;
//   };
// }