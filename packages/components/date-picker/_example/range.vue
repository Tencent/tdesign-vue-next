<template>
  <t-space direction="vertical">
    <!-- 未来 90 天 -->
    <t-date-picker mode="date" format="YYYY-MM-DD" :range="rangeFn" :need-confirm="false" placeholder="未来 90 天" />
    <t-date-range-picker
      mode="date"
      format="YYYY-MM-DD"
      :range="rangeFn"
      :need-confirm="false"
      placeholder="未来 90 天"
    />

    <!-- 2026 年内（周六禁用） -->
    <t-date-picker
      mode="date"
      format="YYYY-MM-DD"
      :range="['2026-01-01', '2026-12-31']"
      placeholder="2026 年内（周六禁用）"
      :disable-date="disableSaturday"
    />
    <t-date-range-picker
      mode="date"
      format="YYYY-MM-DD"
      :range="['2026-01-01', '2026-12-31']"
      placeholder="2026 年内（周六禁用）"
      :disable-date="disableSaturday"
    />

    <!-- 2026开始，不限制结束 -->
    <t-date-picker mode="date" format="YYYY-MM-DD" :range="['2026-01-01', null]" placeholder="2026开始，不限制结束" />
    <t-date-range-picker
      mode="date"
      format="YYYY-MM-DD"
      :range="['2026-01-01', null]"
      placeholder="2026开始，不限制结束"
    />

    <!-- 左右面板分别进行范围限制 -->
    <t-date-range-picker
      mode="date"
      format="YYYY-MM-DD"
      :range="[
        ['2026-01-01', '2026-02-01'],
        ['2026-12-20', '2026-12-30'],
      ]"
      :placeholder="['2026-01-01 至 2026-02-01', '2026-12-20 至 2026-12-30']"
    />
    <t-date-range-picker
      mode="date"
      format="YYYY-MM-DD"
      :range="[startFn, endFn]"
      :placeholder="['2026-01-01 至 2026-02-01', '2026-12-20 至 2026-12-30']"
    />

    <t-divider style="margin: 16px 0" />

    <!-- 不同模式 -->
    <t-space>
      <t-date-picker mode="year" clearable :range="['2019', '2024']" placeholder="2019年 至 2024 年" />
      <t-date-range-picker mode="year" clearable :range="['2019', '2024']" placeholder="2019年 至 2024 年" />
    </t-space>

    <t-space>
      <t-date-picker mode="month" clearable :range="['2022-10', '2025-01']" placeholder="2022-10 至 2025-01" />
      <t-date-range-picker mode="month" clearable :range="['2022-10', '2025-01']" placeholder="2022-10 至 2025-01" />
    </t-space>

    <t-space>
      <t-date-picker mode="quarter" clearable :range="['2022-10', '2025-01']" placeholder="2022Q4 至 2025Q1" />
      <t-date-range-picker mode="quarter" clearable :range="['2022-10', '2025-01']" placeholder="2022Q4 至 2025Q1" />
    </t-space>

    <t-space>
      <t-date-picker mode="week" clearable :range="['2022-10', '2025-01']" placeholder="2022 39周 至 2025 1周" />
      <t-date-range-picker mode="week" clearable :range="['2022-10', '2025-01']" placeholder="2022 39周 至 2025 1周" />
    </t-space>
  </t-space>
</template>

<script setup>
import dayjs from 'dayjs';

const disableSaturday = (date) => dayjs(date).day() === 6;

// 仅允许今天到未来 90 天（返回 true 表示可选）
const rangeFn = (d) => {
  const now = dayjs().startOf('day');
  const target = dayjs(d).startOf('day');
  const diff = target.diff(now, 'day');
  return diff >= 0 && diff <= 90;
};

// 开始面板，一个月内
const startFn = (d) => {
  const now = dayjs().startOf('day');
  const target = dayjs(d).startOf('day');
  const diff = target.diff(now, 'day');
  return diff >= 0 && diff <= 30;
};

// 结束面板，间隔一个月，一个月后
const endFn = (d) => {
  const now = dayjs().startOf('day').add(30, 'day');
  const target = dayjs(d).startOf('day');
  const diff = target.diff(now, 'day');
  return diff >= 0 && diff <= 30;
};
</script>
