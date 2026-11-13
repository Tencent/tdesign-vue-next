<template>
  <t-space direction="vertical" :size="8">
    <t-space :size="8" align="center">
      <span class="scrollbar-demo__label">自适应尺寸：</span>
      <t-switch v-model="autoresize" />
    </t-space>
    <t-space :size="8" align="center">
      <span class="scrollbar-demo__label">内容条数：</span>
      <t-slider v-model="count" :min="1" :max="24" :step="1" :label="false" class="scrollbar-demo__slider" />
      <span class="scrollbar-demo__value">{{ count }}</span>
    </t-space>
    <div class="scrollbar-demo__box">
      <t-scrollbar :autoresize="autoresize" :container="{ maxHeight: 240 }">
        <div v-for="item in count" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
      </t-scrollbar>
    </div>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const autoresize = ref(true);
const count = ref(4);
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
  width: 84px;
  color: var(--td-text-color-primary);
  font-size: 12px;
}

.scrollbar-demo__value {
  width: 32px;
  color: var(--td-text-color-primary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.scrollbar-demo__slider {
  width: 200px;
}
</style>
