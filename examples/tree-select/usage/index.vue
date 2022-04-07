<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="renderCode" :config-list="configList">
    <template #default="data">
      <component :is="renderComp(data)" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';

import configList from './props.json';
const renderCode = `
        <t-treeSelect data="{[{
            label: '广东省',
            value: 'guangdong',
            children: [{
              label: '广州市',
              value: 'guangzhou',
            }, {
              label: '深圳市',
              value: 'shenzhen',
            }],
          }, {
            label: '江苏省',
            value: 'jiangsu',
            children: [{
              label: '南京市',
              value: 'nanjing',
            }, {
              label: '苏州市',
              value: 'suzhou',
            }],
          }]}"
         __pointerProps__ />`;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
