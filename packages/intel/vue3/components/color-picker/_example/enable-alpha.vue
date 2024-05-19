<template>
  <t-color-picker-panel v-model="color" format="RGBA" :enable-alpha="true" @change="handleChange" />
</template>
<script setup>
import { ref } from 'vue';

const color = ref('#0052d9');
const handleChange = (value) => {
  console.log(value);
};
</script>
