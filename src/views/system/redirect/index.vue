<template>
  <div></div>
</template>
<script lang="ts" setup>
import { unref } from 'vue';
import { useRouter } from 'vue-router';

const { currentRoute, replace } = useRouter();

const { params, query } = unref(currentRoute);
const { path, redirectType = 'path' } = params;

Reflect.deleteProperty(params, 'redirectType');
Reflect.deleteProperty(params, 'path');

const tmpPath = Array.isArray(path) ? path.join('/') : path;

if (redirectType === 'name') {
  replace({
    name: tmpPath,
    query,
    params
  });
} else {
  replace({
    path: tmpPath.startsWith('/') ? tmpPath : `/${tmpPath}`,
    query
  });
}
</script>
