<template>
  <t-time-picker v-model="time" class="demos" format="h:m:s a" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const time = ref('00:00:00 am');
</script>
