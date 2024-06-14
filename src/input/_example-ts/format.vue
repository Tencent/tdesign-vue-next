<template>
  <t-input v-model="input" :status="inputStatus" :format="format" placeholder="请输入数字" :tips="tips" />
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { InputProps } from 'tdesign-vue-next';
const input = ref('');
const inputStatus = computed<InputProps['status']>(() => {
  if (isNaN(+input.value)) {
    return 'error';
  }
  return 'default';
});
const tips = computed<InputProps['tips']>(() => {
  if (!inputStatus.value) {
    return '';
  }
  return '请输入数字';
});
const format: InputProps['format'] = (val) => {
  const reg = /(\d)(?=(?:\d{3})+$)/g;
  const str = val.replace(reg, '$1,');
  return str;
};
</script>
