<template>
  <t-space direction="vertical">
    <t-input placeholder="请输入内容" @focus="onFocus" />
  </t-space>
</template>
<script setup>
const onFocus = () => {
  console.log('focused');
};
</script>
