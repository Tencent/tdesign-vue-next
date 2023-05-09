<template>
  <t-space direction="vertical">
    <div class="date-picker-panel-border">
      <t-date-picker-panel :on-cell-click="handleCellClick" :on-change="handleChange" />
    </div>
    <div class="date-picker-panel-border">
      <t-date-picker-panel enable-time-picker :on-cell-click="handleCellClick" :on-change="handleChange" />
    </div>

    <div class="date-picker-panel-border">
      <t-date-range-picker-panel :on-cell-click="handleCellClick" :on-change="handleChange" />
    </div>
    <div class="date-picker-panel-border">
      <t-date-range-picker-panel enable-time-picker :on-cell-click="handleCellClick" :on-change="handleChange" />
    </div>
  </t-space>
</template>

<script setup lang="ts">
import { Dayjs } from 'dayjs';
import { DatePickerTriggerSource, DateValue } from 'tdesign-vue-next';

type DatePickerOnchangeValue = {
  value: DateValue;
  context: { dayjsValue?: Dayjs; trigger?: DatePickerTriggerSource };
};
function handleChange(value: DatePickerOnchangeValue) {
  console.log('onChange value', value);
}

function handleCellClick(value: DatePickerOnchangeValue) {
  console.log('onCellClick value', value);
}
</script>
<style>
.date-picker-panel-border {
  border: 1px solid var(--td-border-level-2-color);
  width: fit-content;
  border-radius: 3;
}
</style>
