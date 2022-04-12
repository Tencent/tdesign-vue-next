<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-select-input panel="暂无数据" tips="这是 tips 文本信息" v-bind="configProps" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-select-input panel="暂无数据" tips="这是 tips 文本信息" v-bind="configProps" />
</template>
`;
</script>
