<template>
  <t-space direction="vertical">
    <t-time-picker v-model="time1" class="demos" :presets="{ 上午十一点: '11:00:00' }" />
    <t-time-range-picker
      v-model="time2"
      class="demos"
      clearable
      format="HH:mm:ss"
      allow-input
      :presets="{ 下午: ['13:00:00', '18:00:00'] }"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time1 = ref('20:22');
const time2 = ref(['00:00:00', '23:59:59']);
</script>

<style scoped>
.demos {
  margin-top: 20px;
}
</style>
