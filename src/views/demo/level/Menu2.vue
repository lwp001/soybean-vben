<template>
  <div class="p-5">
    多层级缓存-页面2
    <br />
    <NInput />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { NInput } from 'naive-ui';
export default defineComponent({
  name: 'Menu2Demo',
  components: { NInput }
});
</script>
