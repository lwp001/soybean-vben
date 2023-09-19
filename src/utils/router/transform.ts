import type { RouteRecordRaw } from 'vue-router';
import { BasicLayout, BlankLayout } from '@/layouts';
import { PAGE_NOT_FOUND } from '@/router/routes';

/**
 * 将权限路由转换成搜索的菜单数据
 * @param routes - 权限路由
 * @param treeMap
 */
export function transformAuthRouteToSearchMenus(routes: AuthRoute.RouteList, treeMap: AuthRoute.RouteList = []) {
  if (routes && routes.length === 0) return [];
  return routes.reduce((acc, cur) => {
    if (!cur.meta?.hide) {
      acc.push(cur);
    }
    if (cur.children && cur.children.length > 0) {
      transformAuthRouteToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}

/** 将路由名字转换成路由路径 */
export function transformRouteNameToRoutePath(name: string): string {
  if (name === 'not-found') return '';

  const rootPath = '/';
  if (name === 'root') return rootPath;

  const splitMark = '_';
  const pathSplitMark = '/';
  const path = name.split(splitMark).join(pathSplitMark);

  return pathSplitMark + path;
}

/** 将路由路径转换成路由名字 */
export function transformRoutePathToRouteName(path: string): string {
  if (path === '/') return 'root';

  const pathSplitMark = '/';
  const routeSplitMark = '_';

  const name = path.split(pathSplitMark).slice(1).join(routeSplitMark);

  return name;
}

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

/**
 * 转换单个页面路由
 * @param routes - 权限路由
 * @description 将单页面路由转换成有子路由的路由
 */
export function transformAuthRouteToVueRoutes(routes: AuthRoute.RouteList) {
  // 生成组件数据
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  return routes.map(route => transformAuthRouteToVueRoute(route)).flat(1);
}

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>;

/**
 * 将单个权限路由转换成vue路由
 * @param item - 单个权限路由
 * dynamicViewsModules: Record<string, () => Promise<Recordable>>,
 */
export function transformAuthRouteToVueRoute(item: AuthRoute.RouteType) {
  const resultRoute: RouteRecordRaw[] = [];

  const itemRoute = { ...item } as RouteRecordRaw;

  // 动态path
  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta.dynamicPath });
  }

  // 外链路由
  if (hasHref(item)) {
    Object.assign(itemRoute, { component: PAGE_NOT_FOUND });
  }

  // 路由组件
  if (hasComponent(item)) {
    const action: ComponentAction = {
      basic() {
        itemRoute.component = BasicLayout;
      },
      blank() {
        itemRoute.component = BlankLayout;
      },
      multi() {
        // 多级路由一定有子路由
        if (hasChildren(item)) {
          Object.assign(itemRoute, { meta: { ...itemRoute.meta, multi: true } });
          delete itemRoute.component;
        } else {
          window.console.error('多级路由缺少子路由: ', item);
        }
      },
      self() {
        itemRoute.component = componentFromString(`${item.path}/index`);
      }
    };
    try {
      if (item.component) {
        action[item.component]();
      } else {
        window.console.error('路由组件解析失败: ', item);
      }
    } catch {
      window.console.error('路由组件解析失败: ', item);
    }
  }

  // 注意：单独路由没有children
  if (isSingleRoute(item)) {
    if (hasChildren(item)) {
      window.console.error('单独路由不应该有子路由: ', item);
    }

    // 捕获无效路由的需特殊处理
    if (item.name === 'not-found') {
      itemRoute.children = [
        {
          path: '',
          name: item.name,
          component: PAGE_NOT_FOUND
        }
      ];
    } else {
      const parentPath = `${itemRoute.path}-parent`;

      const layout = item.meta.singleLayout === 'basic' ? BasicLayout : BlankLayout;

      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: item.path,
        children: [itemRoute]
      };

      return [parentRoute];
    }
  }

  // 子路由
  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.RouteList).map(child => transformAuthRouteToVueRoute(child)).flat();

    // 找出第一个不为多级路由中间级的子路由路径作为重定向路径
    const redirectPath = children.find(v => !v.meta?.multi)?.path || '/';

    if (redirectPath === '/') {
      window.console.error('该多级路由没有有效的子路径', item);
    }

    if (item.component === 'multi') {
      // 多级路由，将子路由提取出来变成同级
      resultRoute.push(...children);
      delete itemRoute.children;
    } else {
      itemRoute.children = children;
    }
    itemRoute.redirect = redirectPath;
  }

  resultRoute.push(itemRoute);

  return resultRoute;
}

function componentFromString(component: string) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter(key => {
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
    throw new Error('构建组件异常: 出现同名文件');
  } else {
    console.warn(`在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`);
    return PAGE_NOT_FOUND;
  }
}

/**
 * 是否有外链
 * @param item - 权限路由
 */
function hasHref(item: AuthRoute.RouteType) {
  return Boolean(item.meta.href);
}

/**
 * 是否有动态路由path
 * @param item - 权限路由
 */
function hasDynamicPath(item: AuthRoute.RouteType) {
  return Boolean(item.meta.dynamicPath);
}

/**
 * 是否有路由组件
 * @param item - 权限路由
 */
function hasComponent(item: AuthRoute.RouteType) {
  return Boolean(item.component);
}

/**
 * 是否有子路由
 * @param item - 权限路由
 */
function hasChildren(item: AuthRoute.RouteType) {
  return Boolean(item.children && item.children.length);
}

/**
 * 是否是单层级路由
 * @param item - 权限路由
 */
function isSingleRoute(item: AuthRoute.RouteType) {
  return Boolean(item.meta.singleLayout);
}
