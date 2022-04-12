<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-popup content="这是一个弹出框" v-bind="configProps">
        <t-button>按钮</t-button>
      </t-popup>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-popup content="这是一个弹出框" v-bind="configProps">
  <t-button>按钮</t-button>
</t-popup>
</template>
`;
</script>
