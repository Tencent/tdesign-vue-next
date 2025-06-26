<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #alert="{ configProps }">
      <t-alert v-if="visible" message="这是一条信息" v-bind="configProps" @close="visible = false" />

      <t-button v-if="!visible" size="small" theme="default" variant="outline" @click="showAlert">
        显示 Alert
      </t-button>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'alert', value: 'alert' }];

const usageCodeMap = { alert: '<t-alert message="这是一条信息" v-bind="configProps" />' };
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}

const visible = ref(true);
function showAlert() {
  visible.value = true;
}
</script>
