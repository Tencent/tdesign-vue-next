<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker v-model="date" theme="primary" mode="date" clearable />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const date = ref('2021-11-10');
</script>
