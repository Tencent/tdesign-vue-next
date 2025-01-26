<template>
  <t-space direction="vertical" class="slider-demo-container">
    <t-slider v-model="value1" :show-tooltip="true" :marks="marks1" @change-end="onChangeEnd" />

    <t-slider v-model="value2" range :show-tooltip="true" :marks="marks2" />

    <t-slider v-model="value3" :show-tooltip="true" :marks="[10, 20, 40, 80]" />
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { SliderProps } from 'tdesign-vue-next';
const value1 = ref(12);
const value2 = ref([30, 70]);
const value3 = ref(10);
const onChangeEnd: SliderProps['onChangeEnd'] = (value) => {
  console.log('change end value', value);
};
const marks1: SliderProps['marks'] = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: <span style="color: #0052d9">80°C</span>,
  100: <span style="color: #0052d9">100°C</span>,
};
const marks2: SliderProps['marks'] = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: <span style="color: #0052d9">80°C</span>,
  100: '100°C',
};
</script>
<style>
.slider-demo-container {
  padding: 30px 24px;
}
</style>
