<template>
  <div class="mt-2">
    当前权限模式：
    <n-button type="link">
      {{ permissionMode === PermissionModeEnum.BACK ? '后台权限模式' : '前端角色权限模式' }}
    </n-button>
    <n-button class="ml-4" @click="togglePermissionMode" type="primary">切换权限模式</n-button>
    <NDivider />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import { PermissionModeEnum } from '/@/enums/appEnum';
import { NDivider } from 'naive-ui';
import { usePermission } from '/@/hooks/web/usePermission';
export default defineComponent({
  name: 'CurrentPermissionMode',
  components: { NDivider },
  setup() {
    const appStore = useAppStore();
    const permissionMode = computed(() => appStore.getProjectConfig.permissionMode);
    const { togglePermissionMode } = usePermission();

    return {
      permissionMode,
      PermissionModeEnum,
      togglePermissionMode
    };
  }
});
</script>
