<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #radio="{ configProps }"><t-radio v-bind="configProps">单选框</t-radio></template>
    <template #radioGroup="{ configProps }">
      <t-radio-group v-bind="configProps" :options="radioOptions" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import radioConfigJson from './radio-props.json';
import radioGroupConfigJson from './radio-group-props.json';

const configList = ref(radioConfigJson);
const panelList = [
  { label: 'radio', value: 'radio', config: radioConfigJson },
  { label: 'radioGroup', value: 'radioGroup', config: radioGroupConfigJson },
];
const radioOptions = ['选项一', '选项二', '选项三', '选项四'];

const usageCodeMap = {
  radio: '<t-radio v-bind="configProps">单选框</t-radio>',
  radioGroup: '<t-radio-group v-bind="configProps" :options="radioOptions" />',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  configList.value = panelList.find((item) => item.value === panel).config;
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
