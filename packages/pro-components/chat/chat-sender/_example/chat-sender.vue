<template>
  <t-chat-sender
    v-model="query"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    :loading="loading"
    @send="inputEnter"
    @file-select="fileSelect"
    @stop="onStop"
  >
    <template #suffix="{ renderPresets }">
      <!-- 在这里可以进行自由的组合使用，或者新增预设 -->
      <!-- 不需要附件操作的使用方式 -->
      <component :is="renderPresets([])" />
    </template>
  </t-chat-sender>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const query = ref('');
const loading = ref(false);
// 模拟消息发送
const inputEnter = function () {
  if (loading.value) {
    return;
  }
  if (!query.value) return;
  query.value = '';
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 5000);
};
const fileSelect = (file: File) => {
  console.log(file);
};
const onStop = function () {
  loading.value = false;
};
</script>
