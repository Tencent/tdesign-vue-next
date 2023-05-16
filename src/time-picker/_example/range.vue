<template>
  <t-time-range-picker v-model="time" class="demos" clearable format="HH:mm:ss" allow-input @pick="handleRangePick" />
</template>

<script setup lang="ts">
import { TimePickerValue } from 'tdesign-vue-next';
import { ref } from 'vue';

const time = ref(['00:00:00', '23:59:59']);

const handleRangePick = (value: TimePickerValue) => {
  console.log('picked range time is', value);
};
</script>
