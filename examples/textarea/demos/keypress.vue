<template>
  <div>
    <t-textarea
      v-model="value"
      placeholder="请输入"
      @keypress="onKeypress"
      @keydown="onKeydown"
      @keyup="onKeyup"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');

    return {
      value,
      onKeypress(value, e) {
        console.log('onKeypress: ', value, e);
      },
      onKeydown(value, e) {
        console.log('onKeydown: ', value, e);
      },
      onKeyup(value, e) {
        console.log('onKeyup: ', value, e);
      },
    };
  },
});
</script>
<style></style>
