<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'popconfirm', value: 'popconfirm' }];

const usageCodeMap = {
  popconfirm:
    '\n        <t-popconfirm v-bind="configProps" content="确认删除吗">\n          <t-button>删除</t-button>\n        </t-popconfirm>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #popconfirm="{ configProps }">
      <t-popconfirm v-bind="configProps" content="确认删除吗">
        <t-button>删除</t-button>
      </t-popconfirm>
    </template>
  </base-usage>
</template>
