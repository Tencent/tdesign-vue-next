<template>
  <t-space direction="vertical">
    <t-date-picker v-model="date2" @change="handleChange" />
    <t-date-picker
      v-model="date"
      placeholder="可清除、可输入的日期选择器"
      clearable
      allow-input
      @change="handleChange"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { Dayjs } from 'dayjs';
import { ref } from 'vue';
import { DateValue, DatePickerTriggerSource } from 'tdesign-vue-next';
const date = ref('');
const date2 = ref('');
function handleChange(
  value: DateValue,
  context: {
    dayjsValue?: Dayjs;
    trigger?: DatePickerTriggerSource;
  },
) {
  console.log('onChange:', value, context);
  console.log('timestamp:', context.dayjsValue.valueOf());
  console.log('YYYYMMDD:', context.dayjsValue.format('YYYYMMDD'));
}
</script>
