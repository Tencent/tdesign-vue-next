<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @PanelChange="onPanelChange">
    <template #table="{ configProps }"
      ><t-table
        v-bind="configProps"
        row-key="index"
        :data="[
          { index: 1, platform: '公用' },
          { index: 2, platform: '私有' },
        ]"
        :columns="[
          {
            align: 'center',
            width: '100',
            colKey: 'index',
            title: '序号',
          },
          {
            width: 100,
            colKey: 'platform',
            title: '平台',
          },
        ]"
    /></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue/dist/vue.esm-bundler.js';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'table', value: 'table' }];

const usageCodeMap = {
  table:
    "<t-table\n        v-bind=\"configProps\"\n        row-key=\"index\"\n        :data=\"[{index:1,platform:'公用'},{index:2,platform:'私有'}]\"\n        :columns=\"[{\n          align: 'center',\n          width: '100',\n          colKey: 'index',\n          title: '序号',\n        },\n        {\n          width: 100,\n          colKey: 'platform',\n          title: '平台',\n        }]\"\n      />",
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
