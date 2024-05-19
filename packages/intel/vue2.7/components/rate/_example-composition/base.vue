<template>
  <t-rate :default-value="value" />
</template>
<script setup>
import { ref } from 'vue';

const value = ref(3);
</script>
