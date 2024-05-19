<template>
  <t-input v-model="input" :status="inputStatus" :format="format" placeholder="请输入数字" :tips="tips" />
</template>
<script setup>
import { ref, computed } from 'vue';

const input = ref('');
const inputStatus = computed(() => {
  if (isNaN(+input.value)) {
    return 'error';
  }
  return 'default';
});

const tips = computed(() => {
  if (!inputStatus.value) {
    return '';
  }
  return '请输入数字';
});
const format = (val) => {
  const reg = /(\d)(?=(?:\d{3})+$)/g;
  const str = val.replace(reg, '$1,');
  return str;
};
</script>
