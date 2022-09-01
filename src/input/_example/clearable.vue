<template>
  <div class="tdesign-demo-block-column" style="max-width: 500px">
    <t-input v-model="value" clearable placeholder="请输入" @clear="onClear" @blur="onBlur" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const value = ref('Hello TDesign');
const onClear = () => {
  console.log('clear');
};
const onBlur = () => {
  console.log('blur');
};
</script>
