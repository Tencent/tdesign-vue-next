<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" :show-tooltip="true" :step="step" />
    <t-slider v-model="value2" range :show-tooltip="true" :step="step" />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      value1: 12,
      value2: [28, 80],
      step: 4,
    };
  },
};
</script>
<style>
.block {
  padding: 30px 24px;
}
</style>
