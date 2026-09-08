<template>
  <div class="status-card" :style="{ borderColor: color, backgroundColor: `${color}10` }">
    <div class="status-card__icon" :style="{ color }">{{ icon || icons[status] }}</div>
    <div class="status-card__content">
      <div class="status-card__title" :style="{ marginBottom: description ? '4px' : 0, color }">{{ title }}</div>
      <div v-if="description" class="status-card__description">{{ description }}</div>
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

const colors = {
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  info: '#1890ff',
};
const icons = { success: '✓', warning: '⚠', error: '✗', info: 'ℹ' };
const elementProps = computed(() => (props.element.props || {}) as Record<string, unknown>);
const title = computed(() => elementProps.value.title as string);
const status = computed(() => (elementProps.value.status || 'info') as keyof typeof colors);
const description = computed(() => elementProps.value.description as string | undefined);
const icon = computed(() => elementProps.value.icon as string | undefined);
const color = computed(() => colors[status.value] || colors.info);
</script>

<style scoped>
.status-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border: 2px solid;
  border-radius: 8px;
}

.status-card__icon {
  font-size: 24px;
}

.status-card__content {
  flex: 1;
}

.status-card__title {
  font-size: 16px;
  font-weight: 600;
}

.status-card__description {
  font-size: 14px;
  color: var(--td-text-color-secondary);
}
</style>
