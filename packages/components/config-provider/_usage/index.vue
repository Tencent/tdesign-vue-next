<template>
  <base-usage :code="renderCode" :config-list="configList">
    <template #default="data">
      <component :is="renderComp(data)" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const renderCode = '<t-button>确定</t-button>';

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
