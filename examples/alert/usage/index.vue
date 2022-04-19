<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @PanelChange="onPanelChange">
    <template #alert="{ configProps }"><t-alert message="这是一条信息" v-bind="configProps" /></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue/dist/vue.esm-bundler.js';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'alert', value: 'alert' }];

const usageCodeMap = { alert: '<t-alert message="这是一条信息" v-bind="configProps" />' };
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
