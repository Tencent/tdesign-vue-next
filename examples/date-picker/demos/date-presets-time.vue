<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker
      v-bind:presets="presets"
      theme="primary"
      mode="date"
      range
      format="YYYY-MM-DD HH:mm:ss"
    ></t-date-picker>
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
        快捷标签3: dayjs().subtract(3, 'day'),
        快捷标签7: dayjs().subtract(7, 'day'),
      },
    };
  },
};
</script>
