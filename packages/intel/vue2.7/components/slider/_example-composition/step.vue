<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" :show-tooltip="true" :step="step" />
    <t-slider v-model="value2" range :show-tooltip="true" :step="step" />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([28, 80]);
const step = ref(4);
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
