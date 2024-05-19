<template>
  <t-rate v-model="value" :count="7" />
</template>
<script setup>
import { ref } from 'vue';

const value = ref(3);
</script>
