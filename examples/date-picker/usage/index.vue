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
const renderCode = `<t-date-picker __pointerProps__ />`;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
