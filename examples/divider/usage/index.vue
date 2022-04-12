<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <div :style="{ width: '200px' }">
        <span>正直</span>
        <t-divider v-bind="configProps">TDesign</t-divider>
        <span>进取</span>
        <t-divider v-bind="configProps">TDesign</t-divider>
        <span>合作</span>
        <t-divider v-bind="configProps">TDesign</t-divider>
        <span>创新</span>
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <div :style="{ width: '200px' }">
    <span>正直</span>
    <t-divider v-bind="configProps">TDesign</t-divider>
    <span>进取</span>
    <t-divider v-bind="configProps">TDesign</t-divider>
    <span>合作</span>
    <t-divider v-bind="configProps">TDesign</t-divider>
    <span>创新</span>
  </div>
</template>
`;
</script>
