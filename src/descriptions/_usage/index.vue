<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #descriptions="{ configProps }"
      ><t-descriptions title="Shipping address" v-bind="configProps">
        <t-descriptions-item label="Name">TDesign</t-descriptions-item>
        <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
        <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
        <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
      </t-descriptions></template
    >
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'descriptions', value: 'descriptions' }];

const usageCodeMap = {
  descriptions:
    '\n        <t-descriptions title="Shipping address" v-bind="configProps">\n          <t-descriptions-item label="Name">TDesign</t-descriptions-item>\n          <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>\n          <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>\n          <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>\n        </t-descriptions>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
