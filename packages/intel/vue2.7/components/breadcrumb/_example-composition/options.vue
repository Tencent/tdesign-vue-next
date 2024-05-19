<template>
  <t-breadcrumb :options="options"> </t-breadcrumb>
</template>

<script setup>
import { ref } from 'vue';

const options = ref([
  {
    content: '页面1',
  },
  {
    content: '页面2',
  },
  {
    content: '页面3',
    href: '//tdesign.tencent.com/',
  },
]);
</script>
