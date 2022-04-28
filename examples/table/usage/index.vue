<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @PanelChange="onPanelChange">
    <template #baseTable="{ configProps }"
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
    <template #primaryTable="{ configProps }"
      ><div>
        <t-button @click="visible = true">列配置</t-button>
        <t-table
          v-bind="configProps"
          v-model:columnControllerVisible="visible"
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
        /></div
    ></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import baseConfigJson from './base-table-props.json';

import primaryConfigJson from './primary-table-props.json';
const visible = ref(false);
const handleClick = () => {
  visible.value = !visible.value;
};

const configList = ref(baseConfigJson);
const panelList = [
  { label: 'baseTable', value: 'baseTable', config: baseConfigJson },
  { label: 'primaryTable', value: 'primaryTable', config: primaryConfigJson },
];

const usageCodeMap = {
  baseTable:
    "<t-table\n        v-bind=\"configProps\"\n        row-key=\"index\"\n        :data=\"[{index:1,platform:'公用'},{index:2,platform:'私有'}]\"\n        :columns=\"[{\n          align: 'center',\n          width: '100',\n          colKey: 'index',\n          title: '序号',\n        },\n        {\n          width: 100,\n          colKey: 'platform',\n          title: '平台',\n        }]\"\n      />",
  primaryTable:
    "\n        <div>\n          <t-button @click=\"visible = true\">列配置</t-button>\n          <t-table\n            v-bind=\"configProps\"\n            row-key=\"index\"\n            v-model:columnControllerVisible=\"visible\"\n            :data=\"[{index:1,platform:'公用'},{index:2,platform:'私有'}]\"\n            :columns=\"[{\n              align: 'center',\n              width: '100',\n              colKey: 'index',\n              title: '序号',\n            },\n            {\n              width: 100,\n              colKey: 'platform',\n              title: '平台',\n            }]\"\n          />\n        </div>\n      ",
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  configList.value = panelList.find((item) => item.value === panel).config;
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
