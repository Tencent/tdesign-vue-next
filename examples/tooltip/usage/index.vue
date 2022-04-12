<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-tooltip content="这是Tooltip内容" v-bind="configProps">
        <t-button>hover me</t-button>
      </t-tooltip>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-tooltip content="这是Tooltip内容" v-bind="configProps">
            <t-button>hover me</t-button>
          </t-tooltip>
</template>
`;
</script>
