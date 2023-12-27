<template>
  <t-space direction="vertical" class="slider-demo-container">
    <t-slider v-model="value1" @change-end="onChangeEnd" />

    <t-slider v-model="value2" range @change-end="onChangeEnd" />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
const onChangeEnd = (value) => {
  console.log('change end value', value);
};
</script>
<style>
.slider-demo-container {
  padding: 30px 24px;
}
</style>
