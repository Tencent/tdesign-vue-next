<template>
  <t-space size="large">
    <!-- 使用 props 实现自定义 -->
    <t-loading text="静态文字加载中..." :indicator="false"></t-loading>

    <!-- 使用 props 实现自定义 -->
    <t-loading :text="renderText" :indicator="false"></t-loading>

    <t-loading :indicator="false">
      <!-- 使用插槽实现自定义 -->
      <template #text>插槽文字加载中...</template>
    </t-loading>
  </t-space>
</template>
<script lang="tsx" setup>
import { LoadingProps } from 'tdesign-vue-next';
const renderText: LoadingProps['text'] = () => {
  return <span>变量文字加载中...</span>;
};
</script>
