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
    ></t-input-number>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(3);
    return {
      value,
      handleChange(v, ctx) {
        console.info('change', v, ctx);
      },
      handleFocus(v, ctx) {
        console.info('focus', v, ctx);
      },
      handleBlur(v, ctx) {
        console.info('blur', v, ctx);
      },
      handleKeydownEnter(v, ctx) {
        console.info('keydown-enter', v, ctx);
      },
      handleKeydown(v, ctx) {
        console.info('keydown', v, ctx);
      },
      handleKeyup(v, ctx) {
        console.info('keyup', v, ctx);
      },
      handleKeypress(v, ctx) {
        console.info('keypress', v, ctx);
      },
    }
  }
});
</script>
