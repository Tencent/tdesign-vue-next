<template>
  <div class="status-card" :style="{ borderColor: color, backgroundColor }">
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

const colorSchemes = {
  success: { color: 'var(--td-success-color)', backgroundColor: 'var(--td-success-color-light)' },
  warning: { color: 'var(--td-warning-color)', backgroundColor: 'var(--td-warning-color-light)' },
  error: { color: 'var(--td-error-color)', backgroundColor: 'var(--td-error-color-light)' },
  info: { color: 'var(--td-brand-color)', backgroundColor: 'var(--td-brand-color-light)' },
};
const icons = { success: '✓', warning: '⚠', error: '✗', info: 'ℹ' };
const elementProps = computed(() => (props.element.props || {}) as Record<string, unknown>);
const title = computed(() => elementProps.value.title as string);
const status = computed(() => (elementProps.value.status || 'info') as keyof typeof colorSchemes);
const description = computed(() => elementProps.value.description as string | undefined);
const icon = computed(() => elementProps.value.icon as string | undefined);
const colorScheme = computed(() => colorSchemes[status.value] || colorSchemes.info);
const color = computed(() => colorScheme.value.color);
const backgroundColor = computed(() => colorScheme.value.backgroundColor);
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
