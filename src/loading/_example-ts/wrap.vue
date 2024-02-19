<template>
  <t-space direction="vertical">
    <t-loading size="small" :loading="loading" show-overlay style="width: 170px">
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
    </t-loading>

    <t-space>
      <t-button size="small" @click="loading = true">加载中</t-button>
      <t-button size="small" @click="loading = false">加载完成</t-button>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
