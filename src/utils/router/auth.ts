/**
 * 根据用户权限过滤路由
 * @param routes - 权限路由
 * @param permission - 权限
 */
export function filterAuthRoutesByUserPermission(routes: AuthRoute.RouteList, permission: Auth.RoleType) {
  return routes.map(route => filterAuthRouteByUserPermission(route, permission)).flat(1);
}

/**
 * 根据用户权限过滤单个路由
 * @param route - 单个权限路由
 * @param permission - 权限
 */
function filterAuthRouteByUserPermission(route: AuthRoute.RouteType, permission: Auth.RoleType): AuthRoute.RouteList {
  const filterRoute = { ...route };
  const hasPermission =
    !route.meta.permissions || permission === 'super' || route.meta.permissions.includes(permission);

  if (filterRoute.children) {
    const filterChildren = filterRoute.children
      .map(item => filterAuthRouteByUserPermission(item as AuthRoute.RouteType, permission))
      .flat(1);
    Object.assign(filterRoute, { children: filterChildren });
  }
  return hasPermission ? [filterRoute] : [];
}
