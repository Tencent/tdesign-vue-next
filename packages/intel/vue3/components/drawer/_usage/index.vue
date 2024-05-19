<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const visible = ref(false);
function handleClick() {
  visible.value = true;
}

const configList = ref(configJson);
const panelList = [{ label: 'drawer', value: 'drawer' }];

const usageCodeMap = {
  drawer:
    '\n        <div>\n          <t-button @click="handleClick">Open Drawer</t-button>\n          <t-drawer v-bind="configProps" v-model:visible="visible" header="header">\n            <p>This is a Drawer</p>\n          </t-drawer>\n        </div>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #drawer="{ configProps }">
      <div>
        <t-button @click="handleClick">
          Open Drawer
        </t-button>
        <t-drawer v-bind="configProps" v-model:visible="visible" header="header">
          <p>This is a Drawer</p>
        </t-drawer>
      </div>
    </template>
  </base-usage>
</template>
