<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" disabled :show-tooltip="true" />
    <t-slider v-model="value2" disabled range :show-tooltip="true" />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
