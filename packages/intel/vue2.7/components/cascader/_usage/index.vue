<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'cascader', value: 'cascader' }];

const usageCodeMap = {
  cascader:
    '\n        <t-cascader :options="[\n          {\n            label: \'选项一\',\n            value: \'1\',\n            children: [\n              { label: \'子选项一\', value: \'1.1\' },\n              { label: \'子选项二\', value: \'1.2\' },\n            ],\n          },\n          {\n            label: \'选项二\',\n            value: \'2\',\n            children: [\n              { label: \'子选项一\', value: \'2.1\' },\n              { label: \'子选项二\', value: \'2.2\' },\n            ],\n          },\n        ]" v-bind="configProps" />\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #cascader="{ configProps }">
      <t-cascader
        :options="[
          {
            label: '选项一',
            value: '1',
            children: [
              { label: '子选项一', value: '1.1' },
              { label: '子选项二', value: '1.2' },
            ],
          },
          {
            label: '选项二',
            value: '2',
            children: [
              { label: '子选项一', value: '2.1' },
              { label: '子选项二', value: '2.2' },
            ],
          },
        ]"
        v-bind="configProps"
      />
    </template>
  </base-usage>
</template>
