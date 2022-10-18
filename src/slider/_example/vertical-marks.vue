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
<script setup lang="jsx">
import { ref } from 'vue';

const value1 = ref(12);
const value2 = ref([30, 70]);

const layout = 'vertical';
const marks1 = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: <span style="color: #0052d9">80°C</span>,
  100: <span style="color: #0052d9">100°C</span>,
};
const marks2 = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: <span style="color: #0052d9">80°C</span>,
  100: <span style="color: #0052d9">100°C</span>,
};
const change = (value) => {
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
