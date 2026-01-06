<template>
  <t-space direction="vertical" :size="24">
    <div>
      <div>week 模式：range = ['2025-03-15','2025-12-01']，默认值 2025-02-20（越界，应为错误态）</div>
      <t-date-picker
        v-model="weekVal"
        mode="week"
        allow-input
        :first-day-of-week="firstDayOfWeek"
        :range="periodRange"
        clearable
        placeholder="选择一周"
      />
    </div>

    <div>
      <div>month 模式：range = ['2025-03-15','2025-12-01']，默认值 2025-02（越界，应为错误态）</div>
      <t-date-picker
        v-model="monthVal"
        mode="month"
        allow-input
        :range="periodRange"
        clearable
        placeholder="选择月份"
      />
    </div>

    <div>
      <div>quarter 模式：range = ['2025-03-15','2025-12-01']，默认值 2024-Q4（越界，应为错误态）</div>
      <t-date-picker
        v-model="quarterVal"
        mode="quarter"
        allow-input
        :range="periodRange"
        clearable
        placeholder="选择季度"
      />
    </div>

    <div>
      <div>year 模式：range = ['2025-03-15','2025-12-01']，默认值 2024（越界，应为错误态）</div>
      <t-date-picker v-model="yearVal" mode="year" allow-input :range="periodRange" clearable placeholder="选择年份" />
    </div>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

// 统一的范围：按月/季/年粒度比较
const periodRange = ['2025-03-15', '2025-12-01'];

// 周起始（与 dayjs 同步使用时可一并设置）
const firstDayOfWeek = 1;

// 设定越界默认值以演示错误态
const weekVal = ref(new Date(2025, 1, 20)); // 2025-02-20，周不与 range 相交 → 错误
const monthVal = ref(new Date(2025, 1, 1)); // 2025-02 → 错误
const quarterVal = ref(new Date(2024, 10, 1)); // 2024-11 → Q4 2024 → 错误
const yearVal = ref(new Date(2024, 0, 1)); // 2024 → 错误
</script>
