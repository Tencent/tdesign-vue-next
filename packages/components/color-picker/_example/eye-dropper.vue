<template>
  <t-color-picker v-model="color" :eye-dropper="true" default-value="#0052d9" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('#0052d9');
</script>
