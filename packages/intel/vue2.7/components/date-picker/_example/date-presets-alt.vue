<template>
  <t-space direction="vertical">
    <t-date-range-picker v-model="range1" :presets="presets" />
    <t-date-range-picker v-model="range2" :presets="presets" enable-time-picker />
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      presets: {
        最近7天: [new Date(+new Date() - 86400000 * 6), new Date()],
        最近3天: [new Date(+new Date() - 86400000 * 2), new Date()],
        今天: [new Date(), new Date()],
      },
      range1: ['2022-01-01', '2022-08-08'],
      range2: ['2022-01-01 00:00:00', '2022-08-08 23:59:59'],
    };
  },
};
</script>
