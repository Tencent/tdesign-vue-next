<template>
  <t-space>
    <div class="vertical-marks-block">
      <t-slider
        v-model="value1"
        :layout="layout"
        vertical
        :show-tooltip="true"
        :marks="marks1"
        :input-number-props="false"
        @change="change"
      />
    </div>

    <div class="vertical-marks-block">
      <t-slider
        v-model="value2"
        :layout="layout"
        vertical
        range
        :show-tooltip="true"
        :marks="marks2"
        :input-number-props="false"
      />
    </div>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { SliderProps } from 'tdesign-vue-next';
const value1 = ref(12);
const value2 = ref([30, 70]);
const layout: SliderProps['layout'] = 'vertical';
const marks1: SliderProps['marks'] = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  // @ts-ignore
  80: <span style="color: #0052d9">80°C</span>,
  // @ts-ignore
  100: <span style="color: #0052d9">100°C</span>,
};
const marks2: SliderProps['marks'] = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  // @ts-ignore
  80: <span style="color: #0052d9">80°C</span>,
  // @ts-ignore
  100: <span style="color: #0052d9">100°C</span>,
};
const change: SliderProps['onChange'] = (value) => {
  console.log('change value', value);
};
</script>
<style>
.vertical-marks-block {
  display: inline-block;
  padding: 30px 70px;
  height: 300px;
}
</style>
