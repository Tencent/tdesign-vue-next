<template>
  <t-textarea
    v-model="value"
    placeholder="请输入"
    @keypress="onKeypress"
    @keydown="onKeydown"
    @keyup="onKeyup"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
<script setup>
import { ref } from 'vue';

const value = ref('');
const onKeypress = (value, e) => {
  console.log('onKeypress: ', value, e);
};
const onKeydown = (value, e) => {
  console.log('onKeydown: ', value, e);
};
const onKeyup = (value, e) => {
  console.log('onKeyup: ', value, e);
};
const onFocus = (value, e) => {
  console.log('onFocus: ', value, e);
};
const onBlur = (value, e) => {
  console.log('onBlur: ', value, e);
};
</script>
