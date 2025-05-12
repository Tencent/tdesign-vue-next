<template>
  <t-chat-input v-model="query" :stop-disabled="loading" @send="inputEnter" @stop="handleStop"> </t-chat-input>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const query = ref('');
const loading = ref(false);
const handleStop = function () {
  loading.value = false;
};
// 模拟消息发送
const inputEnter = function (inputValue: string) {
  if (loading.value) {
    return;
  }
  if (!inputValue) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 5000);
};
</script>
