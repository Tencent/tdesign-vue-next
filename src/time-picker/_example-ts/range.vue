<template>
  <t-time-range-picker v-model="time" class="demos" clearable format="HH:mm:ss" allow-input @pick="handleRangePick" />
</template>

<script lang="ts" setup>
import { TimeRangePickerProps } from 'tdesign-vue-next';
import { ref } from 'vue';
const time = ref(['00:00:00', '23:59:59']);
const handleRangePick: TimeRangePickerProps['onPick'] = (v) => {
  console.log('picked range time is', v);
};
</script>
