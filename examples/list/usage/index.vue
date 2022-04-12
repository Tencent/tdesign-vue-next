<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <t-list v-bind="configProps">
        <t-list-item>
          <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
        </t-list-item>
      </t-list>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <t-list v-bind="configProps">
    <t-list-item>
    <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
  </t-list-item>
  <t-list-item>
    <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
  </t-list-item>
  <t-list-item>
    <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
  </t-list-item>
</t-list>
</template>
`;
</script>
