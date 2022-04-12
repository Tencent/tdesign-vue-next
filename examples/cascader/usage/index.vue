<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-cascader
        :options="[
          {
            label: '选项一',
            value: '1',
            children: [
              { label: '子选项一', value: '1.1' },
              { label: '子选项二', value: '1.2' },
            ],
          },
          {
            label: '选项二',
            value: '2',
            children: [
              { label: '子选项一', value: '2.1' },
              { label: '子选项二', value: '2.2' },
            ],
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
  <t-cascader
  :options="[
    {
      label: '选项一',
      value: '1',
      children: [
        { label: '子选项一', value: '1.1' },
        { label: '子选项二', value: '1.2' },
      ],
    },
    {
      label: '选项二',
      value: '2',
      children: [
        { label: '子选项一', value: '2.1' },
        { label: '子选项二', value: '2.2' },
      ],
    },
  ]"
  v-bind="configProps"
/>
</template>
`;
</script>
