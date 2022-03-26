<template>
  <div class="tdesign-demo-block-row">
    <t-color-picker-panel
      v-model="color"
      @change="handleChange"
      @palette-bar-change="handlePaletteChange"
      @recent-colors-change="handleRecentColorsChange"
    />
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

const handleRecentColorsChange = (value, context) => {
  console.log('最近使用颜色改变', value, context);
};
</script>
