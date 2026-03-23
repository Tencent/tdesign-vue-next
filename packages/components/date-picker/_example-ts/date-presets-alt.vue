<template>
  <t-space direction="vertical">
    <t-date-picker v-model="value" :presets="presets1" @preset-click="handlePresetClick" />
    <t-date-picker v-model="value2" format="YYYY-MM-DD HH:mm:ss" placeholder="快捷选择此刻" enable-time-picker>
      <template #presets>
        <t-button size="small" variant="text" @click="value2 = dayjs().toDate()">此刻</t-button>
      </template>
    </t-date-picker>
    <t-date-range-picker v-model="range1" :presets="presets" />
    <t-date-range-picker v-model="range2" :presets="presets" enable-time-picker />
  </t-space>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { ref } from 'vue';
import { DateRangePickerProps, DatePickerProps } from 'tdesign-vue-next';

const presets1 = ref<DatePickerProps['presets']>({
  今天: dayjs().toDate(),
});
const presets = ref<DateRangePickerProps['presets']>({
  最近7天: [dayjs().subtract(6, 'day').toDate(), dayjs().toDate()],
  最近3天: [dayjs().subtract(2, 'day').toDate(), dayjs().toDate()],
  今天: [dayjs().toDate(), dayjs().toDate()],
});

const value = ref('2022-01-01');
const value2 = ref();
const range1 = ref(['2022-01-01', '2022-08-08']);
const range2 = ref(['2022-01-01 11:11:11', '2022-08-08 12:12:12']);

type PresetClickContext = Parameters<NonNullable<DatePickerProps['onPresetClick']>>[0];

const handlePresetClick = (context: PresetClickContext) => {
  console.log(context);
};
</script>
