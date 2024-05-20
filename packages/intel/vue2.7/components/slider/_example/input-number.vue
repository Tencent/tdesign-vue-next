<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" :show-tooltip="true" :inputNumberProps="inputNumberProps" :step="0.1" />
    <t-slider v-model="value2" range :show-tooltip="true" :inputNumberProps="inputNumberProps" />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      value1: 12,
      value2: [30, 70],
      inputNumberProps: { theme: 'column', autoWidth: true },
    };
  },
};
</script>
