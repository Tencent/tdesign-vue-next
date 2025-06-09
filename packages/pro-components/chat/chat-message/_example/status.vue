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
  <Space direction="vertical" style="width: 100%">
    <Divider>消息加载状态</Divider>
    <Select v-model="animation" style="width: 20%" :options="animationOptions" />
    <t-chat-message
      avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
      datetime="今天16:38"
      :animation="animation"
      name="TDesignAI"
      :message="messages.loading"
    />
    <Divider>出错状态下的消息</Divider>
    <t-chat-message avatar="https://tdesign.gtimg.com/site/chat-avatar.png" :message="messages.error" />
  </Space>
</template>
