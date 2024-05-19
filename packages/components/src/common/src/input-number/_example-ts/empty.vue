<template>
  <t-input-number v-model="value" placeholder="输入" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(undefined);
</script>
