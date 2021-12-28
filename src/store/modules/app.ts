// import type { BeforeMiniState } from '/#/store';
import { defineStore } from 'pinia';
import { store } from '@/store';
import type { ProjectConfig, MultiTabsSetting, TransitionSetting } from '@/interface';
import { PROJ_CFG_KEY } from '@/enum';
import { Persistent } from '@/utils/cache/persistent';
import { resetRouter } from '@/router';
import { deepMerge } from '@/utils';

/** 菜单状态 */
interface MenuState {
  /** 菜单折叠 */
  collapsed: boolean;
  /** 混合菜单vertical-mix是否固定二级菜单 */
  fixedMix: boolean;
}

/** 项目配置抽屉的状态 */
interface SettingDrawer {
  /** 设置抽屉可见性 */
  visible: boolean;
}

interface AppState {
  menu: MenuState;
  settingDrawer: SettingDrawer;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    menu: {
      collapsed: false,
      fixedMix: false
    },
    settingDrawer: {
      visible: false
    },
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY)
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    /** 获取设置面板的信息 */
    getSettingDrawerSetting(): SettingDrawer {
      return this.settingDrawer;
    },
    getMenusSetting(): MenuState {
      return this.menu;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    }
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    /** 折叠/展开菜单 */
    handleMenuCollapse(collapsed: boolean) {
      this.menu.collapsed = collapsed;
    },
    /** 设置混合菜单是否固定 */
    toggleFixedMixMenu() {
      this.menu.fixedMix = !this.menu.fixedMix;
    },
    /** 切换折叠/展开菜单 */
    toggleMenu() {
      this.menu.collapsed = !this.menu.collapsed;
    },
    /** 打开配置抽屉 */
    openSettingDrawer() {
      this.settingDrawer.visible = true;
    },
    /** 关闭配置抽屉 */
    closeSettingDrawer() {
      this.settingDrawer.visible = false;
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    }
  }
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
