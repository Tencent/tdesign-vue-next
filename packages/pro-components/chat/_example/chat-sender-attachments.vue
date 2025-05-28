<template>
  <t-chat-sender
    v-model="query"
    :stop-disabled="loading"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    @send="inputEnter"
    @file-select="handleUploadFile"
  >
    <!-- 自定义操作区域的内容，默认支持图片上传、附件上传和发送按钮 -->
    <template #suffix="{ renderPresets }">
      <!-- 在这里可以进行自由的组合使用，或者新增预设 -->
      <!-- 不需要附件操作的使用方式 -->
      <!-- <component :is="renderPresets([])" /> -->
      <!-- 只需要附件上传的使用方式-->
      <!-- <component :is="renderPresets([{ name: 'uploadAttachment' }])" /> -->
      <!-- 只需要图片上传的使用方式-->
      <!-- <component :is="renderPresets([{ name: 'uploadImage' }])" /> -->
      <!-- 任意配置顺序-->
      <component :is="renderPresets([{ name: 'uploadAttachment' }, { name: 'uploadImage' }])" />
    </template>
    <template #header>
      <t-attachments v-if="filesList.length > 0" :items="filesList" @remove="handleRemoveFile" />
    </template>
  </t-chat-sender>
</template>
<script setup lang="ts">
import { TdAttachmentItem } from '@tencent/tdesign-chatbot';
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
const filesList = ref<TdAttachmentItem[]>([
  {
    key: '1',
    name: 'excel-file.xlsx',
    size: 111111,
  },
  {
    key: '2',
    name: 'word-file.docx',
    size: 222222,
  },
  {
    key: '3',
    name: 'image-file.png',
    size: 333333,
  },
  {
    key: '4',
    name: 'pdf-file.pdf',
    size: 444444,
  },
]);
const handleRemoveFile = (e: CustomEvent<TdAttachmentItem>) => {
  filesList.value = filesList.value.filter((item) => item.key !== e.detail.key);
};

const handleUploadFile = (e: CustomEvent<File[]>) => {
  console.log('🚀 ~ handleUploadFile ~ eYLog :', e);
  // 添加新文件并模拟上传进度
  const newFile = {
    ...e.detail[0],
    size: e.detail[0].size,
    name: e.detail[0].name,
    status: 'progress' as TdAttachmentItem['status'],
    description: '上传中',
  };

  filesList.value = [newFile, ...filesList.value];
  console.log('🚀 ~ handleUploadFile ~ filesListYLog :', filesList);
  setTimeout(() => {
    filesList.value = filesList.value.map((file) =>
      file.name === newFile.name
        ? {
            ...file,
            url: 'https://tdesign.gtimg.com/site/avatar.jpg',
            status: 'success',
            description: `${Math.floor(newFile.size / 1024)}KB`,
          }
        : file,
    );
  }, 1000);
};
</script>
