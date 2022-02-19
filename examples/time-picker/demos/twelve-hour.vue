<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="value" format="hh:mm:ss a" :hide-disabled-time="false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('10:20:30 am');
</script>
