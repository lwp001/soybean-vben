/** 后端返回的路由数据类型 */
export interface ApiRouteData {
  /** 动态路由 */
  routes: AuthRoute.RouteList;
  /** 路由首页对应的key */
  home: string;
}
