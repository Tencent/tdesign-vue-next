<template>
  <t-space>
    <t-space direction="vertical">
      <label>单色</label>
      <t-color-picker-panel
        v-model="color"
        :show-primary-color-preview="false"
        :color-modes="['monochrome']"
        @change="handleChange"
        @palette-bar-change="handlePaletteChange"
        @recent-colors-change="handleRecentColorsChange"
      />
    </t-space>
    <t-space direction="vertical">
      <label>渐变</label>
      <t-color-picker-panel
        v-model="color2"
        enable-alpha
        :color-modes="['linear-gradient']"
        @change="handleChange"
        @palette-bar-change="handlePaletteChange"
        @recent-colors-change="handleRecentColorsChange"
    /></t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ColorPickerPanelProps } from 'tdesign-vue-next';
const color = ref('#0052d9');
const color2 = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');
const handleChange: ColorPickerPanelProps['onChange'] = (value, context) => {
  console.log(value, context);
};
const handlePaletteChange: ColorPickerPanelProps['onPaletteBarChange'] = (context) => {
  console.log('色相面板改变', context);
};
const handleRecentColorsChange: ColorPickerPanelProps['onRecentColorsChange'] = (value, context) => {
  console.log('最近使用颜色改变', value, context);
};
</script>
