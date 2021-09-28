<template>
  <div class="demo-slider">
    <div class="vertical-block">
      <t-slider v-model="value1" :layout="layout" :show-tooltip="true"> </t-slider>
    </div>

    <div class="vertical-block">
      <t-slider v-model="value2" :layout="layout" range :show-tooltip="true"> </t-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 12,
      value2: [30, 70],
      layout: 'vertical',
    };
  },
};
</script>
<style>
.vertical-block {
  display: inline-block;
  padding: 30px 24px;
  height: 200px;
}
</style>
