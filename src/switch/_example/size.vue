<template>
  <t-space>
    <t-switch v-model="checked" size="large" />
    <t-switch size="medium" />
    <t-switch size="small" />
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(true);
</script>
