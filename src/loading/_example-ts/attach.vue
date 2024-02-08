<template>
  <t-space direction="vertical">
    <div id="alice" class="loading-attach-demo__title">Hello, I'm Alice. I'm going to be a front-end developer.</div>
    <t-loading attach="#alice" size="small" :loading="loading"></t-loading>

    <t-switch v-model="loading" :custom-value="[true, false]" :label="['显示', '隐藏']" />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(false);
</script>
<style scoped>
.loading-attach-demo__title {
  /** `position: relative` is required as a parent node */
  position: relative;
  width: 360px;
  text-align: center;
}
</style>
