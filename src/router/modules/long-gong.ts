// import { BasicLayout } from '@/layouts';

const document: AuthRoute.RouteType = {
  name: 'long-gong',
  path: '/long-gong',
  component: 'basic',
  children: [
    {
      name: 'long-gong_terminal',
      path: '/long-gong/terminal',
      component: 'self',
      meta: {
        title: '终端信息',
        i18nTitle: 'routes.long-gong.terminal',
        requiresAuth: true,
        icon: 'logos:vue'
      }
    },
    {
      name: 'long-gong_heart',
      path: '/long-gong/heart',
      component: 'self',
      meta: {
        title: '心跳信息',
        i18nTitle: 'routes.long-gong.heart',
        requiresAuth: true,
        icon: 'logos:vitejs'
      }
    }
  ],
  meta: {
    title: '龙工监控',
    i18nTitle: 'routes.long-gong._value',
    icon: 'mdi:file-document-multiple-outline',
    order: 2
  }
};

export default document;
