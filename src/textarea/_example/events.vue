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
<script setup lang="ts">
import { TextareaValue } from 'tdesign-vue-next';
import { ref } from 'vue';

const value = ref('');

const onKeypress = (value: TextareaValue, context: { e: KeyboardEvent }) => {
  console.log('onKeypress: ', value, context);
};
const onKeydown = (value: TextareaValue, context: { e: KeyboardEvent }) => {
  console.log('onKeydown: ', value, context);
};
const onKeyup = (value: TextareaValue, context: { e: KeyboardEvent }) => {
  console.log('onKeyup: ', value, context);
};

const onFocus = (value: TextareaValue, context: { e: FocusEvent }) => {
  console.log('onFocus: ', value, context);
};
const onBlur = (value: TextareaValue, context: { e: FocusEvent }) => {
  console.log('onBlur: ', value, context);
};
</script>
