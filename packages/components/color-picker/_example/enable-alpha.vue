<template>
  <t-color-picker-panel v-model="color" format="RGBA" :enable-alpha="true" @change="handleChange" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ColorPickerPanelProps } from 'tdesign-vue-next';
const color = ref('#0052d9');
const handleChange: ColorPickerPanelProps['onChange'] = (value) => {
  console.log(value);
};
</script>
