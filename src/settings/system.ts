import type { ProjectConfig } from '@/interface';
import { PermissionModeEnum, CacheTypeEnum, RouterTransitionEnum } from '@/enum';
import { SessionTimeoutProcessingEnum } from '@/enum/common/httpEnum';
// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  permissionCacheType: CacheTypeEnum.LOCAL,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  useErrorHandle: false,
  fullContent: false,
  lockTime: 0,
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true
  },
  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoadinng
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: false
  },
  removeAllHttpPending: false
};

export default setting;
