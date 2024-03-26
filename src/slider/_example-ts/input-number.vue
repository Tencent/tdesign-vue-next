<template>
  <t-space direction="vertical" class="slider-demo-container">
    <div class="block">
      <t-slider v-model="value1" :show-tooltip="true" :input-number-props="inputNumberProps" />
    </div>
    <div class="block">
      <t-slider v-model="value2" range :show-tooltip="true" :input-number-props="inputNumberProps" />
    </div>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SliderProps } from 'tdesign-vue-next';
const value1 = ref(12);
const value2 = ref([30, 70]);
const inputNumberProps: SliderProps['inputNumberProps'] = {
  theme: 'column',
};
</script>
<style>
.slider-demo-container {
  padding: 30px 24px;
}
</style>
