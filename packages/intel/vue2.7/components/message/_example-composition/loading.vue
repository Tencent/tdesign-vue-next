<template>
  <t-space direction="vertical">
    <t-message theme="loading">用于表示操作正在生效的过程中</t-message>
    <t-message :theme="status1">用于表示操作顺利达成(10s)</t-message>
    <t-message :theme="status2">用于表示普通操作失败中断(10s)</t-message>
    <t-button :disabled="isDisabled" @click="reset">重置</t-button>
  </t-space>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

const status1 = ref('loading');
const status2 = ref('loading');
const isDisabled = computed(() => status1.value === 'loading' && status2.value === 'loading');
const fn1 = () => {
  setTimeout(() => {
    status1.value = 'success';
  }, 10000);
};
const fn2 = () => {
  setTimeout(() => {
    status2.value = 'warning';
  }, 10000);
};
const reset = () => {
  status1.value = 'loading';
  status2.value = 'loading';
  fn1();
  fn2();
};
onMounted(() => {
  fn1();
  fn2();
});
</script>
