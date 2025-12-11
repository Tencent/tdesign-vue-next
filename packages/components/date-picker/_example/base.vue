<template>
  <t-space direction="vertical">
    <div>
      <p v-if="eventLog" style="color: #0052d9; margin-bottom: 8px">{{ eventLog }}</p>
      <t-date-picker
        v-model="date2"
        @change="handleChange"
        @month-change="handleMonthChange"
        @year-change="handleYearChange"
      />
    </div>
    <t-date-picker
      v-model="date"
      placeholder="可清除、可输入的日期选择器"
      clearable
      allow-input
      @change="handleChange"
      @month-change="handleMonthChange"
      @year-change="handleYearChange"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const date = ref('');
const date2 = ref('');
const eventLog = ref('');

function handleChange(value, context) {
  console.log('onChange:', value, context);
  console.log('timestamp:', context.dayjsValue.valueOf());
  console.log('YYYYMMDD:', context.dayjsValue.format('YYYYMMDD'));
  eventLog.value = `onChange: ${value}`;
}

function handleMonthChange(context) {
  console.log('onMonthChange:', context);
  eventLog.value = `月份切换: ${context.month}月 (触发方式: ${context.trigger})`;
}

function handleYearChange(context) {
  console.log('onYearChange:', context);
  eventLog.value = `年份切换: ${context.year}年 (触发方式: ${context.trigger})`;
}
</script>
