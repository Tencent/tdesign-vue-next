<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #scrollbar="{ configProps }"
      ><t-scrollbar v-bind="configProps" :container="{ height: 240 }" class="scrollbar-usage">
        <div v-for="item in 20" :key="item" class="scrollbar-usage__item">内容项 {{ item }}</div>
      </t-scrollbar></template
    >
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'scrollbar', value: 'scrollbar' }];

const usageCodeMap = {
  scrollbar:
    '\n        <t-scrollbar v-bind="configProps" :container="{ height: 240 }" class="scrollbar-usage">\n          <div v-for="item in 20" :key="item" class="scrollbar-usage__item">内容项 {{ item }}</div>\n        </t-scrollbar>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}

onMounted(() => {
  console.log();
});
</script>

<style scoped>
.scrollbar-usage {
  width: 320px;
  border: 1px solid var(--td-component-stroke);
  border-radius: var(--td-radius-medium);
  overflow: hidden;
}

.scrollbar-usage__item {
  padding: 12px 24px 12px 16px;
  border-bottom: 1px solid var(--td-component-stroke);
  color: var(--td-text-color-primary);
}

.scrollbar-usage__item:last-child {
  border-bottom: none;
}
</style>
