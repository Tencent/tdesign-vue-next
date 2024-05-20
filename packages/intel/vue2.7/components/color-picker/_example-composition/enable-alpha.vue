<template>
  <t-color-picker-panel v-model="color" format="RGBA" :enable-alpha="true" @change="handleChange" />
</template>
<script setup>
import { ref } from 'vue';

const color = ref('red');
const handleChange = (value) => {
  console.log(value);
};
</script>
