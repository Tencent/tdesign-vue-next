<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'space', value: 'space' }];

const usageCodeMap = {
  space:
    '\n        <t-space v-bind="configProps">\n          <t-button>Button</t-button>\n          <t-button>Button</t-button>\n          <t-button>Button</t-button>\n          <t-button>Button</t-button>\n        </t-space>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #space="{ configProps }">
      <t-space v-bind="configProps">
        <t-button>Button</t-button>
        <t-button>Button</t-button>
        <t-button>Button</t-button>
        <t-button>Button</t-button>
      </t-space>
    </template>
  </base-usage>
</template>
