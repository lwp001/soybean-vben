import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router';

// import type { defineComponent } from 'vue';

// export type Component<T = any> =
//   | ReturnType<typeof defineComponent>
//   | (() => Promise<typeof import('*.vue')>)
//   | (() => Promise<T>);

// // @ts-expect-error
// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
//   name: string;
//   meta: RouteMeta;
//   component?: Component | string;
//   components?: Component;
//   children?: AppRouteRecordRaw[];
//   props?: Recordable;
//   fullPath?: string;
// }

type Lazy<T> = () => Promise<T>;

export type RouteRecordItem = RouteRecordRaw & {
  path: string;
  name: string;
  meta: RouteMeta;
  children?: RouteRecordItem[];
  component?: RouteComponent | Lazy<RouteComponent> | string;
};

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;

  icon?: string;

  img?: string;

  path: string;

  // path contains param, auto assignment.
  paramPath?: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: string[];

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}
