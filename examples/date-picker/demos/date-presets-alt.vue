<template>
  <div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker v-model="selectedDates" :presets="presetsRange" theme="primary" mode="date" range>
        <template #default="{ trigger }">
          <t-button
            v-for="(value, key) in presetsRange"
            :key="key"
            theme="primary"
            variant="text"
            @click="trigger('click', value, true)"
          >
            {{ key }}
          </t-button>
        </template>
      </t-date-picker>
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker v-model="selectedDate" :presets="presets" theme="primary" mode="date">
        <template #default="{ trigger }">
          <t-button
            v-for="(value, key) in presets"
            :key="key"
            theme="primary"
            variant="text"
            @click="trigger('click', value, true)"
          >
            {{ key }}
          </t-button>
        </template>
      </t-date-picker>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const selectedDate = ref(dayjs().toISOString());
    const selectedDates = ref([dayjs().toISOString(), dayjs().toISOString()]);
    const presets = {
      '7天前': dayjs().subtract(6, 'day'),
      今天: dayjs(),
    };

    const presetsRange = {
      最近7天: [dayjs().subtract(6, 'day'), dayjs()],
      最近3天: [dayjs().subtract(2, 'day'), dayjs()],
      今天: [dayjs()],
    };

    return {
      selectedDate,
      selectedDates,
      presets,
      presetsRange,
    };
  },
});
</script>
<style scoped>
.tdesign-demo-item--datepicker {
  margin-bottom: 12px;
}
</style>
