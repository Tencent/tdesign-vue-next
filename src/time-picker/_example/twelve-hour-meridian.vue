<template>
  <t-time-picker v-model="value" format="A hh:mm:ss" placeholder="选择时间" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('PM 10:20:30');
</script>
