<template>
  <t-space direction="vertical">
    <t-date-range-picker v-model="range" cancel-range-select-limit />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const range = ref(['', '']);
</script>
