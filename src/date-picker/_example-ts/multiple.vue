<template>
  <t-space direction="vertical">
    <t-date-picker v-model="value" multiple clearable />
    <t-date-picker mode="week" multiple clearable />
    <t-date-picker mode="year" multiple clearable />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

dayjs.updateLocale('zh-cn', {
  weekStart: 1,
});

const value = ref([]);
</script>
