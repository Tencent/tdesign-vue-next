<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #backTop="{ configProps }"
      ><div style="position: relative; height: 100%; width: 100%">
        <t-list class="container" style="position: relative; height: 100%; overflow-y: scroll">
          <t-list-item v-for="index in 15" :key="index">列表内容{{ index }}</t-list-item>
        </t-list>
        <t-back-top
          container=".container"
          v-bind="configProps"
          :visible-height="0"
          :offset="[20, 0]"
          style="position: absolute; right: 20px; bottom: 0"
        ></t-back-top></div
    ></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'backTop', value: 'backTop' }];

const usageCodeMap = {
  backTop:
    '\n        <div style="position: relative; height: 100%; width: 100%">\n          <t-list class="container" style="position: relative; height: 100%; overflow-y: scroll">\n            <t-list-item v-for="index in 15" :key="index">列表内容{{ index }}</t-list-item>\n          </t-list>\n          <t-back-top\n            container=".container"\n            v-bind="configProps"\n            :visible-height="0"\n            :offset="[20, 0]"\n            style="position: absolute; right: 20px; bottom: 0"\n          ></t-back-top>\n        </div>\n    ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
