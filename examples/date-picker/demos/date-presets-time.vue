<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker :presets="presets" theme="primary" mode="date" range format="YYYY-MM-DD HH:mm:ss" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const presets = {
      // '今天', // Today
      最近7天: [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')],
      最近3天: [dayjs().subtract(3, 'day'), dayjs().subtract(1, 'day')],
      今天: [dayjs()],
    };
    return {
      presets,
    };
  },
});
</script>
