<template>
  <t-space direction="vertical">
    <t-input placeholder="请输入内容" @focus="onFocus" />
  </t-space>
</template>
<script lang="ts" setup>
import { InputProps } from 'tdesign-vue-next';
const onFocus: InputProps['onFocus'] = () => {
  console.log('focused');
};
</script>
