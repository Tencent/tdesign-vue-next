<template>
  <div class="tdesign-demo-block-row">
    <t-color-picker-panel v-model="color" :enable-alpha="true" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const color = ref('#0052d9');
</script>
