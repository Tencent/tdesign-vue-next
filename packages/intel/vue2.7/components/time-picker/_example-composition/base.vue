<template>
  <t-space direction="vertical">
    <t-time-picker v-model="time1"> </t-time-picker>
    <t-time-picker v-model="time2"> </t-time-picker>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const time1 = ref('20:22');
const time2 = ref('21:22');
</script>
