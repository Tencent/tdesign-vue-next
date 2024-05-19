<template>
  <t-time-picker v-model="value" @change="timechange" @open="open" @close="close" @pick="pick" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('12:20:30');
const timechange = (time) => {
  console.log(time);
};
const open = () => {
  console.log('open');
};
const close = () => {
  console.log('close');
};
const pick = (v) => {
  console.log(v);
};
</script>
