export const routes = [
  {
    id: '1',
    name: 'manage',
    path: '/manage',
    component: 'base',
    redirect: '/manage/user',
    meta: {
      title: 'manage',
      // icon: 'fe:grid',
      icon: 'fluent-mdl2:recruitment-management',
      keepAlive: null,
      i18nKey: 'route.manage',
      order: 10,
      hideInMenu: false
    },
    children: [
      {
        id: '2',
        name: 'manage_menu',
        path: '/manage/menu',
        component: '/manage/menu/index',
        meta: {
          title: 'manage_menu',
          i18nKey: 'route.manage_menu',
          icon: 'ic:sharp-menu-open',
          keepAlive: true,
          order: 1,
          roles: ['R_ADMIN']
        }
      },
      {
        id: '3',
        name: 'manage_role',
        path: '/manage/role',
        component: '/manage/role/index',
        meta: {
          title: 'manage_role',
          i18nKey: 'route.manage_role',
          icon: 'carbon:user-role',
          keepAlive: true,
          order: 1,
          roles: ['R_ADMIN']
        }
      },
      {
        id: '4',
        name: 'manage_user',
        path: '/manage/user',
        component: '/manage/user/index',
        meta: {
          title: 'manage_user',
          icon: 'fe:user',
          keepAlive: true,
          order: 3,
          i18nKey: 'route.manage_user',
          roles: ['R_ADMIN']
        }
      }
    ]
  },
  {
    id: '5',
    name: 'home',
    path: '/home',
    redirect: '/home',
    component: 'base',
    meta: {
      title: 'home',
      i18nKey: 'route.home',
      single: true,
      icon: 'mdi:monitor-dashboard',
      order: 1
    },
    children: [
      {
        id: '6',
        name: 'home',
        path: '/home',
        component: '/home/index',
        meta: {
          title: 'home',
          i18nKey: 'route.home',
          icon: 'mdi:monitor-dashboard',
          keepAlive: true,
          order: 1
        }
      }
    ]
  },
  {
    id: '7',
    name: 'about',
    path: '/about',
    redirect: '/about',
    component: 'base',
    meta: {
      title: 'about',
      i18nKey: 'route.about',
      icon: 'fluent:book-information-24-regular',
      single: true,
      order: 99
    },
    children: [
      {
        id: '8',
        name: 'about',
        path: '/about',
        component: '/about/index',
        meta: {
          title: 'about',
          i18nKey: 'route.about',
          icon: 'fluent:book-information-24-regular',
          keepAlive: null,
          order: 1
        }
      }
    ]
  }
];
