<template>
  <t-chat-sender
    v-model="query"
    :stop-disabled="loading"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    @send="inputEnter"
    @file-select="fileSelect"
  >
    <!-- 自定义操作区域的内容，默认支持图片上传、附件上传和发送按钮 -->
    <template #suffix="{ renderPresets }">
      <!-- 在这里可以进行自由的组合使用，或者新增预设 -->
      <!-- 不需要附件操作的使用方式 -->
      <component :is="renderPresets([])" />
      <!-- 只需要附件上传的使用方式-->
      <!-- <component :is="renderPresets([{ name: 'uploadAttachment' }])" /> -->
      <!-- 只需要图片上传的使用方式-->
      <!-- <component :is="renderPresets([{ name: 'uploadImage' }])" /> -->
      <!-- 任意配置顺序-->
      <!-- <component :is="renderPresets([{ name: 'uploadAttachment' }, { name: 'uploadImage' }])" /> -->
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
</script>
