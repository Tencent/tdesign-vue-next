<template>
  <t-rate show-text v-model="value" />
</template>
<script setup>
import { ref } from 'vue';

const value = ref(4);
</script>
