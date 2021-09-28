<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1"> </t-slider>
    </div>

    <div class="block">
      <t-slider v-model="value2" range :tooltipProps="{}"> </t-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 12,
      value2: [30, 70],
      tooltipProps: {},
    };
  },
};
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
