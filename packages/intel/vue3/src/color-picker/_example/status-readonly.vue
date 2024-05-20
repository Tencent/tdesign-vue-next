<template>
  <t-color-picker-panel v-model="color" disabled />
</template>
<script setup>
import { ref } from 'vue';

const color = ref('#0052d9');
</script>
