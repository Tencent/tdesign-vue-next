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
          <t-list __pointerProps__>
              <t-cell><span>列表内容列表内容列表内容1</span></t-cell>
              <t-cell><span>列表内容列表内容列表内容2</span></t-cell>
              <t-cell><span>列表内容列表内容列表内容2</span></t-cell>
          </t-list>
        )`;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
