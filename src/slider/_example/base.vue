<template>
  <t-space direction="vertical" class="slider-demo-container">
    <t-slider v-model="value1" />

    <t-slider v-model="value2" range />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
</script>
<style>
.slider-demo-container {
  padding: 30px 24px;
}
</style>
