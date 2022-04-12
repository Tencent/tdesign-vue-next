<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-select v-bind="configProps">
        <t-option key="apple" label="Apple" value="apple" />
        <t-option key="orange" value="orange">Orange</t-option>
        <t-option key="banana" label="Banana" value="banana" />
      </t-select>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-select v-bind="configProps">
            <t-option key="apple" label="Apple" value="apple" />
            <t-option key="orange" value="orange">Orange</t-option>
            <t-option key="banana" label="Banana" value="banana" />
          </t-select>
</template>
`;
</script>
