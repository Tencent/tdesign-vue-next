<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker :presets="presets" theme="primary" mode="date" range></t-date-picker>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const presets = {
      // '今天', // Today
      今天: dayjs(),
    }
    return {
      presets,
    }
  }
});
</script>
