<template>
  <t-config-provider :global-config="globalConfig">
    <t-space direction="vertical">
      <p>使用<code>t-config-provider</code>包裹业务功能的最外层组件，点击下方图标查看示例代码</p>
      <p>英文语言包引入路径：<code>import enConfig from 'tdesign-vue/es/locale/en_US';</code></p>
      <p>中文语言包引入路径：<code>import zhConfig from 'tdesign-vue/es/locale/zh_CN';</code></p>
      <p>日文语言包引入路径：<code>import jpConfig from 'tdesign-vue/es/locale/ja_JP';</code></p>
      <p>韩文语言包引入路径：<code>import koConfig from 'tdesign-vue/es/locale/ko_KR';</code></p>
    </t-space>
  </t-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { merge } from 'lodash-es';
import enConfig from 'tdesign-vue/es/locale/en_US';
// 全局特性配置，引入英文语言配置包 enConfig
const globalConfig = ref(
  merge(enConfig, {
    // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
    calendar: {},
    table: {},
    pagination: {},
  }),
);
</script>
