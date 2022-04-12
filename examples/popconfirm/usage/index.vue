<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-popconfirm v-bind="configProps" content="确认删除吗">
        <t-button>删除</t-button>
      </t-popconfirm>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-popconfirm v-bind="configProps" content="确认删除吗">
            <t-button>删除</t-button>
        </t-popconfirm>
</template>
`;
</script>
