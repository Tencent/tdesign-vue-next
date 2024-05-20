<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'divider', value: 'divider' }];

const usageCodeMap = {
  divider:
    '\n        <div :style="{ width: \'200px\' }">\n          <span>正直</span>\n          <t-divider v-bind="configProps">TDesign</t-divider>\n          <span>进取</span>\n          <t-divider v-bind="configProps">TDesign</t-divider>\n          <span>合作</span>\n          <t-divider v-bind="configProps">TDesign</t-divider>\n          <span>创新</span>\n        </div>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #divider="{ configProps }">
      <div :style="{ width: '200px' }">
        <span>正直</span>
        <t-divider v-bind="configProps">
          TDesign
        </t-divider>
        <span>进取</span>
        <t-divider v-bind="configProps">
          TDesign
        </t-divider>
        <span>合作</span>
        <t-divider v-bind="configProps">
          TDesign
        </t-divider>
        <span>创新</span>
      </div>
    </template>
  </base-usage>
</template>
