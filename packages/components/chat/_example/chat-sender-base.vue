<template>
  <t-chat-sender
    v-model="query"
    :stop-disabled="loading"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    @send="inputEnter"
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
