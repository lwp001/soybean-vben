import type { RouteRecordItem } from '@/router/types';

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
export const routeModuleList: RouteRecordItem[] = [];

// 加入到路由集合中
Object.keys(modules).forEach(key => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

/**
 * custom routes
 *
 * const customRoutes: RouteRecordItem[] = [ { name: 'exception', path: '/exception', component: 'layout.base', meta: {
 * title: 'exception', i18nKey: 'route.exception', icon: 'ant-design:exception-outlined', order: 7 }, children: [ {
 * name: 'exception_403', path: '/exception/403', component: 'view.403', meta: { title: 'exception_403', i18nKey:
 * 'route.exception_403', icon: 'ic:baseline-block' } }, { name: 'exception_404', path: '/exception/404', component:
 * 'view.404', meta: { title: 'exception_404', i18nKey: 'route.exception_404', icon: 'ic:baseline-web-asset-off' } }, {
 * name: 'exception_500', path: '/exception/500', component: 'view.500', meta: { title: 'exception_500', i18nKey:
 * 'route.exception_500', icon: 'ic:baseline-wifi-off' } } ] }, { name: 'document', path: '/document', component:
 * 'layout.base', meta: { title: 'document', i18nKey: 'route.document', order: 2, icon:
 * 'mdi:file-document-multiple-outline' }, children: [ { name: 'document_antd', path: '/document/antd', component:
 * 'view.iframe-page', props: { url: 'https://antdv.com/components/overview-cn' }, meta: { title: 'document_antd',
 * i18nKey: 'route.document_antd', order: 7, icon: 'logos:ant-design' } }, { name: 'document_naive', path:
 * '/document/naive', component: 'view.iframe-page', props: { url:
 * 'https://www.naiveui.com/zh-CN/os-theme/docs/introduction' }, meta: { title: 'document_naive', i18nKey:
 * 'route.document_naive', order: 6, icon: 'logos:naiveui' } }, { name: 'document_project', path: '/document/project',
 * component: 'view.iframe-page', props: { url: 'https://docs.soybeanjs.cn/zh' }, meta: { title: 'document_project',
 * i18nKey: 'route.document_project', order: 1, localIcon: 'logo' } }, { name: 'document_project-link', path:
 * '/document/project-link', component: 'view.iframe-page', meta: { title: 'document_project-link', i18nKey:
 * 'route.document_project-link', order: 2, localIcon: 'logo', href: 'https://docs.soybeanjs.cn/zh' } }, { name:
 * 'document_unocss', path: '/document/unocss', component: 'view.iframe-page', props: { url: 'https://unocss.dev/' },
 * meta: { title: 'document_unocss', i18nKey: 'route.document_unocss', order: 5, icon: 'logos:unocss' } }, { name:
 * 'document_vite', path: '/document/vite', component: 'view.iframe-page', props: { url: 'https://cn.vitejs.dev/' },
 * meta: { title: 'document_vite', i18nKey: 'route.document_vite', order: 4, icon: 'logos:vitejs' } }, { name:
 * 'document_vue', path: '/document/vue', component: 'view.iframe-page', props: { url: 'https://cn.vuejs.org/' }, meta:
 * { title: 'document_vue', i18nKey: 'route.document_vue', order: 3, icon: 'logos:vue' } } ] } ];
 */
