// import 'virtual:windi-base.css';
// import 'virtual:windi-components.css';
// import '/@/design/index.less';
// import 'virtual:windi-utilities.css';
// Register icon sprite
// import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
// import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';

import { setupAssets, setupNaiveUI } from '/@/plugins';

async function bootstrap() {
  // 引入静态资源
  setupAssets();

  const app = createApp(App);

  // Configure store
  setupStore(app);

  // 按需引入naiveUI
  setupNaiveUI(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
