<template>
  <t-config-provider :global-config="globalConfig">
    <div>使用<code>t-config-provider</code>包裹业务功能的最外层组件，点击下方图标查看示例代码</div>
    <br />
    <div>English: <code>import enConfig from 'tdesign-vue-next/es/locale/en_US';</code></div>
    <br />
    <div>中文：<code>import zhConfig from 'tdesign-vue-next/es/locale/zh_CN';</code></div>
  </t-config-provider>
</template>

<script lang="ts" setup>
import { merge } from 'lodash-es';
import enConfig from 'tdesign-vue-next/es/locale/en_US';

// 全局特性配置，引入英文语言配置包 enConfig
import { GlobalConfigProvider } from 'tdesign-vue-next';
const empty: GlobalConfigProvider = {};
const customConfig: GlobalConfigProvider = {
  // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
  calendar: {},
  table: {},
  pagination: {},
};
const globalConfig: GlobalConfigProvider = merge(empty, enConfig, customConfig);
</script>
