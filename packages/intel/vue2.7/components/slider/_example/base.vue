<template>
  <t-space direction="vertical" size="60px">
    <t-slider v-model="value1" @changeEnd="handleChangeEnd" />
    <t-slider v-model="value2" range :tooltipProps="tooltipProps" :label="renderLabel" />
  </t-space>
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
  methods: {
    renderLabel(h, { value, position }) {
      console.log(`the position is ${position}`);
      return `${value}`;
    },
    handleChangeEnd(endValue) {
      console.log('the change end value is:', endValue);
    },
  },
};
</script>
