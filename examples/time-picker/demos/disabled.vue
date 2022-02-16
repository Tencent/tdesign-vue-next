<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="time1" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const time1 = ref('11:12:10');
</script>
