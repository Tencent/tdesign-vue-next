<template>
  <div class="demo-slider">
    <div class="vertical-marks-block">
      <t-slider v-model="value1" @change="change" :layout="layout" vertical :show-tooltip="true" :marks="marks1"> </t-slider>
    </div>

    <div class="vertical-marks-block">
      <t-slider v-model="value2" :layout="layout" vertical range :show-tooltip="true" :marks="marks2"> </t-slider>
    </div>
  </div>
</template>
<script lang='jsx'>
export default {
  data() {
    return {
      value1: 12,
      value2: [30, 70],
      layout: 'vertical',
      marks1: {
        0: '0°C',
        12: '12°C',
        37: '37°C',
        60: <button style="#1989FA">60°C</button>,
      },
      marks2: {
        0: '0°C',
        8: '8°C',
        37: '37°C',
        50: <strong style="color: #1989FA">50°C</strong>,
        70: '70°C',
      },
    };
  },
  methods: {
    change(value) {
      console.log('change value', value);
    },
  },
};
</script>
<style>
.vertical-marks-block {
  display: inline-block;
  padding: 30px 70px;
  height: 300px;
}
</style>
