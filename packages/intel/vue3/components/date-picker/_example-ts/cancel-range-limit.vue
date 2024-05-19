<template>
  <t-space direction="vertical">
    <t-date-range-picker v-model="range" cancel-range-select-limit />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const range = ref(['', '']);
</script>
