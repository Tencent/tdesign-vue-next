<template>
  <t-input-number v-model="value" placeholder="输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(undefined);
</script>
