<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'anchor', value: 'anchor' }];

const usageCodeMap = {
  anchor:
    '\n        <t-anchor v-bind="configProps">\n          <t-anchor-item href="#锚点一" title="基础锚点" />\n          <t-anchor-item href="#锚点二" title="多级锚点" />\n          <t-anchor-item href="#锚点三" title="指定容器锚点" />\n        </t-anchor>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #anchor="{ configProps }">
      <t-anchor v-bind="configProps">
        <t-anchor-item href="#锚点一" title="基础锚点" />
        <t-anchor-item href="#锚点二" title="多级锚点" />
        <t-anchor-item href="#锚点三" title="指定容器锚点" />
      </t-anchor>
    </template>
  </base-usage>
</template>
