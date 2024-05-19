<template>
  <t-space>
    <t-loading :loading="loading" text="加载中..." fullscreen />
    <div>
      全局加载开关（开启加载1秒后自动归位）：
      <t-switch v-model="loading"></t-switch>
    </div>
  </t-space>
</template>
<script setup>
import { ref, watch } from 'vue';

const loading = ref(false);
watch(loading, (v) => {
  if (v) {
    const timer = setTimeout(() => {
      loading.value = false;
      clearTimeout(timer);
    }, 1000);
  }
});
</script>
