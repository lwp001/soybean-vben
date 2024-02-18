import type { RouteLocationNormalized, Router } from 'vue-router';

import { createPermissionGuard } from './permission';
import { createStateGuard } from './stateGuard';
import { createProgressGuard } from './progress';
import { createDocumentTitleGuard } from './title';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createScrollGuard(router);
  // createMessageGuard(router);
  createStateGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createDocumentTitleGuard(router);
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return href.startsWith('#');
  };

  router.afterEach(async to => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      document.querySelector('.vben-layout-content')?.scrollTo(0, 0);
    return true;
  });
}
