<template>
  <t-space direction="vertical" :size="8">
    <t-space :size="8" align="center">
      <span class="scrollbar-demo__label">横向滚动步长：</span>
      <t-slider v-model="step.x" :min="0" :max="400" :step="20" :label="false" class="scrollbar-demo__slider" />
      <span class="scrollbar-demo__value">{{ step.x }}px</span>
    </t-space>
    <t-space :size="8" align="center">
      <span class="scrollbar-demo__label">纵向滚动步长：</span>
      <t-slider v-model="step.y" :min="0" :max="400" :step="20" :label="false" class="scrollbar-demo__slider" />
      <span class="scrollbar-demo__value">{{ step.y }}px</span>
    </t-space>
    <div class="scrollbar-demo__box">
      <t-scrollbar :container="{ height: 200 }" :step="step" tabindex="0">
        <div v-for="item in 20" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
      </t-scrollbar>
    </div>
  </t-space>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const step = reactive({ x: 100, y: 80 });
</script>

<style scoped>
.scrollbar-demo__box {
  width: 420px;
  border: 1px solid var(--td-component-stroke);
  border-radius: var(--td-radius-medium);
  overflow: hidden;
}

.scrollbar-demo__item {
  width: 560px;
  padding: 12px 24px 12px 16px;
  border-bottom: 1px solid var(--td-component-stroke);
  color: var(--td-text-color-primary);
}

.scrollbar-demo__item:last-child {
  border-bottom: none;
}

.scrollbar-demo__label {
  width: 84px;
  color: var(--td-text-color-primary);
  font-size: 12px;
}

.scrollbar-demo__value {
  width: 44px;
  color: var(--td-text-color-primary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.scrollbar-demo__slider {
  width: 220px;
}

.scrollbar-demo__box :deep(.t-scrollbar__wrap:focus) {
  outline: none;
}
</style>
