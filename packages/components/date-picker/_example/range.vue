<template>
  <t-space direction="vertical">
    <!-- 受控面板 + 函数范围：仅允许未来 90 天 -->
    <t-date-picker
      v-model="valueFn"
      v-model:panelActiveDate="panelActiveDate"
      mode="date"
      format="YYYY-MM-DD"
      :range="rangeFn"
      :need-confirm="false"
      placeholder="选择未来90天内的日期"
      @panel-active-date="handlePanelActiveDate"
      @change="handleChange"
      @month-change="handleMonthChange"
      @year-change="handleYearChange"
    />

    <!-- 数组范围 + 默认面板日期：仅允许 2026 年 -->
    <t-date-picker
      v-model="valueArr"
      mode="date"
      format="YYYY-MM-DD"
      :range="rangeArr"
      :default-panel-active-date="defaultPanelActiveDate"
      placeholder="仅可选 2026 年内的日期，同时禁用周六"
      :disable-date="disableDate"
      @change="handleChange"
      @month-change="handleMonthChange"
      @year-change="handleYearChange"
    />

    年选择：2019 到 2024：
    <t-date-picker mode="year" clearable :range="['2019', '2024']" />

    月份选择：2022-10 到 2025-01：
    <t-date-picker mode="month" clearable :range="['2022-10', '2025-01']" />

    季度选择：2022-10 到 2025-01：
    <t-date-picker mode="quarter" clearable :range="['2022-10', '2025-01']" />

    周选择：2000-10 到 2025-01：
    <t-date-picker mode="week" clearable :range="['2000-10', '2025-01']" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const disableDate = (date) => dayjs(date).day() === 6;

// 示例1：函数范围 + 受控面板
const valueFn = ref('');
const panelActiveDate = ref({
  year: dayjs().year() - 5,
  month: 10, // 0-11
});

// 仅允许今天到未来 90 天（返回 true 表示可选）
const rangeFn = (d) => {
  const now = dayjs().startOf('day');
  const target = dayjs(d).startOf('day');
  const diff = target.diff(now, 'day');
  return diff >= 0 && diff <= 90;
};

function handlePanelActiveDate(val, ctx) {
  // ctx.trigger: 'year-select' | 'month-select' | 'today' | 'year-arrow-next' | 'year-arrow-previous' | ...
  if (String(ctx?.trigger).includes('year')) {
    panelActiveDate.value.year = typeof val === 'number' ? val : dayjs(val).year();
  }
  if (String(ctx?.trigger).includes('month') || ctx?.trigger === 'today') {
    panelActiveDate.value.month = typeof val === 'number' ? val : dayjs(val).month();
  }
}

// 示例2：数组范围 + 默认面板日期
const valueArr = ref('');
const rangeArr = ['2026-01-01', '2026-11-20'];
const defaultPanelActiveDate = { year: 2026, month: 5 }; // 0-11，5 表示 6 月

function handleChange(value, context) {
  console.log('onChange:', value, context);
}
function handleMonthChange(context) {
  console.log('onMonthChange:', context);
}
function handleYearChange(context) {
  console.log('onYearChange:', context);
}
</script>
