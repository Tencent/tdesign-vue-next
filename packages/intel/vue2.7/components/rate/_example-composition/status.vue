<template>
  <t-space direction="vertical">
    <h3>未评分状态</h3>
    <t-rate />
    <h3>满分状态</h3>
    <t-rate v-model="value1" />
    <h3>半星状态</h3>
    <t-rate v-model="value2" allow-half />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(5);
const value2 = ref(4.5);
</script>
