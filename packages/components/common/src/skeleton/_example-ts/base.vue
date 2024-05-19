<template>
  <t-space direction="vertical">
    <t-switch v-model="loading" class="mb-20"></t-switch>

    <t-skeleton :loading="loading">
      <div class="t-skeleton-demo-paragraph">
        <p>
          骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
          一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。
        </p>
      </div>
    </t-skeleton>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
const loading = ref(true);
</script>

<style scoped>
.mb-20 {
  margin-bottom: 20px;
}
.t-skeleton-demo-paragraph {
  line-height: 25px;
}
</style>
