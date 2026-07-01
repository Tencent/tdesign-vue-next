<template>
  <t-space>
    <t-color-picker v-model="color" />
    <t-color-picker v-model="color" :is-input="false" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('#0052d9');
</script>
