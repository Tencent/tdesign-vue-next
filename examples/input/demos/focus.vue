<template>
  <div class="tdesign-demo-block-column" style="max-width: 500px">
    <t-input placeholder="请输入内容" @focus="onFocus" />
  </div>
</template>
<script setup>
const onFocus = () => {
  console.log('focused');
};
</script>
