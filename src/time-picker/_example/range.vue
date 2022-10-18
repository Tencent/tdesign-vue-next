<template>
  <t-time-range-picker v-model="time" class="demos" clearable format="HH:mm:ss" allow-input />
</template>

<script setup>
import { ref } from 'vue';

const time = ref(['00:00:00', '23:59:59']);
</script>
