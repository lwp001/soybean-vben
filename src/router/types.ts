import type { RouteRecordRaw, RouteMeta } from 'vue-router';

import { defineComponent } from 'vue';
import type { MenuOption } from 'naive-ui';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

// /** 菜单项配置 */
// export type GlobalMenuOption = MenuOption & {
//   routeName: string;
//   routePath: string;
// };
/** 菜单项配置 */
export type Menu = MenuOption & {
  name: string;
  path: string;

  // path contains param, auto assignment.
  paramPath?: string;

  children?: Menu[];

  orderNo?: number;

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
};

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;
