<template>
  <div class="tdesign-demo-block-column">
    <t-date-range-picker v-model="range1" :presets="presets" />
    <t-date-range-picker v-model="range2" :presets="presets" enable-time-picker />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const presets = ref({
  最近7天: [dayjs().subtract(6, 'day'), dayjs()],
  最近3天: [dayjs().subtract(2, 'day'), dayjs()],
  今天: [dayjs(), dayjs()],
});

const range1 = ref(['2022-01-01', '2022-08-08']);
const range2 = ref(['2022-01-01 11:11:11', '2022-08-08 12:12:12']);
</script>
