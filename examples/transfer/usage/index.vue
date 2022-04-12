<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-transfer
        :data="[
          {
            value: 1,
            label: '内容1',
            disabled: false,
          },
          {
            value: 2,
            label: '内容2',
            disabled: true,
          },
          {
            value: 3,
            label: '内容3',
            disabled: false,
          },
        ]"
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
  <t-transfer
  :data="[
    {
      value: 1,
      label: '内容1',
      disabled: false,
    },
    {
      value: 2,
      label: '内容2',
      disabled: true,
    },
    {
      value: 3,
      label: '内容3',
      disabled: false,
    },
  ]"
  v-bind="configProps"
/>
</template>
`;
</script>
