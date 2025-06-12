<template>
  <t-space direction="vertical">
    <h3>使用BreadcrumbItem</h3>
    <t-breadcrumb :max-items="5" :items-before-collapse="2" :items-after-collapse="1">
      <t-breadcrumb-item v-for="item in 8" :key="item"> 页面{{ item }} </t-breadcrumb-item>
    </t-breadcrumb>

    <h3>使用Options</h3>
    <t-breadcrumb :options="options" :max-items="5" :items-before-collapse="3" :items-after-collapse="3" />
  </t-space>
</template>

<script setup>
const options = [
  { content: '页面1' },
  { content: '页面2' },
  { content: '页面3' },
  { content: '页面4' },
  { content: '页面5' },
  { content: '页面6' },
  { content: '页面7 (禁用)', disabled: true },
  { content: '页面8', href: 'https://www.tencent.com' },
];
</script>
