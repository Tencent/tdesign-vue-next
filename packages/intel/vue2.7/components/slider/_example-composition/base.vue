<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" @changeEnd="handleChangeEnd" />
    <t-slider v-model="value2" range :tooltipProps="tooltipProps" :label="renderLabel" />
  </t-space>
</template>
<script setup>
import { ref, reactive } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);
const tooltipProps = reactive({});
const renderLabel = (h, { value, position }) => {
  console.log(`the position is ${position}`);
  return `${value}`;
};
const handleChangeEnd = (endValue) => {
  console.log('the change end value is:', endValue);
};
</script>
