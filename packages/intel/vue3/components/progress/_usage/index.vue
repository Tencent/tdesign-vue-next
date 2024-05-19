<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'progress', value: 'progress' }];

const usageCodeMap = {
  progress:
    '\n        <div style="width:200px">\n          <t-progress :percentage="50"  v-bind="configProps" />\n        </div>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #progress="{ configProps }">
      <div style="width: 200px">
        <t-progress :percentage="50" v-bind="configProps" />
      </div>
    </template>
  </base-usage>
</template>
