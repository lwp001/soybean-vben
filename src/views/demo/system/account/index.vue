<template>
  <div class="p-4">
    账户管理
    <n-button v-auth="'red'">新增</n-button>
    <n-button v-auth="'system:account:edit'">修改</n-button>
    <n-button>删除</n-button>
  </div>
</template>
<script lang="ts" setup></script>
