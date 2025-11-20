<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #colorPicker="{ configProps }">
      <t-color-picker v-bind="configProps" :default-value="defaultColor" />
    </template>
    <template #colorPickerPanel="{ configProps }">
      <t-color-picker-panel v-bind="configProps" :default-value="defaultColor" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref } from 'vue';
import colorPickerConfigJson from './props.json';
import colorPickerPanelConfigJson from './panel-props.json';

const configList = ref(colorPickerConfigJson);
const panelList = [
  { label: 'colorPicker', value: 'colorPicker', config: colorPickerConfigJson },
  { label: 'colorPickerPanel', value: 'colorPickerPanel', config: colorPickerPanelConfigJson },
];
const defaultColor = ref('rgb(0, 82, 217)');

const usageCodeMap = {
  colorPicker: '<t-color-picker v-bind="configProps" />',
  colorPickerPanel: '<t-color-picker-panel v-bind="configProps" />',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  configList.value = panelList.find((item) => item.value === panel).config;
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
