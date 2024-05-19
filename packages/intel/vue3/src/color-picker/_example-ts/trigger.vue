<template>
  <t-color-picker v-model="color" :show-primary-color-preview="false" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#0052d9');
</script>
