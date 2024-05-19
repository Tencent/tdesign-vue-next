<template>
  <t-space break-line>
    <t-switch size="large" v-model="checked"></t-switch>
    <t-switch size="medium"></t-switch>
    <t-switch size="small"></t-switch>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>
