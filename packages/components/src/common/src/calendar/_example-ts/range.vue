<template>
  <t-calendar :range="range" />
</template>

<script lang="tsx" setup>
import { CalendarProps } from 'tdesign-vue-next';
const range: CalendarProps['range'] = [
  '2018-08',
  // new Date(2017, 7),
  '2028-04', // new Date(2027, 3),
];
</script>
