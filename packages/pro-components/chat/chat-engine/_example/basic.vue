<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <!-- 消息列表 -->
    <t-chat-list :clear-history="false" style="flex: 1">
      <t-chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :placement="message.role === 'user' ? 'right' : 'left'"
        :variant="message.role === 'user' ? 'base' : 'text'"
      />
    </t-chat-list>

    <!-- 输入框 -->
    <t-chat-sender
      v-model="inputValue"
      placeholder="请输入内容"
      :loading="status === 'pending' || status === 'streaming'"
      @send="handleSend"
      @stop="handleStop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type SSEChunkData, type AIMessageContent, useChat } from '@tdesign-vue-next/chat';

/**
 * 快速开始示例
 *
 * 学习目标：
 * - 使用 useChat Hook 创建聊天引擎
 * - 组合 ChatList、ChatMessage、ChatSender 组件
 * - 理解 chatEngine、messages、status 的作用
 */

const inputValue = ref<string>('');

// 使用 useChat Hook 创建聊天引擎
const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
    stream: true,
    // 数据转换
    onMessage: (chunk: SSEChunkData): AIMessageContent => {
      const { ...rest } = chunk.data;
      return {
        type: 'markdown',
        data: rest?.msg || '',
      };
    },
  },
});

// 发送消息
const handleSend = async (params: string) => {
  const { prompt } = { prompt: params };
  await chatEngine.value?.sendUserMessage({ prompt });
  inputValue.value = '';
};

// 停止生成
const handleStop = () => {
  chatEngine.value?.abortChat();
};
</script>
