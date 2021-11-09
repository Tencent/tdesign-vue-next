<template>
  <div class="demo-slider">
    <div class="block">
      <t-slider v-model="value1" disabled :show-tooltip="true" :inputNumberProps="false"> </t-slider>
    </div>

    <div class="block">
      <t-slider v-model="value2" disabled range :show-tooltip="true" :inputNumberProps="false"> </t-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 12,
      value2: [30, 70],
      inputNumberProps: { theme: 'column' },
    };
  },
};
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
