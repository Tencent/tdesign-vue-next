<template>
  <t-space direction="vertical">
    <h3>16px</h3>
    <t-rate v-model="value" size="16px" />
    <h3>24px</h3>
    <t-rate v-model="value" />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value = ref(5);
</script>
