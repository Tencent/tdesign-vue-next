<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const data = ref([
  { label: '第一段', children: [{ label: '第二段' }, { label: '第二段' }] },
  {
    label: '第一段',
    children: [{ label: '第二段' }, { label: '第二段' }],
  },
  {
    label: '第一段',
    children: [{ label: '第二段' }, { label: '第二段' }],
  },
]);

const configList = ref(configJson);
const panelList = [{ label: 'tree', value: 'tree' }];

const usageCodeMap = { tree: '\n        <t-tree :data="data" v-bind="configProps" />\n      ' };
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #tree="{ configProps }">
      <t-tree :data="data" v-bind="configProps" />
    </template>
  </base-usage>
</template>
