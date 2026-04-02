<template>
  <t-space size="100px">
    <t-input-number v-model="value1" auto-width theme="row" :min="-2" />
    <t-input-number v-model="value2" auto-width theme="column" :min="-2" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref(3);
const value2 = ref(3);
</script>
