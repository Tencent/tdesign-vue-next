<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input placeholder="请输入内容" @focus="onFocus" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onFocus = () => {
      console.log('focused');
    };
    return {
      onFocus,
    };
  },
});
</script>
