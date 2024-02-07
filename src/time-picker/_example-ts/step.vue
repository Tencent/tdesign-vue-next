<template>
  <t-time-picker v-model="time1" :steps="[1, 2, 3]" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time1 = ref('09:18:17');
</script>
