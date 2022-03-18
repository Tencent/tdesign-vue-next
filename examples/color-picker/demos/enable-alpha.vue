<template>
  <div class="tdesign-demo-block-row">
    <t-color-picker-panel v-model="color" format="RGBA" :enable-alpha="true" @change="handleChange" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const color = ref('#0052d9');
const handleChange = (value) => {
  console.log(value);
};
</script>
