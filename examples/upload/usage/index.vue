<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-upload
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        v-bind="configProps"
      />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-upload action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" v-bind="configProps" />
</template>
`;
</script>
