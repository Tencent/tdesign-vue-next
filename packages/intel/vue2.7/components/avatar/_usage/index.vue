<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'avatar', value: 'avatar' }];

const usageCodeMap = { avatar: '<t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" v-bind="configProps" />' };
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #avatar="{ configProps }">
      <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" v-bind="configProps" />
    </template>
  </base-usage>
</template>
