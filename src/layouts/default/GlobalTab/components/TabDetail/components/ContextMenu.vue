<template>
  <n-dropdown
    :show="dropdownVisible"
    :options="options"
    placement="bottom-start"
    :x="x"
    :y="y"
    @clickoutside="hide"
    @select="handleDropdown"
  />
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import type { DropdownOption } from 'naive-ui';
// import { useAppStore } from '/@/store/modules/app';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { iconifyRender } from '/@/utils/icon';
import { RouteLocationNormalized, useRouter } from 'vue-router';
import { MenuEventEnum } from '../types';
import { useTabs } from '/@/hooks/web/useTabs';

interface Props {
  /** 右键菜单可见性 */
  visible?: boolean;
  /** 当前选择的标签路由 */
  tabItem?: RouteLocationNormalized;
  /** 鼠标x坐标 */
  x: number;
  /** 鼠标y坐标 */
  y: number;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  tabItem: undefined
});

const emit = defineEmits<Emits>();

// const app = useAppStore();
const tabStore = useMultipleTabStore();
const { currentRoute } = useRouter();

const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();

const dropdownVisible = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit('update:visible', visible);
  }
});

function hide() {
  dropdownVisible.value = false;
}

/**
 * @description: drop-down list
 */
const options = computed(() => {
  if (!unref(props.tabItem)) {
    return;
  }
  const { meta } = unref(props.tabItem);
  const { path } = unref(currentRoute);

  const isCurItem = props.tabItem.path === path;

  // Refresh button
  const index = tabStore.getTabList.findIndex(tab => tab.path === props.tabItem.path);
  // const selectTabIndex = tabStore.getTabList.findIndex(tab => tab.path === props.tabItem.path);
  const refreshDisabled = !isCurItem;
  // Close left
  const closeLeftDisabled = index === 0 || !isCurItem;

  const disabled = tabStore.getTabList.length === 1;

  // Close right
  const closeRightDisabled =
    !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);
  const dropMenuList: DropdownOption[] = [
    {
      icon: iconifyRender('ion:reload-sharp'),
      key: MenuEventEnum.REFRESH_PAGE,
      label: '重新加载',
      disabled: refreshDisabled
    },
    {
      icon: iconifyRender('clarity:close-line'),
      key: MenuEventEnum.CLOSE_CURRENT,
      label: '关闭标签',
      disabled: !!meta?.affix || disabled,
      divider: true
    },
    {
      icon: iconifyRender('line-md:arrow-close-left'),
      key: MenuEventEnum.CLOSE_LEFT,
      label: '关闭左侧',
      disabled: closeLeftDisabled,
      divider: false
    },
    {
      icon: iconifyRender('line-md:arrow-close-right'),
      key: MenuEventEnum.CLOSE_RIGHT,
      label: '关闭右侧',
      disabled: closeRightDisabled,
      divider: true
    },
    {
      icon: iconifyRender('dashicons:align-center'),
      key: MenuEventEnum.CLOSE_OTHER,
      label: '关闭其他',
      disabled: disabled || !isCurItem
    },
    {
      icon: iconifyRender('clarity:minus-line'),
      key: MenuEventEnum.CLOSE_ALL,
      label: '关闭全部',
      disabled: disabled
    }
  ];

  return dropMenuList;
});

function handleDropdown(_key: string, menu: DropdownOption): void {
  const { key } = menu;
  switch (key) {
    case MenuEventEnum.REFRESH_PAGE:
      // refresh page
      // console.log('标签页右键选择: 刷新');
      refreshPage();
      break;
    // Close current
    case MenuEventEnum.CLOSE_CURRENT:
      close(props.tabItem);
      break;
    // Close left
    case MenuEventEnum.CLOSE_LEFT:
      closeLeft();
      break;
    // Close right
    case MenuEventEnum.CLOSE_RIGHT:
      closeRight();
      break;
    // Close other
    case MenuEventEnum.CLOSE_OTHER:
      closeOther();
      break;
    // Close all
    case MenuEventEnum.CLOSE_ALL:
      closeAll();
      break;
  }
  hide();
}
</script>
<style scoped></style>
