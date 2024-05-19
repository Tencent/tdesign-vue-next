<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'image', value: 'image' }];

const usageCodeMap = {
  image:
    '\n        <t-image v-bind="configProps" src="https://tdesign.gtimg.com/demo/demo-image-1.png" fit="cover" :style="{ width: \'120px\', height: \'120px\' }" />\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #image="{ configProps }">
      <t-image
        v-bind="configProps"
        src="https://tdesign.gtimg.com/demo/demo-image-1.png"
        fit="cover"
        :style="{ width: '120px', height: '120px' }"
      />
    </template>
  </base-usage>
</template>
