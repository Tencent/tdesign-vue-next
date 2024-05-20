<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'popup', value: 'popup' }];

const usageCodeMap = {
  popup:
    '\n        <t-popup content="这是一个弹出框" v-bind="configProps">\n          <t-button>按钮</t-button>\n        </t-popup>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #popup="{ configProps }">
      <t-popup content="这是一个弹出框" v-bind="configProps">
        <t-button>按钮</t-button>
      </t-popup>
    </template>
  </base-usage>
</template>
