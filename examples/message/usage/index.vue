<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-message v-bind="configProps" duration="0" content="这里是 Message 信息" :close-btn="true" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-message v-bind="configProps" duration="0" content="这里是 Message 信息" :closeBtn="true" />
</template>
`;
</script>
