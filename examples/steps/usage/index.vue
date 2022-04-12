<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-steps :current="1" v-bind="configProps">
        <t-step-item title="步骤1" content="提示文字" />
        <t-step-item title="步骤2" content="提示文字" />
        <t-step-item title="步骤3" content="提示文字" />
      </t-steps>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-steps :current="1" v-bind="configProps">
    <t-step-item title="步骤1" content="提示文字" />
    <t-step-item title="步骤2" content="提示文字" />
    <t-step-item title="步骤3" content="提示文字" />
  </t-steps>
</template>
`;
</script>
