<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #dropdown="{ configProps }"
      ><t-dropdown
        :options="[
          { content: '操作一', value: 1 },
          { content: '操作二', value: 2 },
        ]"
        v-bind="configProps"
      >
        <t-button>更多...</t-button>
      </t-dropdown></template
    >
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'dropdown', value: 'dropdown' }];

const usageCodeMap = {
  dropdown:
    '\n        <t-dropdown :options="[{ content: \'操作一\', value: 1 }, { content: \'操作二\', value: 2 }]" v-bind="configProps">\n          <t-button>更多...</t-button>\n        </t-dropdown>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
