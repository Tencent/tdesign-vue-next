<template>
  <t-space direction="vertical">
    <t-color-picker v-model="color" :eye-dropper="true" @change="handleChange" />
    <t-color-picker-panel v-model="color" :eye-dropper="true" @change="handleChange" />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { ColorPickerProps } from 'tdesign-vue-next';

const color = ref('#0052d9');
const handleChange: ColorPickerProps['onChange'] = (value, context) => {
  console.log(value, context.trigger);
};
</script>
