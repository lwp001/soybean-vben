import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { $t } from '@/locales';
import type { I18nKey } from '@/router/routes/schema';
import { createPermissionGuard } from './permission';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // console.log('路由切换:', to, from);
    // 开始 loadingBar
    window.$loadingBar?.start();
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });
  router.afterEach(to => {
    // 设置document title
    const title = to.meta.i18nTitle ? $t(to.meta.i18nTitle as I18nKey) : to.meta.title;
    useTitle(title);
    // 结束 loadingBar
    window.$loadingBar?.finish();
  });
}
