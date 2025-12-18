<template>
  <div>
    <t-chatbot :chat-service-config="chatServiceConfig" />
  </div>
</template>

<script setup lang="ts">
import type { SSEChunkData, AIMessageContent, ChatServiceConfig } from '@tdesign-vue-next/chat';

/**
 * 快速开始示例
 *
 * 学习目标：
 * - 了解 Chatbot 组件的最小配置
 * - 理解 endpoint 和 onMessage 的作用
 * - 实现一个基于SSE流式传输的最简可用的对话界面
 */

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  // 对话服务地址
  endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
  // 开启流式传输
  stream: true,
  // 解析后端返回的数据，转换为组件所需格式
  onMessage: (chunk: SSEChunkData): AIMessageContent => {
    const { ...rest } = chunk.data as any;
    return {
      type: 'markdown',
      data: rest?.msg || '',
    };
  },
};
</script>
