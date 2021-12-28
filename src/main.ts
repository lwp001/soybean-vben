import { createApp } from 'vue';
import App from './App.vue';
import AppProvider from './AppProvider.vue';
import { setupStore } from './store';
import { setupRouter, router } from './router';
import { setupAssets } from './plugins';
import { setupDirectives } from './directives';
import { setupRouterGuard } from '@/router/guard';
import { setupErrorHandle } from '@/logics/error-handle';

function setupPlugins() {
  /** 引入静态资源 */
  setupAssets();
}

async function setupApp() {
  const appProvider = createApp(AppProvider);
  const app = createApp(App);

  // 挂载全局状态
  setupStore(app);

  // 优先挂载一下 appProvider 解决路由守卫，Axios中可使用，LoadingBar，Dialog，Message 等之类组件
  appProvider.mount('#appProvider');

  // 挂载自定义vue指令
  setupDirectives(app);

  // 挂载路由
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  // Register global directive
  // setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // 路由准备就绪后挂载APP实例
  app.mount('#app');
}

setupPlugins();

setupApp();
