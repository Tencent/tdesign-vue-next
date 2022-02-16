<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="time1" class="demos" />
    <t-time-picker v-model="time2" class="demos" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const time1 = ref('20:22');
const time2 = ref('21:22');
</script>

<style scoped>
.demos {
  margin-top: 20px;
}
</style>
