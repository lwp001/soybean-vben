import type { RouteRecordNormalized, Router } from 'vue-router';
import { cloneDeep, omit } from 'lodash-es';
import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordItem } from '@/router/types';

import { BaseLayout, BlankLayout, EXCEPTION_COMPONENT, getParentLayout } from '@/router/constant';

// @ts-expect-error  Unreachable code error
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('BASE', BaseLayout);
LayoutMap.set('BLANK', BlankLayout);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

// Dynamic introduction
function asyncImportRoute(routes: RouteRecordItem[] | undefined) {
  dynamicViewsModules ||= import.meta.glob('../../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach(item => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = BlankLayout; // 'IFRAME';
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get((component as string).toUpperCase());
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(dynamicViewsModules, component as string);
      }
    } else if (name) {
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}

function dynamicImport(dynamicViewsModulesParams: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModulesParams);
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
    return dynamicViewsModulesParams[matchKey];
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
    throw new Error('same file!');
  } else {
    console.warn(`在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`);
    return EXCEPTION_COMPONENT;
  }
}

// Turn background objects into routing objects
// 将背景对象变成路由对象
export function transformObjToRoute<T = RouteRecordItem>(routeList: RouteRecordItem[]): T[] {
  routeList.forEach(route => {
    const component = route.component as string;
    if (component) {
      if (component.toUpperCase() === 'BASE') {
        route.component = BaseLayout;
      } else {
        route.children = [cloneDeep(route)];
        route.component = BaseLayout;

        // 某些情况下如果name如果没有值， 多个一级路由菜单会导致页面404
        if (!route.name) {
          console.warn(`找不到菜单对应的name, 请检查数据!${JSON.stringify(route)}`);
        }
        route.name = `${route.name}Parent`;
        route.path = '';
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    } else {
      console.warn(`请正确配置路由：${route?.name}的component属性`);
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}

/** Convert multi-level routing to level 2 routing 将多级路由转换为 2 级路由 */
export function flatMultiLevelRoutes(routeModules: RouteRecordItem[]) {
  const modules: RouteRecordItem[] = cloneDeep(routeModules);

  for (let index = 0; index < modules.length; index += 1) {
    const routeModule = modules[index];
    // 判断级别是否 多级 路由
    if (isMultipleRoute(routeModule)) {
      // 路由等级提升
      promoteRouteLevel(routeModule);
    }
    // 声明终止当前循环， 即跳过此次循环，进行下一轮
  }
  return modules;
}

// Routing level upgrade
// 路由等级提升
function promoteRouteLevel(routeModule: RouteRecordItem) {
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
  routeModule.children = routeModule.children?.map(item => omit(item, 'children')) as RouteRecordItem[];
}

// Add all sub-routes to the secondary route
// 将所有子路由添加到二级路由
function addToChildren(routes: RouteRecordNormalized[], children: RouteRecordItem[], routeModule: RouteRecordItem) {
  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];
    const route = routes.find(item => item.name === child.name);
    if (route !== undefined) {
      routeModule.children ||= [];
      if (!routeModule.children.find(item => item.name === route.name)) {
        routeModule.children?.push(route as unknown as RouteRecordItem);
      }
      if (child.children?.length) {
        addToChildren(routes, child.children, routeModule);
      }
    }
  }
}

// Determine whether the level exceeds 2 levels
// 判断级别是否超过2级
function isMultipleRoute(routeModule: RouteRecordItem) {
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
