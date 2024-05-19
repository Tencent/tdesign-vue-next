<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'tooltip', value: 'tooltip' }];

const usageCodeMap = {
  tooltip:
    '\n        <t-tooltip content="这是Tooltip内容" v-bind="configProps">\n          <t-button>hover me</t-button>\n        </t-tooltip>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #tooltip="{ configProps }">
      <t-tooltip content="这是Tooltip内容" v-bind="configProps">
        <t-button>hover me</t-button>
      </t-tooltip>
    </template>
  </base-usage>
</template>
