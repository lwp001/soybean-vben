import { unref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import { router as globalRouter } from '@/router';
import type { LoginModuleType } from '@/interface';
import { PageEnum } from '@/enum';

/**
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用
 */
export function useRouterPush(inSetup: boolean = true) {
  const router = inSetup ? useRouter() : globalRouter;
  const route = inSetup ? useRoute() : unref(globalRouter.currentRoute);

  /**
   * 路由跳转
   * @param to - 路由
   * @param newTab - 在新的浏览器标签打开
   */
  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to);
      window.open(routerData.href, '_blank');
    } else {
      router.push(to);
    }
  }

  /** 返回上一级路由 */
  function routerBack() {
    router.go(-1);
  }

  /**
   * 跳转首页
   * @param newTab - 在新的浏览器标签打开
   */
  function toHome(newTab = false) {
    routerPush(PageEnum.BASE_HOME, newTab);
  }

  /**
   * 重定向地址
   * - current: 取当前的path作为重定向地址
   */
  type LoginRedirect = 'current' | string;

  /**
   * 跳转登录页面(通过vue路由)
   * @param module - 展示的登录模块
   * @param redirect - 重定向地址(登录成功后跳转的地址)
   * @param newTab - 在新的浏览器标签打开
   */
  function toLogin(module: LoginModuleType = 'pwd-login', redirect: LoginRedirect = 'current', newTab = false) {
    const routeLocation: RouteLocationRaw = {
      name: 'login',
      params: { module }
    };
    if (redirect) {
      let url = redirect;
      if (redirect === 'current') {
        url = route.fullPath;
      }
      Object.assign(routeLocation, { query: { redirect: url } });
    }
    routerPush(routeLocation, newTab);
  }

  /**
   * 登陆页跳转登陆页(登录模块切换)
   * @param module - 展示的登录模块
   * @param newTab - 在新的浏览器标签打开
   */
  function toCurrentLogin(module: LoginModuleType, newTab = false) {
    const { query } = route;
    routerPush({ name: 'login', params: { module }, query: { ...query } }, newTab);
  }

  /**
   * 登录成功后跳转重定向的地址
   * @param redirect - 重定向地址
   */
  function toLoginRedirect(redirect?: string) {
    if (redirect) {
      routerPush(redirect);
    } else {
      toHome();
    }
  }

  return {
    routerPush,
    routerBack,
    toHome,
    toLogin,
    toCurrentLogin,
    toLoginRedirect
  };
}
