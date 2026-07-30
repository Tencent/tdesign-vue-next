<template>
  <t-space>
    <t-color-picker v-model="color" :is-input="false" />
    <t-color-picker v-model="gradientColor" :is-input="false" :color-modes="['linear-gradient']" />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('#0052d9');
const gradientColor = ref('linear-gradient(45deg, #4787f0 0%, #d454de 100%)');
</script>
