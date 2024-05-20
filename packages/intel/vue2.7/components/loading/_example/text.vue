<template>
  <t-space :size="100">
    <!-- 使用 props 实现自定义 -->
    <t-loading text="静态文字加载中..." :indicator="false"></t-loading>
    <!-- 使用 props 实现自定义 -->
    <t-loading :text="renderText" :indicator="false"></t-loading>
    <t-loading :indicator="false">
      <!-- 使用插槽实现自定义 -->
     
    </t-loading>
  </t-space>
</template>
<script lang="jsx">
export default {
  name: 'TextLoading',
  methods: {
    renderText() {
      return <span>变量文字加载中...</span>;
    },
  },
};
</script>
