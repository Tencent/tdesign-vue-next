<template>
  <t-space direction="vertical" :size="8">
    <t-space :size="8" align="center">
      <span class="scrollbar-demo__label">显示形式：</span>
      <t-radio-group v-model="visibility" variant="default-filled">
        <t-radio-button v-for="item in visibilityOptions" :key="item" :value="item">{{ item }}</t-radio-button>
      </t-radio-group>
    </t-space>
    <div class="scrollbar-demo__box">
      <t-scrollbar :visibility="visibility" :container="{ height: 200 }">
        <div v-for="item in 20" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
      </t-scrollbar>
    </div>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ScrollbarProps } from 'tdesign-vue-next';

const visibilityOptions = ['hover', 'always', 'hide'] as const;
const visibility = ref<ScrollbarProps['visibility']>('hover');
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

.scrollbar-demo__label {
  color: var(--td-text-color-primary);
  font-size: 12px;
}
</style>
