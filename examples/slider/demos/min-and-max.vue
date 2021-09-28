<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1" :show-tooltip="true" :max="max" :min="min" :marks="marks"></t-slider>
    </div>

    <!-- <div class="block">
      <t-slider v-model="value2" range :show-tooltip="true" :max="max" :min="min" :marks="marks"> </t-slider>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 12,
      value2: [12, 20],
      min: 10,
      max: 30,
      marks: {
        10: 'min:10',
        30: 'max:30',
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
