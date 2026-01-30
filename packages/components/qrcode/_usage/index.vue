<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #qrcode="{ configProps }">
      <t-qrcode value="https://tdesign.gtimg.com/site/tdesign-logo.png" v-bind="configProps" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'QRCode', value: 'qrcode' }];

const usageCodeMap = {
  qrcode: '<t-qrcode value="https://tdesign.gtimg.com/site/tdesign-logo.png" v-bind="configProps"/>',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}

onMounted(() => {
  console.log();
});
</script>
