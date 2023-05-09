<template>
  <t-breadcrumb :options="options" />
</template>

<script setup lang="tsx">
const options = [{ content: '页面1' }, { content: '页面2' }, { content: '页面3', href: 'https://www.tencent.com' }];
</script>
