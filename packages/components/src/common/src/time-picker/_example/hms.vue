<template>
  <t-time-picker v-model="value" @change="timeChange" @open="open" @close="close" @pick="pick" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('12:20:30');

const timeChange = (time) => {
  console.log(time);
};
const open = () => {
  console.log('open');
};
const close = () => {
  console.log('close');
};
const pick = (v, context) => {
  console.log(v, context, 'on pick');
};
</script>
