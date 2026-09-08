<template>
  <div
    class="nested-panel"
    :style="{
      marginLeft: `${(level - 1) * 16}px`,
      borderColor: panelBorder,
      backgroundColor: panelBackground,
    }"
  >
    <div
      class="nested-panel__header"
      :style="{ fontSize: `${Math.max(16 - level * 2, 12)}px`, backgroundColor: panelBorder }"
    >
      <span class="nested-panel__level">L{{ level }}</span>
      <span>{{ title }}</span>
      <span v-if="collapsed" class="nested-panel__collapsed">（已折叠）</span>
    </div>
    <div v-if="!collapsed" class="nested-panel__content">
      <slot />
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

const levelColors = [
  { border: '#1890ff', background: '#e6f7ff' },
  { border: '#52c41a', background: '#f6ffed' },
  { border: '#faad14', background: '#fffbe6' },
  { border: '#f5222d', background: '#fff2f0' },
];
const elementProps = computed(() => (props.element.props || {}) as Record<string, unknown>);
const title = computed(() => elementProps.value.title as string);
const level = computed(() => Number(elementProps.value.level || 1));
const collapsed = computed(() => Boolean(elementProps.value.collapsed));
const colorScheme = computed(() => levelColors[(level.value - 1) % levelColors.length]);
const panelBorder = computed(() => (elementProps.value.borderColor as string) || colorScheme.value.border);
const panelBackground = computed(() => (elementProps.value.backgroundColor as string) || colorScheme.value.background);
</script>

<style scoped>
.nested-panel {
  margin-top: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  border: 2px solid;
  border-radius: 8px;
}

.nested-panel__header {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;
  font-weight: 600;
  color: #fff;
}

.nested-panel__level {
  opacity: 0.8;
}

.nested-panel__collapsed {
  font-size: 12px;
  opacity: 0.7;
}

.nested-panel__content {
  padding: 12px;
}
</style>
