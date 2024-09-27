<template>
  <t-space direction="vertical">
    <t-date-picker mode="week" clearable allow-input :first-day-of-week="weekStart" />

    <t-date-range-picker mode="week" clearable allow-input :first-day-of-week="weekStart" />
  </t-space>
</template>
<script setup lang="ts">
// 如果配合 firstDayOfWeek API 使用，请使用 dayjs 同步修改 weekStart，否则部分日期选择会用异常
import { ref } from 'vue';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

dayjs.updateLocale('zh-cn', {
  weekStart: 2,
});
const weekStart = ref(2);
</script>
