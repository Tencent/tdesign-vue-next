<template>
  <div>
    <t-input-number v-model="value" :min="0" :autoWidth="true"></t-input-number>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3);
</script>
