<template>
  <t-space direction="vertical" style="width: 100%">
    <t-space>
      <t-button variant="outline" @click="setEqualSizes">Equal sizes</t-button>
      <t-button variant="outline" @click="setCustomSizes">25% / auto / 180px</t-button>
      <t-button variant="outline" @click="reset">Reset</t-button>
      <t-button variant="text" @click="readSizes">Get sizes</t-button>
    </t-space>

    <div class="split-demo">
      <t-split ref="splitRef" :gap="8">
        <t-split-panel default-size="30%"><div class="split-demo__panel">Panel 1</div></t-split-panel>
        <t-split-panel><div class="split-demo__panel split-demo__panel--secondary">Panel 2</div></t-split-panel>
        <t-split-panel default-size="180"><div class="split-demo__panel">Panel 3</div></t-split-panel>
      </t-split>
    </div>
    <div class="split-demo__status">Current sizes: {{ currentSizes.join(' / ') || '-' }}</div>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SplitInstanceFunctions } from 'tdesign-vue-next';

const splitRef = ref<SplitInstanceFunctions>();
const currentSizes = ref<number[]>([]);

const readSizes = () => {
  currentSizes.value = splitRef.value?.getSizes?.().map((size) => Math.round(size)) || [];
};
const setEqualSizes = () => {
  splitRef.value?.setSizes?.(['33.33%', '33.33%', 'auto']);
  readSizes();
};
const setCustomSizes = () => {
  splitRef.value?.setSizes?.(['25%', 'auto', 180]);
  readSizes();
};
const reset = () => {
  splitRef.value?.reset?.();
  readSizes();
};
</script>

<style scoped>
.split-demo {
  width: 100%;
  height: 280px;
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
