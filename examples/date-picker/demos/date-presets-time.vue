<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker :presets="presets" theme="primary" mode="date" range format="YYYY-MM-DD HH:mm:ss" />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const presets = {
  // '今天', // Today
  最近7天: [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')],
  最近3天: [dayjs().subtract(3, 'day'), dayjs().subtract(1, 'day')],
  今天: [dayjs()],
};
</script>
