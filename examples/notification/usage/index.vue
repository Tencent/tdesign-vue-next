<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-notification v-bind="configProps" duration="0" title="标题名称" content="这是一条消息通知" :close-btn="true" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-notification v-bind="configProps" duration="0" title="标题名称" content="这是一条消息通知" :closeBtn="true" />
</template>
`;
</script>
