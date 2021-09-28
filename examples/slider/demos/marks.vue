<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1" :show-tooltip="true" :marks="marks1"> </t-slider>
    </div>

    <div class="block">
      <t-slider v-model="value2" range :show-tooltip="true" :marks="marks2"> </t-slider>
    </div>
  </div>
</template>
<script lang='jsx'>
export default {
  data() {
    return {
      value1: 12,
      value2: [30, 70],
      marks1: {
        0: '0°C',
        12: '12°C',
        20: '20°C',
        37: '37°C',
        50: <strong style="color: #1989FA">50°C</strong>,
        60: <button style="color: #1989FA">60°C</button>,
      },
      marks2: {
        0: '0°C',
        8: '8°C',
        30: '30°C',
        37: '37°C',
        50: <strong style="color: #1989FA">50°C</strong>,
        70: '70°C',
      },
    };
  },
};
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
