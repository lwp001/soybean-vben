import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';

import { useAuthStore } from '@/store/modules/auth';
import { useRouteStore } from '@/store/modules/route';
import { localStg } from '@/utils/storage';
import { LOGIN_ROUTER_NAME, PAGE_NOT_FOUND_NAME } from '@/router/constant';

const whitePathList: string[] = ['login'];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const pass = await createAuthRouteGuard(to, from, next);

    if (!pass) return;

    // 1. route with href
    if (to.meta.href) {
      window.open(to.meta.href, '_blank');
      next({ path: from.fullPath, replace: true, query: from.query, hash: to.hash });
    }

    const authStore = useAuthStore();

    const isLogin = Boolean(localStg.get('token'));
    const needLogin = !whitePathList.includes(to.name as string);
    const routeRoles = to.meta.roles || [];
    const rootRoute = 'root';
    const noPermissionRoute = '403';

    const SUPER_ADMIN = 'R_SUPER';
    const hasPermission =
      !routeRoles.length ||
      authStore.userInfo.roles.includes(SUPER_ADMIN) ||
      authStore.userInfo.roles.some(role => routeRoles.includes(role));

    const strategicPatterns: Common.StrategicPattern[] = [
      // 1. if it is login route when logged in, change to the root page
      {
        condition: isLogin && to.name === LOGIN_ROUTER_NAME,
        callback: () => {
          next({ name: rootRoute });
        }
      },
      // 2. if is is constant route, then it is allowed to access directly
      {
        condition: !needLogin,
        callback: () => {
          next();
        }
      },
      // 3. if the route need login but the user is not logged in, then switch to the login page
      {
        condition: !isLogin && needLogin,
        callback: () => {
          next({ name: LOGIN_ROUTER_NAME, query: { redirect: to.fullPath } });
        }
      },
      // 4. if the user is logged in and has permission, then it is allowed to access
      {
        condition: isLogin && needLogin && hasPermission,
        callback: () => {
          next();
        }
      },
      // 5. if the user is logged in but does not have permission, then switch to the 403 page
      {
        condition: isLogin && needLogin && !hasPermission,
        callback: () => {
          next({ name: noPermissionRoute });
        }
      }
    ];

    strategicPatterns.some(({ condition, callback }) => {
      if (condition) {
        callback();
      }

      return condition;
    });
  });
}

async function createAuthRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const isNotFoundRoute = to.name === PAGE_NOT_FOUND_NAME;

  // 1. If the route is the constant route but is not the "not-found" route, then it is allowed to access.
  // 是白名单路由 无需验证的路由
  if (whitePathList.includes(to.name as string)) {
    return true;
  }

  // 2. If the auth route is initialized but is not the "not-found" route, then it is allowed to access.
  const routeStore = useRouteStore();
  // 路由已经初始化 并且不是 404 路由
  if (routeStore.isInitAuthRoute && !isNotFoundRoute) {
    return true;
  }

  // 3. If the route is initialized, check whether the route exists.
  // 路由已初始化 且是404路由 --感觉判断有问题
  if (routeStore.isInitAuthRoute && isNotFoundRoute) {
    const exist = await routeStore.getIsAuthRouteExist(to.path);

    if (exist) {
      const noPermissionRoute = '403';

      next({ name: noPermissionRoute });

      return false;
    }

    return true;
  }

  // 4. If the user is not logged in, then redirect to the login page.
  const isLogin = Boolean(localStg.get('token'));
  if (!isLogin) {
    const redirect = to.fullPath;

    next({ name: LOGIN_ROUTER_NAME, query: { redirect } });

    return false;
  }

  // 5. init auth route
  await routeStore.initAuthRoute();

  // 6. the route is caught by the "not-found" route because the auto route is not initialized. after the auto route is initialized, redirect to the original route.
  if (isNotFoundRoute) {
    const rootRoute = 'root';
    const path = to.redirectedFrom?.name === rootRoute ? '/' : to.fullPath;

    next({ path, replace: true, query: to.query, hash: to.hash });

    return false;
  }

  return true;
}
