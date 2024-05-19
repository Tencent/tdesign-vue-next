<template>
  <t-space>
    <t-time-range-picker class="demos" clearable v-model="time" format="HH:mm:ss" allow-input @pick="handleRangePick" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const time = ref(['00:00:00', '23:59:59']);
const handleRangePick = (v) => {
  console.log('picked range time is', v);
};
</script>
