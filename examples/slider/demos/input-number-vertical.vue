<template>
  <div class="demo-slider">
    <div class="number-vertical-block">
      <t-slider v-model="value1" :layout="layout" :show-tooltip="true" :inputNumberProps="inputNumberProps" />
    </div>

    <div class="number-vertical-block">
      <t-slider v-model="value2" :layout="layout" range :show-tooltip="true" :inputNumberProps="inputNumberProps" />
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
      layout: 'vertical',
    };
  },
};
</script>
<style>
.number-vertical-block {
  display: inline-block;
  padding: 30px 24px;
  height: 300px;
}
</style>
