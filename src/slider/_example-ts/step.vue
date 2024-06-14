<template>
  <t-space class="slider-demo-container" direction="vertical">
    <t-slider v-model="value1" :show-tooltip="true" :step="step" />

    <t-slider v-model="value2" range :show-tooltip="true" :step="step" />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SliderProps } from 'tdesign-vue-next';
const value1 = ref(12);
const value2 = ref([30, 70]);
const step: SliderProps['step'] = 4;
</script>
<style>
.slider-demo-container {
  padding: 30px 24px;
}
</style>
