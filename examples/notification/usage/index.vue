<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @PanelChange="onPanelChange">
    <template #notification="{ configProps }"
      ><t-notification v-bind="configProps" duration="0" title="标题名称" content="这是一条消息通知" :close-btn="true"
    /></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'notification', value: 'notification' }];

const usageCodeMap = {
  notification:
    '<t-notification v-bind="configProps" duration="0" title="标题名称" content="这是一条消息通知" :closeBtn="true" />',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
