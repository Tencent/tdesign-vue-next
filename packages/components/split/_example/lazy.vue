<template>
  <t-space direction="vertical" style="width: 100%">
    <t-switch v-model="lazy">Lazy</t-switch>
    <div class="split-demo">
      <t-split :gap="8" :lazy="lazy" @resize-start="onResizeStart" @resize="onResize" @resize-end="onResizeEnd">
        <t-split-panel><div class="split-demo__panel">Panel 1</div></t-split-panel>
        <t-split-panel><div class="split-demo__panel split-demo__panel--secondary">Panel 2</div></t-split-panel>
      </t-split>
    </div>
    <div class="split-demo__status">{{ status }}：{{ sizes.join(' / ') || '-' }}</div>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const lazy = ref(true);
const status = ref('等待拖拽');
const sizes = ref<number[]>([]);

const updateStatus = (value: number[], text: string) => {
  status.value = text;
  sizes.value = value.map((size) => Math.round(size));
};

const onResizeStart = (value: number[]) => updateStatus(value, '开始拖拽');
const onResize = (value: number[]) => updateStatus(value, '拖拽中');
const onResizeEnd = (value: number[]) => updateStatus(value, '拖拽结束');
</script>

<style scoped>
.split-demo {
  width: 100%;
  height: 260px;
  border: 1px solid var(--td-component-border);
}

.split-demo__panel {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--td-text-color-primary);
  background: var(--td-bg-color-container);
}

.split-demo__panel--secondary {
  background: var(--td-bg-color-secondarycontainer);
}

.split-demo__status {
  color: var(--td-text-color-secondary);
}
</style>
