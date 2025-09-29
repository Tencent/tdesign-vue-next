<script setup>
import { ref } from 'vue';

const messages = {
  loading: {
    id: '11111',
    role: 'assistant',
    status: 'pending',
  },
  error: {
    id: '22222',
    role: 'assistant',
    status: 'error',
    content: {
      type: 'text',
      data: '出错了',
    },
  },
};

const animation = ref('skeleton');
const animationOptions = [
  { label: 'skeleton', value: 'skeleton' },
  { label: 'moving', value: 'moving' },
  { label: 'gradient', value: 'gradient' },
  { label: 'circle', value: 'circle' },
];
</script>

<template>
  <t-space direction="vertical" style="width: 100%">
    <t-divider>消息加载状态</t-divider>
    <t-select v-model="animation" style="width: 20%" :options="animationOptions" />
    <t-chat-message
      avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
      datetime="今天16:38"
      :animation="animation"
      name="TDesignAI"
      role="assistant"
      :status="messages.loading.status"
    />
    <t-divider>出错状态下的消息</t-divider>
    <t-chat-message
      avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
      role="assistant"
      :content="messages.error.content"
      :status="messages.error.status"
    />
  </t-space>
</template>
