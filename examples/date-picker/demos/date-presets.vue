<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker :presets="presets" theme="primary" mode="date" range />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const presets = {
  // '今天', // Today
  今天: dayjs(),
};
</script>
