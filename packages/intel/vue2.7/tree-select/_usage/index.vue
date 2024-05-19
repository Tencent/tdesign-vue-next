<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage.js 中调整 -->
<script setup lang="jsx">
import { onMounted, ref } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'treeSelect', value: 'treeSelect' }];

const usageCodeMap = {
  treeSelect:
    '\n        <t-tree-select v-bind="configProps"\n          :data="[{\n              label: \'广东省\',\n              value: \'guangdong\',\n              children: [{\n                label: \'广州市\',\n                value: \'guangzhou\',\n              }, {\n                label: \'深圳市\',\n                value: \'shenzhen\',\n              }],\n            }, {\n              label: \'江苏省\',\n              value: \'jiangsu\',\n              children: [{\n                label: \'南京市\',\n                value: \'nanjing\',\n              }, {\n                label: \'苏州市\',\n                value: \'suzhou\',\n              }],\n            }]"\n        placeholder="请选择"\n        />\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>

<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #treeSelect="{ configProps }">
      <t-tree-select
        v-bind="configProps"
        :data="[
          {
            label: '广东省',
            value: 'guangdong',
            children: [
              {
                label: '广州市',
                value: 'guangzhou',
              },
              {
                label: '深圳市',
                value: 'shenzhen',
              },
            ],
          },
          {
            label: '江苏省',
            value: 'jiangsu',
            children: [
              {
                label: '南京市',
                value: 'nanjing',
              },
              {
                label: '苏州市',
                value: 'suzhou',
              },
            ],
          },
        ]"
        placeholder="请选择"
      />
    </template>
  </base-usage>
</template>
