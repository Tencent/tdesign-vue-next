<template>
  <t-space direction="vertical">
    <t-switch v-model="loading" size="large" />
    <t-statistic title="Downloads" :value="123456" :loading="loading" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
