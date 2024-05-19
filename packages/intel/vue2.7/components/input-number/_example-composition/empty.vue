<template>
  <div>
    <t-input-number v-model="value" placeholder="输入"></t-input-number>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(undefined);
</script>
