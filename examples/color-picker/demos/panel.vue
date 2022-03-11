<template>
  <div class="tdesign-demo-block-row">
    <t-color-picker-panel v-model="color" @change="handleChange" @palette-bar-change="handlePaletteChange" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const color = ref('#0052d9');
const handleChange = (value, context) => {
  console.log(value, context);
};
const handlePaletteChange = (context) => {
  console.log('色相面板改变', context);
};
</script>
