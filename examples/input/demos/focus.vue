<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input placeholder="请输入内容" @focus="onFocus" />
  </div>
</template>
<script>
export default {
  methods: {
    onFocus() {
      console.log('focused');
    },
  },
};
</script>
