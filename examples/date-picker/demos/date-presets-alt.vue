<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker v-model="selectedDates" :presets="presets" theme="primary" mode="date" range>
      <template #default="{ trigger }">
        <t-button
          v-for="(value, key) in presets"
          :key="key"
          theme="primary"
          variant="text"
          @click="trigger('clickRange', value, true)"
        >
          {{ key }}
        </t-button>
      </template>
    </t-date-picker>
    <div>{{ dateText }}: {{ selectedDates }}</div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const selectedDates = ref(dayjs().toISOString());
    const presets = {
      // '今天', // Today
      最近7天: [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')],
      最近3天: [dayjs().subtract(3, 'day'), dayjs().subtract(1, 'day')],
      今天: [dayjs()],
    };
    return {
      selectedDates,
      presets,
      dateText: '日期',
    };
  },
});
</script>
