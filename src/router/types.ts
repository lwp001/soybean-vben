// RouteComponent, RouteRecordRaw RouteMeta
import type { RouteComponent, RouteMeta } from 'vue-router';

// import type { defineComponent } from 'vue';
// export type Component<T = any> =
//   | ReturnType<typeof defineComponent>
//   | (() => Promise<typeof import('*.vue')>)
//   | (() => Promise<T>);

type Lazy<T> = () => Promise<T>;

// RouteRecordRaw
export type RouteRecordItem = {
  path: string;
  name: string;
  meta: RouteMeta;
  children?: RouteRecordItem[];
  // component?: Component | string;
  // components?: Component;
  component?: RouteComponent | Lazy<RouteComponent> | string;
  props?: Recordable;
  redirect?: string;
  fullPath?: string;
};
