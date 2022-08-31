<template>
  <div class="tdesign-demo-block">
    <t-time-range-picker v-model="time" class="demos" clearable format="HH:mm:ss" allow-input />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const time = ref(['00:00:00', '23:59:59']);
</script>
