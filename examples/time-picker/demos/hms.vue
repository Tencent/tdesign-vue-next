<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="value" @change="timeChange" @open="open" @close="close" />
  </div>
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
</script>
