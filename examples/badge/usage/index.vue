<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #badge="{ configProps }"
      ><t-badge count="100" v-bind="configProps">
        <t-button>按钮</t-button>
      </t-badge></template
    >
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'badge', value: 'badge' }];

const usageCodeMap = {
  badge:
    '\n        <t-badge count="100" v-bind="configProps">\n          <t-button>按钮</t-button>\n        </t-badge>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
