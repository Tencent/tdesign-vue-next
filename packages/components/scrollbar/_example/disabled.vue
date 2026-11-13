<template>
  <t-space direction="vertical" :size="8">
    <t-button @click="disabled = !disabled">{{ disabled ? '恢复滚动' : '禁止滚动' }}</t-button>
    <div class="scrollbar-demo__box">
      <t-scrollbar :disabled="disabled" :container="{ height: 200 }">
        <div v-for="item in 20" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
      </t-scrollbar>
    </div>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(false);
</script>

<style scoped>
.scrollbar-demo__box {
  width: 420px;
  border: 1px solid var(--td-component-stroke);
  border-radius: var(--td-radius-medium);
  overflow: hidden;
}

.scrollbar-demo__item {
  padding: 12px 24px 12px 16px;
  border-bottom: 1px solid var(--td-component-stroke);
  color: var(--td-text-color-primary);
}

.scrollbar-demo__item:last-child {
  border-bottom: none;
}
</style>
