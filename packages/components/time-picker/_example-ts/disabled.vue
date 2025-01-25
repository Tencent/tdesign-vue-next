<template>
  <t-space direction="vertical">
    <h3>禁用整个选择器</h3>
    <t-time-picker v-model="time1" :disabled="true" />
    <h3>禁用指定时间</h3>
    <t-time-picker :disable-time="disableTime" />
    <h3>禁用指定时间 同时展示禁用的时间选项</h3>
    <t-time-picker :disable-time="disableTime" :hide-disabled-time="false" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TimePickerProps } from 'tdesign-vue-next';
const time1 = ref('11:12:10');
const disableTime: TimePickerProps['disableTime'] = (h) => {
  const disableHour = [1, 2, 3];
  if (h > 4) {
    return {
      hour: disableHour,
      minute: [30, 31, 32, 33, 34],
    };
  }
  return {
    hour: disableHour,
  };
};
</script>
