<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'notification', value: 'notification' }];

const usageCodeMap = {
  notification: '<t-notification v-bind="configProps" title="标题名称" content="这是一条消息通知" />',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #notification="{ configProps }">
      <t-notification v-bind="configProps" title="标题名称" content="这是一条消息通知" />
    </template>
  </base-usage>
</template>
