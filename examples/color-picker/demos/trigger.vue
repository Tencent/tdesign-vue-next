<template>
  <div class="tdesign-demo-block-row">
    <t-color-picker v-model="color" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const color = ref('#0052d9');
</script>
