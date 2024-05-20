<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'selectInput', value: 'selectInput' }];

const usageCodeMap = {
  selectInput:
    '<t-select-input panel="暂无数据" value="" placeholder="请输入" tips="这是 tips 文本信息" v-bind="configProps" />',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #selectInput="{ configProps }">
      <t-select-input panel="暂无数据" value="" placeholder="请输入" tips="这是 tips 文本信息" v-bind="configProps" />
    </template>
  </base-usage>
</template>
