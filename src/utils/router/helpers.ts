import { createRouter, createWebHashHistory } from 'vue-router';
import type { Router, RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { cloneDeep, omit } from 'lodash-es';

/**
 * 获取所有固定路由的名称集合
 * @param routes - 固定路由
 */
export function getConstantRouteNames(routes: RouteRecordRaw[]) {
  return routes.map(route => getConstantRouteName(route)).flat(1);
}

/**
 * 获取所有固定路由的名称集合
 * @param route - 固定路由
 */
function getConstantRouteName(route: RouteRecordRaw) {
  const names = [route.name];
  if (route.children?.length) {
    names.push(...route.children!.map(item => getConstantRouteName(item)).flat(1));
  }
  return names;
}

/**
 * Convert multi-level routing to level 2 routing
 * 将多级路由转换为 2 级路由
 */
export function flatMultiLevelRoutes(routeModules: AuthRoute.RouteList) {
  const modules: AuthRoute.RouteList = cloneDeep(routeModules);

  for (let index = 0; index < modules.length; index += 1) {
    const routeModule = modules[index];
    // 判断级别是否 多级 路由
    if (isMultipleRoute(routeModule)) {
      // 路由等级提升
      promoteRouteLevel(routeModule);
    }
  }
  return modules;
}

// Determine whether the level exceeds 2 levels
// 判断级别是否超过2级
function isMultipleRoute(routeModule: AuthRoute.RouteType): boolean {
  // Reflect.has 与 in 操作符 相同, 用于检查一个对象(包括它原型链上)是否拥有某个属性
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}

// Routing level upgrade
// 路由等级提升
function promoteRouteLevel(routeModule: AuthRoute.RouteType) {
  // Use vue-router to splice menus
  // 使用vue-router拼接菜单
  // createRouter 创建一个可以被 Vue 应用程序使用的路由实例
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory()
  });
  // getRoutes： 获取所有 路由记录的完整列表。
  const routes = router.getRoutes();
  // 将所有子路由添加到二级路由
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  // omit lodash的函数 对传入的item对象的children进行删除
  routeModule.children = routeModule.children?.map(item => omit(item, 'children')) as AuthRoute.RouteList;
}

// Add all sub-routes to the secondary route
// 将所有子路由添加到二级路由
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AuthRoute.RouteList,
  routeModule: AuthRoute.RouteType
) {
  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];
    const route = routes.find(item => item.name === child.name);
    if (route) {
      routeModule.children = routeModule.children || [];
      if (!routeModule.children.find(item => item.name === route.name)) {
        routeModule.children?.push(route as unknown as AuthRoute.RouteType);
      }
      if (child.children?.length) {
        addToChildren(routes, child.children, routeModule);
      }
    }
  }
}
