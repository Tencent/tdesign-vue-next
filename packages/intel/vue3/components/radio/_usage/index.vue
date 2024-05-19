<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'radio', value: 'radio' }];

const usageCodeMap = { radio: '<t-radio v-bind="configProps">单选框</t-radio>' };
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #radio="{ configProps }">
      <t-radio v-bind="configProps">
        单选框
      </t-radio>
    </template>
  </base-usage>
</template>
