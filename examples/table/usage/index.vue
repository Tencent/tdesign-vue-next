<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-table
        v-bind="configProps"
        row-key="index"
        :data="[
          { index: 1, platform: '公用' },
          { index: 2, platform: '私有' },
        ]"
        :columns="[
          {
            align: 'center',
            width: '100',
            colKey: 'index',
            title: '序号',
          },
          {
            width: 100,
            colKey: 'platform',
            title: '平台',
          },
        ]"
      />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-table
  v-bind="configProps"
  row-key="index"
  :data="[
    { index: 1, platform: '公用' },
    { index: 2, platform: '私有' },
  ]"
  :columns="[
    {
      align: 'center',
      width: '100',
      colKey: 'index',
      title: '序号',
    },
    {
      width: 100,
      colKey: 'platform',
      title: '平台',
    },
  ]"
/>
</template>
`;
</script>
