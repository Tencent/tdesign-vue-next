<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #timePicker="{ configProps }"><t-time-picker v-bind="configProps" /></template>
    <template #timeRangePicker="{ configProps }"><t-time-range-picker v-bind="configProps" /></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import timePickerConfigJson from './time-picker-props.json';

import timeRangePickerConfigJson from './time-range-picker-props.json';

const configList = ref(timePickerConfigJson);
const panelList = [
  { label: 'timePicker', value: 'timePicker', config: timePickerConfigJson },
  { label: 'timeRangePicker', value: 'timeRangePicker', config: timeRangePickerConfigJson },
];

const usageCodeMap = {
  timePicker: '<t-time-picker v-bind="configProps" />',
  timeRangePicker: '<t-time-range-picker v-bind="configProps" />',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  configList.value = panelList.find((item) => item.value === panel).config;
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
