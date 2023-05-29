<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #image="{ configProps }"
      ><t-image
        v-bind="configProps"
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        :style="{ width: '120px', height: '120px' }"
    /></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'image', value: 'image' }];

const usageCodeMap = {
  image:
    '\n        <t-image\n          v-bind="configProps"\n          src="https://tdesign.gtimg.com/demo/demo-image-1.png"\n          :style="{ width: \'120px\', height: \'120px\' }"\n        />\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
