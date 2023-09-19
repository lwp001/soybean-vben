export const routeModel: Record<Auth.RoleType, AuthRoute.RouteList> = {
  super: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis',
            i18nTitle: 'routes.dashboard.analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench',
            i18nTitle: 'routes.dashboard.workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1,
        i18nTitle: 'routes.dashboard._value'
      }
    },
    {
      name: 'document',
      path: '/document',
      component: 'basic',
      children: [
        {
          name: 'document_vue',
          path: '/document/vue',
          component: 'self',
          meta: {
            title: 'vue文档',
            i18nTitle: 'routes.document.vue',
            requiresAuth: true,
            icon: 'logos:vue'
          }
        },
        {
          name: 'document_vite',
          path: '/document/vite',
          component: 'self',
          meta: {
            title: 'vite文档',
            i18nTitle: 'routes.document.vite',
            requiresAuth: true,
            icon: 'logos:vitejs'
          }
        },
        {
          name: 'document_naive',
          path: '/document/naive',
          component: 'self',
          meta: {
            title: 'naive文档',
            i18nTitle: 'routes.document.naive',
            requiresAuth: true,
            icon: 'logos:naiveui'
          }
        },
        {
          name: 'document_project',
          path: '/document/project',
          component: 'self',
          meta: {
            title: '项目文档',
            i18nTitle: 'routes.document.project',
            requiresAuth: true,
            localIcon: 'logo'
          }
        },
        {
          name: 'document_project-link',
          path: '/document/project-link',
          meta: {
            title: '项目文档(外链)',
            i18nTitle: 'routes.document.project-link',
            requiresAuth: true,
            localIcon: 'logo',
            href: 'https://admin-docs.soybeanjs.cn/'
          }
        }
      ],
      meta: {
        title: '文档',
        i18nTitle: 'routes.document._value',
        icon: 'mdi:file-document-multiple-outline',
        order: 2
      }
    },
    {
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
    },
    {
      name: 'component',
      path: '/component',
      component: 'basic',
      children: [
        {
          name: 'component_button',
          path: '/component/button',
          component: 'self',
          meta: {
            title: '按钮',
            i18nTitle: 'routes.component.button',
            requiresAuth: true,
            icon: 'mdi:button-cursor'
          }
        },
        {
          name: 'component_card',
          path: '/component/card',
          component: 'self',
          meta: {
            title: '卡片',
            i18nTitle: 'routes.component.card',
            requiresAuth: true,
            icon: 'mdi:card-outline'
          }
        },
        {
          name: 'component_table',
          path: '/component/table',
          component: 'self',
          meta: {
            title: '表格',
            i18nTitle: 'routes.component.table',
            requiresAuth: true,
            icon: 'mdi:table-large'
          }
        }
      ],
      meta: {
        title: '组件示例',
        i18nTitle: 'routes.component._value',
        icon: 'cib:app-store',
        order: 3
      }
    },

    {
      name: 'exception',
      path: '/exception',
      component: 'basic',
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'self',
          meta: {
            title: '异常页403',
            i18nTitle: 'routes.exception.403',
            requiresAuth: true,
            icon: 'ic:baseline-block'
          }
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'self',
          meta: {
            title: '异常页404',
            i18nTitle: 'routes.exception.404',
            requiresAuth: true,
            icon: 'ic:baseline-web-asset-off'
          }
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'self',
          meta: {
            title: '异常页500',
            i18nTitle: 'routes.exception.500',
            requiresAuth: true,
            icon: 'ic:baseline-wifi-off'
          }
        }
      ],
      meta: {
        i18nTitle: 'routes.exception._value',
        title: '异常页',
        icon: 'ant-design:exception-outlined',
        order: 7
      }
    },
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'basic',
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second',
              path: '/multi-menu/first/second',
              component: 'self',
              meta: {
                title: '二级菜单',
                i18nTitle: 'routes.multi-menu.first.second',
                requiresAuth: true,
                icon: 'mdi:menu'
              }
            },
            {
              name: 'multi-menu_first_second-new',
              path: '/multi-menu/first/second-new',
              component: 'multi',
              children: [
                {
                  name: 'multi-menu_first_second-new_third',
                  path: '/multi-menu/first/second-new/third',
                  component: 'self',
                  meta: {
                    title: '三级菜单',
                    i18nTitle: 'routes.multi-menu.first.second-new.third',
                    requiresAuth: true,
                    icon: 'mdi:menu'
                  }
                }
              ],
              meta: {
                title: '二级菜单(有子菜单)',
                i18nTitle: 'routes.multi-menu.first.second-new._value',
                icon: 'mdi:menu'
              }
            }
          ],
          meta: {
            title: '一级菜单',
            i18nTitle: 'routes.multi-menu.first._value',
            icon: 'mdi:menu'
          }
        }
      ],
      meta: {
        title: '多级菜单',
        i18nTitle: 'routes.multi-menu._value',
        icon: 'carbon:menu',
        order: 8
      }
    },
    {
      name: 'management',
      path: '/management',
      component: 'basic',
      children: [
        {
          name: 'management_auth',
          path: '/management/auth',
          component: 'self',
          meta: {
            title: '权限管理',
            i18nTitle: 'routes.management.auth',
            requiresAuth: true,
            icon: 'ic:baseline-security'
          }
        },
        {
          name: 'management_role',
          path: '/management/role',
          component: 'self',
          meta: {
            title: '角色管理',
            i18nTitle: 'routes.management.role',
            requiresAuth: true,
            icon: 'carbon:user-role'
          }
        },
        {
          name: 'management_user',
          path: '/management/user',
          component: 'self',
          meta: {
            title: '用户管理',
            i18nTitle: 'routes.management.user',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        },
        {
          name: 'management_route',
          path: '/management/route',
          component: 'self',
          meta: {
            title: '路由管理',
            i18nTitle: 'routes.management.route',
            requiresAuth: true,
            icon: 'material-symbols:route'
          }
        }
      ],
      meta: {
        title: '系统管理',
        i18nTitle: 'routes.management._value',
        icon: 'carbon:cloud-service-management',
        order: 9
      }
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        i18nTitle: 'routes.about',
        requiresAuth: true,
        keepAlive: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        order: 10
      }
    }
  ],
  admin: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis',
            i18nTitle: 'routes.dashboard.analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench',
            i18nTitle: 'routes.dashboard.workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1,
        i18nTitle: 'routes.dashboard._value'
      }
    },
    {
      name: 'document',
      path: '/document',
      component: 'basic',
      children: [
        {
          name: 'document_vue',
          path: '/document/vue',
          component: 'self',
          meta: {
            title: 'vue文档',
            i18nTitle: 'routes.document.vue',
            requiresAuth: true,
            icon: 'logos:vue'
          }
        },
        {
          name: 'document_vite',
          path: '/document/vite',
          component: 'self',
          meta: {
            title: 'vite文档',
            i18nTitle: 'routes.document.vite',
            requiresAuth: true,
            icon: 'logos:vitejs'
          }
        },
        {
          name: 'document_naive',
          path: '/document/naive',
          component: 'self',
          meta: {
            title: 'naive文档',
            i18nTitle: 'routes.document.naive',
            requiresAuth: true,
            icon: 'logos:naiveui'
          }
        },
        {
          name: 'document_project',
          path: '/document/project',
          component: 'self',
          meta: {
            title: '项目文档',
            i18nTitle: 'routes.document.project',
            requiresAuth: true,
            localIcon: 'logo'
          }
        },
        {
          name: 'document_project-link',
          path: '/document/project-link',
          meta: {
            title: '项目文档(外链)',
            i18nTitle: 'routes.document.project-link',
            requiresAuth: true,
            localIcon: 'logo',
            href: 'https://admin-docs.soybeanjs.cn/'
          }
        }
      ],
      meta: {
        title: '文档',
        i18nTitle: 'routes.document._value',
        icon: 'mdi:file-document-multiple-outline',
        order: 2
      }
    },
    {
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
    },
    {
      name: 'component',
      path: '/component',
      component: 'basic',
      children: [
        {
          name: 'component_button',
          path: '/component/button',
          component: 'self',
          meta: {
            title: '按钮',
            i18nTitle: 'routes.component.button',
            requiresAuth: true,
            icon: 'mdi:button-cursor'
          }
        },
        {
          name: 'component_card',
          path: '/component/card',
          component: 'self',
          meta: {
            title: '卡片',
            i18nTitle: 'routes.component.card',
            requiresAuth: true,
            icon: 'mdi:card-outline'
          }
        },
        {
          name: 'component_table',
          path: '/component/table',
          component: 'self',
          meta: {
            title: '表格',
            i18nTitle: 'routes.component.table',
            requiresAuth: true,
            icon: 'mdi:table-large'
          }
        }
      ],
      meta: {
        title: '组件示例',
        i18nTitle: 'routes.component._value',
        icon: 'cib:app-store',
        order: 3
      }
    },

    {
      name: 'exception',
      path: '/exception',
      component: 'basic',
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'self',
          meta: {
            title: '异常页403',
            i18nTitle: 'routes.exception.403',
            requiresAuth: true,
            icon: 'ic:baseline-block'
          }
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'self',
          meta: {
            title: '异常页404',
            i18nTitle: 'routes.exception.404',
            requiresAuth: true,
            icon: 'ic:baseline-web-asset-off'
          }
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'self',
          meta: {
            title: '异常页500',
            i18nTitle: 'routes.exception.500',
            requiresAuth: true,
            icon: 'ic:baseline-wifi-off'
          }
        }
      ],
      meta: {
        i18nTitle: 'routes.exception._value',
        title: '异常页',
        icon: 'ant-design:exception-outlined',
        order: 7
      }
    },
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'basic',
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second',
              path: '/multi-menu/first/second',
              component: 'self',
              meta: {
                title: '二级菜单',
                i18nTitle: 'routes.multi-menu.first.second',
                requiresAuth: true,
                icon: 'mdi:menu'
              }
            },
            {
              name: 'multi-menu_first_second-new',
              path: '/multi-menu/first/second-new',
              component: 'multi',
              children: [
                {
                  name: 'multi-menu_first_second-new_third',
                  path: '/multi-menu/first/second-new/third',
                  component: 'self',
                  meta: {
                    title: '三级菜单',
                    i18nTitle: 'routes.multi-menu.first.second-new.third',
                    requiresAuth: true,
                    icon: 'mdi:menu'
                  }
                }
              ],
              meta: {
                title: '二级菜单(有子菜单)',
                i18nTitle: 'routes.multi-menu.first.second-new._value',
                icon: 'mdi:menu'
              }
            }
          ],
          meta: {
            title: '一级菜单',
            i18nTitle: 'routes.multi-menu.first._value',
            icon: 'mdi:menu'
          }
        }
      ],
      meta: {
        title: '多级菜单',
        i18nTitle: 'routes.multi-menu._value',
        icon: 'carbon:menu',
        order: 8
      }
    },
    {
      name: 'management',
      path: '/management',
      component: 'basic',
      children: [
        {
          name: 'management_auth',
          path: '/management/auth',
          component: 'self',
          meta: {
            title: '权限管理',
            i18nTitle: 'routes.management.auth',
            requiresAuth: true,
            icon: 'ic:baseline-security'
          }
        },
        {
          name: 'management_role',
          path: '/management/role',
          component: 'self',
          meta: {
            title: '角色管理',
            i18nTitle: 'routes.management.role',
            requiresAuth: true,
            icon: 'carbon:user-role'
          }
        },
        {
          name: 'management_user',
          path: '/management/user',
          component: 'self',
          meta: {
            title: '用户管理',
            i18nTitle: 'routes.management.user',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        },
        {
          name: 'management_route',
          path: '/management/route',
          component: 'self',
          meta: {
            title: '路由管理',
            i18nTitle: 'routes.management.route',
            requiresAuth: true,
            icon: 'material-symbols:route'
          }
        }
      ],
      meta: {
        title: '系统管理',
        i18nTitle: 'routes.management._value',
        icon: 'carbon:cloud-service-management',
        order: 9
      }
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        i18nTitle: 'routes.about',
        requiresAuth: true,
        keepAlive: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        order: 10
      }
    }
  ],
  user: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis',
            i18nTitle: 'routes.dashboard.analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench',
            i18nTitle: 'routes.dashboard.workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1,
        i18nTitle: 'routes.dashboard._value'
      }
    },

    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'basic',
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second',
              path: '/multi-menu/first/second',
              component: 'self',
              meta: {
                title: '二级菜单',
                i18nTitle: 'routes.multi-menu.first.second',
                requiresAuth: true,
                icon: 'mdi:menu'
              }
            },
            {
              name: 'multi-menu_first_second-new',
              path: '/multi-menu/first/second-new',
              component: 'multi',
              children: [
                {
                  name: 'multi-menu_first_second-new_third',
                  path: '/multi-menu/first/second-new/third',
                  component: 'self',
                  meta: {
                    title: '三级菜单',
                    i18nTitle: 'routes.multi-menu.first.second-new.third',
                    requiresAuth: true,
                    icon: 'mdi:menu'
                  }
                }
              ],
              meta: {
                title: '二级菜单(有子菜单)',
                i18nTitle: 'routes.multi-menu.first.second-new._value',
                icon: 'mdi:menu'
              }
            }
          ],
          meta: {
            title: '一级菜单',
            i18nTitle: 'routes.multi-menu.first._value',
            icon: 'mdi:menu'
          }
        }
      ],
      meta: {
        title: '多级菜单',
        i18nTitle: 'routes.multi-menu._value',
        icon: 'carbon:menu',
        order: 8
      }
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        i18nTitle: 'routes.about',
        requiresAuth: true,
        keepAlive: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        order: 10
      }
    }
  ]
};
