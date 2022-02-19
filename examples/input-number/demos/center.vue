<template>
  <div>
    <t-input-number
      v-model="value"
      theme="row"
      size="medium"
      :max="15"
      :min="-2"
      :disabled="false"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown-enter="handleKeydownEnter"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3);

const handleChange = (v, ctx) => {
  console.info('change', v, ctx);
};
const handleFocus = (v, ctx) => {
  console.info('focus', v, ctx);
};
const handleBlur = (v, ctx) => {
  console.info('blur', v, ctx);
};
const handleKeydownEnter = (v, ctx) => {
  console.info('keydown-enter', v, ctx);
};
const handleKeydown = (v, ctx) => {
  console.info('keydown', v, ctx);
};
const handleKeyup = (v, ctx) => {
  console.info('keyup', v, ctx);
};
const handleKeypress = (v, ctx) => {
  console.info('keypress', v, ctx);
};
</script>
