<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'checkbox', value: 'checkbox' }];

const usageCodeMap = { checkbox: '<t-checkbox v-bind="configProps">基础多选框</t-checkbox>' };
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #checkbox="{ configProps }">
      <t-checkbox v-bind="configProps">
        基础多选框
      </t-checkbox>
    </template>
  </base-usage>
</template>
