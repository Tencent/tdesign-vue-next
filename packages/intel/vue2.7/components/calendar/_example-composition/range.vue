<template>
  <t-calendar :range="range"></t-calendar>
</template>

<script setup>
import { ref } from 'vue';

const range = ref([
  '2018-08',
  // new Date(2017, 7),
  '2028-04', // new Date(2027, 3),
]);
</script>
