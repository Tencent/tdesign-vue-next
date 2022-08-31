<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="time" class="demos" format="h:m:s a" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const time = ref('00:00:00 am');
</script>
