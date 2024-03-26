<template>
  <t-space direction="vertical">
    <t-loading :loading="loading" text="加载中..." fullscreen />
    <!-- <t-loading :loading="loading" text="加载中..." attach="body" fullscreen /> -->

    <div>
      全局加载开关（开启加载1秒后自动归位）：
      <t-switch v-model="loading"></t-switch>
    </div>

    <!-- 绑定到任意元素 -->
    <!-- <div id="alice" class="loading-attach-demo__title">Hello, I'm Alice.</div> -->
    <!-- <t-loading :loading="loading" text="加载中..." attach="#alice" fullscreen /> -->
  </t-space>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
const loading = ref(false);
watch(
  () => loading.value,
  (v) => {
    if (!v) return;
    const timer = setTimeout(() => {
      loading.value = false;
      clearTimeout(timer);
    }, 1000);
  },
);
</script>
