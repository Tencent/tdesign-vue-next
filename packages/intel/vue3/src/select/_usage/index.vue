<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'select', value: 'select' }];

const usageCodeMap = {
  select:
    '\n        <t-select v-bind="configProps">\n          <t-option key="apple" label="Apple" value="apple" />\n          <t-option key="orange" label="Orange" value="orange">OrangeContentSlot</t-option>\n          <t-option key="banana" label="Banana" value="banana" />\n        </t-select>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #select="{ configProps }">
      <t-select v-bind="configProps">
        <t-option key="apple" label="Apple" value="apple" />
        <t-option key="orange" label="Orange" value="orange">
          OrangeContentSlot
        </t-option>
        <t-option key="banana" label="Banana" value="banana" />
      </t-select>
    </template>
  </base-usage>
</template>
