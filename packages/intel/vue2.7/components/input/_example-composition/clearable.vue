<template>
  <t-input clearable v-model="value" placeholder="请输入" @clear="onClear" style="max-width: 500px" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('Hello TDesign');
const onClear = () => {
  console.log('clear');
};
</script>
