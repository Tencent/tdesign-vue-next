<template>
  <t-color-picker-panel v-model="color" disabled />
</template>
<script setup lang="ts">
import { ref } from 'vue';

const color = ref('#0052d9');
</script>
