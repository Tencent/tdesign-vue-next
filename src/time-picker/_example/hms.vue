<template>
  <t-time-picker v-model="value" @change="timeChange" @open="open" @close="close" @pick="pick" />
</template>

<script setup lang="ts">
import { TimePickerValue } from 'tdesign-vue-next';
import { ref } from 'vue';

const value = ref('12:20:30');

const timeChange = (time: TimePickerValue) => {
  console.log(time);
};
const open = () => {
  console.log('open');
};
const close = () => {
  console.log('close');
};
const pick = (value: TimePickerValue, context: { e: MouseEvent }) => {
  console.log(value, context, 'on pick');
};
</script>
