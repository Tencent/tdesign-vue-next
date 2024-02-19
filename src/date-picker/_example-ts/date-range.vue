<template>
  <t-space direction="vertical">
    <t-date-range-picker allow-input clearable @pick="onPick" @change="onChange" />
    <t-date-range-picker enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
  </t-space>
</template>

<script lang="ts" setup>
import { DateRangePickerProps } from 'tdesign-vue-next';
const onPick: DateRangePickerProps['onPick'] = (value, context) => console.log('onPick:', value, context);
const onChange: DateRangePickerProps['onChange'] = (value, context) => {
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
