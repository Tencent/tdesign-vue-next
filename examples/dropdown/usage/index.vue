<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-dropdown
        :options="[
          { content: '操作一', value: 1 },
          { content: '操作二', value: 2 },
        ]"
        v-bind="configProps"
      >
        <t-button>更多...</t-button>
      </t-dropdown>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-dropdown
  :options="[
    { content: '操作一', value: 1 },
    { content: '操作二', value: 2 },
  ]"
  v-bind="configProps"
>
    <t-button>更多...</t-button>
  </t-dropdown>
</template>
`;
</script>
