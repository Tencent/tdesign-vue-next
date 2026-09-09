<template>
  <div v-bind="elementProps">
    <template v-if="elementChildren">{{ elementChildren }}</template>
    <slot v-else />
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

const elementChildren = computed(() => (props.element.props as Record<string, unknown> | undefined)?.children);
const elementProps = computed(() => {
  const { children: _children, ...rest } = (props.element.props || {}) as Record<string, unknown>;
  return rest;
});
</script>
