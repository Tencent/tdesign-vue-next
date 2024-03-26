<template>
  <t-time-picker v-model="value" @change="timeChange" @open="open" @close="close" @pick="pick" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TimePickerProps } from 'tdesign-vue-next';
const value = ref('12:20:30');
const timeChange: TimePickerProps['onChange'] = (time) => {
  console.log(time);
};
const open: TimePickerProps['onOpen'] = () => {
  console.log('open');
};
const close: TimePickerProps['onClose'] = () => {
  console.log('close');
};
const pick: TimePickerProps['onPick'] = (v, context) => {
  console.log(v, context, 'on pick');
};
</script>
