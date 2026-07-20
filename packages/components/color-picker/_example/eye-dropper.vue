<template>
  <t-space direction="vertical">
    <t-color-picker v-model="color" eye-dropper format="HEX" />
    <t-color-picker-panel v-model="panelColor" :eye-dropper="{ mode: 'fallback' }" format="HEX" />
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const color = ref('#0052d9');
const panelColor = ref('#00a870');
</script>
