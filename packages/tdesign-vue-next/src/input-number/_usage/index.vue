<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #inputNumber="{ configProps }"><t-input-number v-bind="configProps" /></template>
  </base-usage>
</template>

<script setup lang="jsx">

import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'inputNumber', value: 'inputNumber' }];

const usageCodeMap = { inputNumber: '<t-input-number v-bind="configProps"/>' };
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
