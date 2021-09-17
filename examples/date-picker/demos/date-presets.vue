<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker v-bind:presets="presets" theme="primary" mode="date" range></t-date-picker>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      presets: {
        // '今天', // Today
        今天: dayjs(),
      },
    };
  },
};
</script>
