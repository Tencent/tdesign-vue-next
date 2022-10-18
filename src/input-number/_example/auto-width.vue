<template>
  <t-input-number v-model="value" auto-width theme="row" :min="-2" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3);
</script>
