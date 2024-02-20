<template>
  <t-time-picker v-model="value" format="hh:mm:ss a" :hide-disabled-time="false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('10:20:30 am');
</script>
