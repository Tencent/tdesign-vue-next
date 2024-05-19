<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'tabs', value: 'tabs' }];

const usageCodeMap = {
  tabs: '\n        <t-tabs v-bind="configProps" :default-value="1">\n          <t-tab-panel :value="1" label="选项卡1">\n            <p style="margin: 20px">选项卡1内容区</p>\n          </t-tab-panel>\n          <t-tab-panel :value="2" label="选项卡2">\n            <p style="margin: 20px">选项卡2内容区</p>\n          </t-tab-panel>\n          <t-tab-panel :value="3" label="选项卡3">\n            <p style="margin: 20px">选项卡3内容区</p>\n          </t-tab-panel>\n        </t-tabs>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #tabs="{ configProps }">
      <t-tabs v-bind="configProps" :default-value="1">
        <t-tab-panel :value="1" label="选项卡1">
          <p style="margin: 20px">
            选项卡1内容区
          </p>
        </t-tab-panel>
        <t-tab-panel :value="2" label="选项卡2">
          <p style="margin: 20px">
            选项卡2内容区
          </p>
        </t-tab-panel>
        <t-tab-panel :value="3" label="选项卡3">
          <p style="margin: 20px">
            选项卡3内容区
          </p>
        </t-tab-panel>
      </t-tabs>
    </template>
  </base-usage>
</template>
