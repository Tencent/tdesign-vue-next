<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker v-model="selectedDates" :presets="presets" theme="primary" mode="date" range>
      <template v-slot:default="{ trigger }">
        <t-button
          v-for="(value, key) in presets"
          v-bind:key="key"
          theme="primary"
          variant="text"
          v-on:click="trigger('clickRange', value, true)"
        >
          {{ key }}
        </t-button>
      </template>
    </t-date-picker>
    <div>{{ dateText }}: {{ selectedDates }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      presets: {
        // '今天', // Today
        最近7天: [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')],
        最近3天: [dayjs().subtract(3, 'day'), dayjs().subtract(1, 'day')],
        今天: [dayjs()],
      },
      dateText: '日期',
      selectedDates: dayjs().toISOString(),
    };
  },
};
</script>
