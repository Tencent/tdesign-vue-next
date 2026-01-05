<template>
  <t-space direction="vertical">
    <t-date-picker
      v-model="date2"
      @change="handleChange"
      @month-change="handleMonthChange"
      @year-change="handleYearChange"
    />

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

function handleChange(value, context) {
  console.log('onChange:', value, context);
  console.log('timestamp:', context.dayjsValue.valueOf());
  console.log('YYYYMMDD:', context.dayjsValue.format('YYYYMMDD'));
}

function handleMonthChange(context) {
  console.log('onMonthChange:', context);
}

function handleYearChange(context) {
  console.log('onYearChange:', context);
}
</script>
