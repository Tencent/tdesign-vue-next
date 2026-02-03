<template>
  <t-space direction="vertical">
    <!-- 未来 90 天 -->
    <t-date-picker :range="rangeFn" placeholder="未来 90 天" />
    <t-date-range-picker :range="rangeFn" placeholder="未来 90 天" />

    <t-date-picker
      :range="['2000-01-01', '2010-12-31']"
      :panel-active-date="{ year: 2005, month: 10 }"
      placeholder="2000-2010之间的日期"
    />
    <t-date-range-picker
      :range="['2000-01-01', '2010-12-31']"
      :panel-active-date="{ year: 2005, month: 10 }"
      placeholder="2000-2010之间的日期"
    />

    <!-- 2026开始，不限制结束 -->
    <t-date-picker :range="['2026-01-01', null]" placeholder="2026开始，不限制结束" />
    <t-date-range-picker :range="['2026-01-01', null]" placeholder="2026开始，不限制结束" />

    <!-- 2026开始，不限制结束 -->
    <t-date-picker :range="['2026-01-01', null]" placeholder="2026开始，不限制结束" />
    <t-date-range-picker :range="['2026-01-01', null]" placeholder="2026开始，不限制结束" />
  </t-space>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

// 仅允许今天到未来 90 天（返回 true 表示可选）
const rangeFn = (d: Date) => {
  const now = dayjs().startOf('day');
  const target = dayjs(d).startOf('day');
  const diff = target.diff(now, 'day');
  return diff >= 0 && diff <= 90;
};
</script>
