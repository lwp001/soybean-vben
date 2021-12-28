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

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';
// import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { RouteLocationNormalized } from 'vue-router';
import { useBoolean } from '@/hooks';
// import { ROUTE_HOME } from '@/router';
import { iconifyRender } from '@/utils';
import { useTabs } from '@/hooks/web/useTabs';
import { useMultipleTabStore } from '@/store/modules/multipleTab';

interface Props {
  /** 右键菜单可见性 */
  visible?: boolean;
  /** 当前是否是路由首页 */
  isRouteHome?: boolean;
  /** 当前路由 */
  route: RouteLocationNormalized;
  /** 鼠标x坐标 */
  x: number;
  /** 鼠标y坐标 */
  y: number;
  /** 是否是当前激活的选项右键 */
  isCurItem: boolean;
}

type DropdownKey = 'reload-current' | 'close-current' | 'close-other' | 'close-left' | 'close-right' | 'close-all';
type Option = DropdownOption & {
  key: DropdownKey;
};

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isRouteHome: false,
  route: undefined,
  isCurItem: false
});

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
}>();
const tabStore = useMultipleTabStore();
// const { removeMultiTab, clearMultiTab, clearLeftMultiTab, clearRightMultiTab } = useMultipleTabStore();
const { bool: dropdownVisible, setTrue: show, setFalse: hide } = useBoolean(props.visible);
const disabled = tabStore.getTabList.length === 1;
// Close right
// const closeRightDisabled =
//   !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);

// const isCurItem = curItem ? curItem.path === path : false;
const options = computed<Option[]>(() => [
  {
    label: '重新加载',
    key: 'reload-current',
    disabled: !props.isCurItem,
    icon: iconifyRender('ant-design:reload-outlined')
  },
  {
    label: '关闭',
    key: 'close-current',
    disabled: !!props.route?.meta?.affix || disabled,
    icon: iconifyRender('ant-design:close-outlined')
  },
  {
    label: '关闭其他',
    key: 'close-other',
    icon: iconifyRender('ant-design:column-width-outlined')
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    icon: iconifyRender('mdi:format-horizontal-align-left')
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    // disabled: !props.isCurItem,
    icon: iconifyRender('mdi:format-horizontal-align-right')
  }
]);
const { refreshPage, close, closeLeft, closeOther, closeRight } = useTabs();
const actionMap = new Map<DropdownKey, () => void>([
  [
    'reload-current',
    () => {
      refreshPage();
    }
  ],
  [
    'close-current',
    () => {
      close(props.route);
    }
  ],
  [
    'close-other',
    () => {
      closeOther();
    }
  ],
  [
    'close-left',
    () => {
      closeLeft();
    }
  ],
  [
    'close-right',
    () => {
      closeRight();
    }
  ]
]);

async function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  const actionFunc = actionMap.get(key);
  if (actionFunc) {
    await actionFunc();
  }
  hide();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      show();
    } else {
      hide();
    }
  }
);
watch(dropdownVisible, newValue => {
  emit('update:visible', newValue);
});
</script>
<style scoped></style>
