<template>
  <t-space break-line>
    <t-switch size="large" v-model="checked1"></t-switch>
    <t-switch size="large" loading v-model="checked2"></t-switch>
    <t-switch size="large" disabled></t-switch>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(true);
</script>
