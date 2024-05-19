<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #list="{ configProps }"
      ><t-list v-bind="configProps">
        <t-list-item>
          <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
        </t-list-item> </t-list
    ></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'list', value: 'list' }];

const usageCodeMap = {
  list: '\n        <t-list v-bind="configProps">\n          <t-list-item>\n            <t-list-item-meta title="列表主内容" description="列表内容列表内容" />\n          </t-list-item>\n          <t-list-item>\n            <t-list-item-meta title="列表主内容" description="列表内容列表内容" />\n          </t-list-item>\n          <t-list-item>\n            <t-list-item-meta title="列表主内容" description="列表内容列表内容" />\n          </t-list-item>\n        </t-list>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
