import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { EnumLoginModule, PermissionModeEnum, CacheTypeEnum, ErrorTypeEnum, RouterTransitionEnum } from '@/enum';
import { SessionTimeoutProcessingEnum } from '@/enum/common/httpEnum';

/** 菜单项配置 */
export type GlobalMenuOption = MenuOption & {
  routeName: string;
  routePath: string;
};

/** 多页签 */
export interface MultiTab {
  routes: MultiTabRoute[];
  activeRoute: string;
}
export type MultiTabRoute = Partial<RouteLocationNormalizedLoaded> & {
  path: string;
  fullPath: string;
};

/** 登录模块 */
export type LoginModuleType = keyof typeof EnumLoginModule;

/** npm依赖包版本信息 */
export interface VersionInfo {
  name: string;
  version: string;
}
/**  多标签设置 */
export interface MultiTabsSetting {
  /** 刷新后是否保留已经打开的标签页 */
  cache: boolean;
  /**  开启 */
  show: boolean;
  // 开启快速操作
  showQuick: boolean;
  // 是否可以拖拽
  canDrag: boolean;
  // 是否显示刷新那妞
  showRedo: boolean;
  // 是否显示折叠按钮
  showFold: boolean;
}
/** 动画配置 */
export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}

/** 项目配置信息 */
export interface ProjectConfig {
  permissionMode: PermissionModeEnum;
  multiTabsSetting: MultiTabsSetting;
  permissionCacheType: CacheTypeEnum.LOCAL;
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // Animation configuration
  transitionSetting: TransitionSetting;
  useErrorHandle: boolean;
  // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  fullContent: boolean;
  // Lock screen time
  lockTime: number;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: boolean;
}

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}
