import type { AppRouteModule } from '@/router/types';

import { getParentLayout, LAYOUT } from '@/router/constant';

const plugs: AppRouteModule = {
  path: '/plugin',
  name: 'Plugin',
  component: LAYOUT,
  redirect: '/plugin/map',
  meta: {
    orderNo: 30,
    icon: 'clarity:plugin-line',
    title: '插件示例'
  },
  children: [
    {
      path: 'map',
      name: 'MapDemo',
      component: () => import('@/views/plugin/map/index.vue'),
      meta: {
        title: '地图'
      }
    },

    {
      path: 'video',
      name: 'VideoDemo',
      component: () => import('@/views/plugin/video/index.vue'),
      meta: {
        title: '视频'
      }
    },
    {
      path: 'editor',
      name: 'EditorDemo',
      redirect: '/plugin/editor/markdown',
      component: getParentLayout('EditorDemo'),
      meta: {
        // icon: 'carbon:table-split',
        title: '编辑器'
      },
      children: [
        {
          path: 'markdown',
          component: () => import('@/views/plugin/editor/markdown/index.vue'),
          name: 'MarkdownEditorDemo',
          meta: {
            title: 'MarkDown编辑器'
          }
        },
        {
          path: 'tinymce',
          component: () => import('@/views/plugin/editor/quill/index.vue'),
          name: 'QuillDemo',
          meta: {
            title: '富文本编辑器'
          }
        }
      ]
    },

    {
      path: 'icon',
      name: 'IconDemo',
      component: () => import('@/views/plugin/icon/index.vue'),
      meta: {
        title: '图标'
      }
    },
    {
      path: 'swiper',
      name: 'Swiper',
      component: () => import('@/views/plugin/swiper/index.vue'),
      meta: {
        title: 'Swiper'
      }
    },
    {
      path: 'print',
      name: 'PrintDemo',
      component: () => import('@/views/plugin/print/index.vue'),
      meta: {
        title: '打印'
      }
    },
    {
      path: 'copy',
      name: 'CopyDemo',
      component: () => import('@/views/plugin/copy/index.vue'),
      meta: {
        title: '剪贴板'
      }
    }
  ]
};

export default plugs;
