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
const renderCode = `<t-anchor __pointerProps__>
  <t-anchor-item href="#锚点一" title="基础锚点" />
  <t-anchor-item href="#锚点二" title="多级锚点" />
  <t-anchor-item href="#锚点三" title="指定容器锚点" />
</t-anchor>`;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
