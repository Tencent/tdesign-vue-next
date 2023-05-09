<template>
  <t-space direction="vertical">
    <t-date-range-picker allow-input clearable @pick="onPick" @change="onChange" />
    <t-date-range-picker enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
  </t-space>
</template>

<script setup lang="ts">
import { Dayjs } from 'dayjs';
import { DatePickerTriggerSource, DateRangeValue, DateValue, PickContext } from 'tdesign-vue-next';

const onPick = (value: DateValue, context: PickContext) => console.log('onPick:', value, context);
const onChange = (value: DateRangeValue, context: { dayjsValue?: Dayjs[]; trigger?: DatePickerTriggerSource }) => {
  console.log('onChange:', value, context);
  console.log(
    'timestamp:',
    context.dayjsValue.map((d) => d.valueOf()),
  );
  console.log(
    'YYYYMMDD:',
    context.dayjsValue.map((d) => d.format('YYYYMMDD')),
  );
};
</script>
