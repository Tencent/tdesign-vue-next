<template>
  <div class="progress-bar">
    <div v-if="label" class="progress-bar__label">{{ label }}</div>
    <div class="progress-bar__content">
      <div class="progress-bar__track">
        <div class="progress-bar__value" :style="{ width: `${percentage}%`, backgroundColor: color }"></div>
      </div>
      <span v-if="showInfo" class="progress-bar__info" :style="{ color }">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ActionBinding, UIElement } from '@json-render/core';

const props = defineProps<{
  element: UIElement;
  children?: unknown;
  onAction?: (action: ActionBinding) => void;
  loading?: boolean;
}>();

const elementProps = computed(() => (props.element.props || {}) as Record<string, unknown>);
const label = computed(() => elementProps.value.label as string | undefined);
const percentage = computed(() => Number(elementProps.value.percentage || 0));
const showInfo = computed(() => elementProps.value.showInfo !== false);
const color = computed(() => (percentage.value < 30 ? '#f5222d' : percentage.value < 70 ? '#faad14' : '#52c41a'));
</script>

<style scoped>
.progress-bar {
  width: 100%;
}

.progress-bar__label {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
}

.progress-bar__content {
  display: flex;
  gap: 12px;
  align-items: center;
}

.progress-bar__track {
  flex: 1;
  height: 20px;
  overflow: hidden;
  background-color: var(--td-bg-color-component);
  border-radius: 10px;
}

.progress-bar__value {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-bar__info {
  min-width: 45px;
  font-size: 14px;
  font-weight: 600;
}
</style>
