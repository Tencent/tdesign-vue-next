<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #split="{ configProps }">
      <div class="split-usage">
        <t-split v-bind="configProps" :gap="8">
          <t-split-panel default-size="35%"><div class="split-usage__panel">Panel 1</div></t-split-panel>
          <t-split-panel><div class="split-usage__panel split-usage__panel--secondary">Panel 2</div></t-split-panel>
        </t-split>
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'Split', value: 'split' }];

const usageCodeMap = {
  split: `
    <div style="width: 600px; height: 280px">
      <t-split v-bind="configProps" :gap="8">
        <t-split-panel default-size="35%">Panel 1</t-split-panel>
        <t-split-panel>Panel 2</t-split-panel>
      </t-split>
    </div>
  `,
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<style scoped>
.split-usage {
  width: 600px;
  max-width: 100%;
  height: 280px;
  border: 1px solid var(--td-component-border);
}

.split-usage__panel {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--td-text-color-primary);
  background: var(--td-bg-color-container);
}

.split-usage__panel--secondary {
  background: var(--td-bg-color-secondarycontainer);
}
</style>
