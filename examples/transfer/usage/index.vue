<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #transfer="{ configProps }"
      ><t-transfer
        :data="[
          {
            value: 1,
            label: '内容1',
            disabled: false,
          },
          {
            value: 2,
            label: '内容2',
            disabled: true,
          },
          {
            value: 3,
            label: '内容3',
            disabled: false,
          },
        ]"
        v-bind="configProps"
    /></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'transfer', value: 'transfer' }];

const usageCodeMap = {
  transfer:
    "\n        <t-transfer :data=\"[{\n          value: 1,\n          label: '内容1',\n          disabled: false\n        },{\n          value: 2,\n          label: '内容2',\n          disabled: true\n        },{\n          value: 3,\n          label: '内容3',\n          disabled: false\n        },]\" v-bind=\"configProps\" />\n      ",
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
