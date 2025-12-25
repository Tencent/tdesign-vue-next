<template>
  <t-space direction="vertical">
    <div>
      <p v-if="eventLog" style="color: #0052d9; margin-bottom: 8px">{{ eventLog }}</p>
      <t-date-range-picker
        allow-input
        clearable
        format="YYYY-MM-DD HH:mm:ss"
        :default-time="['00:00:00', '22:22:22']"
        @pick="onPick"
        @change="onChange"
        @month-change="onMonthChange"
        @year-change="onYearChange"
      />
    </div>
    <t-date-range-picker
      enable-time-picker
      allow-input
      clearable
      @pick="onPick"
      @change="onChange"
      @month-change="onMonthChange"
      @year-change="onYearChange"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const eventLog = ref('');

const onPick = (value, context) => console.log('onPick:', value, context);

const onChange = (value, context) => {
  console.log('onChange:', value, context);
  console.log(
    'timestamp:',
    context.dayjsValue.map((d) => d.valueOf()),
  );
  console.log(
    'YYYYMMDD:',
    context.dayjsValue.map((d) => d.format('YYYYMMDD')),
  );
  eventLog.value = `onChange: ${value}`;
};

const onMonthChange = (context) => {
  console.log('onMonthChange:', context);
  eventLog.value = `月份切换: ${context.month}月 (触发方式: ${context.trigger}, 面板: ${context.partial})`;
};

const onYearChange = (context) => {
  console.log('onYearChange:', context);
  eventLog.value = `年份切换: ${context.year}年 (触发方式: ${context.trigger}, 面板: ${context.partial})`;
};
</script>
