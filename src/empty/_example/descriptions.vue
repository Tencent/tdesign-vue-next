<template>
  <t-empty :description="description" :title="title"> </t-empty>
</template>
<script setup>
import { ref } from 'vue';
const title = ref('空状态 Empty');
const description = ref('暂无数据 Description');
</script>
