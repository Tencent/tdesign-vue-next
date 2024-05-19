<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'skeleton', value: 'skeleton' }];

const usageCodeMap = {
  skeleton:
    '\n        <t-skeleton v-bind="configProps">\n          <div class="t-skeleton-demo-paragraph">\n            <p>\n              骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。\n              一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。\n            </p>\n          </div>\n        </t-skeleton>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #skeleton="{ configProps }">
      <t-skeleton v-bind="configProps">
        <div class="t-skeleton-demo-paragraph">
          <p>
            骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
            一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。
          </p>
        </div>
      </t-skeleton>
    </template>
  </base-usage>
</template>
