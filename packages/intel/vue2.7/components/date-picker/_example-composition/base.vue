<template>
  <t-space direction="vertical">
    <t-date-picker v-model="date2" @change="handleChange" :firstDayOfWeek="3" :inputProps="inputProps" />
    <t-date-picker
      v-model="date"
      placeholder="可清除、可输入的日期选择器"
      clearable
      allow-input
      @change="handleChange"
    />
  </t-space>
</template>

<script setup>
import { ref, reactive } from 'vue';

const date = ref('');
const date2 = ref('');
const inputProps = reactive({
  inputClass: 'test-inputClass',
});
const handleChange = (value, context) => {
  console.log('onChange:', value, context);
  console.log('timestamp:', context.dayjsValue.valueOf());
  console.log('YYYYMMDD:', context.dayjsValue.format('YYYYMMDD'));
};
</script>
