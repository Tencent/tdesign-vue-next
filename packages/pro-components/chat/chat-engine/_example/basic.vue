<template>
  <div style="margin-top: -18px; height: 408px; display: flex; flex-direction: column">
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
import { type SSEChunkData, type AIMessageContent, type ChatMessagesData, useChat } from '@tdesign-vue-next/chat';

/**
 * 快速开始示例
 *
 * 学习目标：
 * - 使用 useChat Hook 创建聊天引擎
 * - 组合 ChatList、ChatMessage、ChatSender 组件
 * - 理解 chatEngine、messages、status 的作用
 */

const inputValue = ref<string>('');

const defaultMessages: ChatMessagesData[] = [
  {
    id: 'demo-1',
    role: 'user',
    content: [
      {
        type: 'text',
        data: '南极的自动提款机叫什么名字',
      },
    ],
    datetime: '2024-01-01 10:00:00',
  },
  {
    id: 'demo-2',
    role: 'assistant',
    status: 'complete',
    datetime: '2024-01-01 10:00:05',
    content: [
      // 3. Markdown 内容
      {
        type: 'markdown',
        data: `南极的自动提款机并没有一个特定的专属名称，但历史上确实有一台ATM机曾短暂存在于南极的麦克默多站（McMurdo Station）。这台ATM由美国富兰克林国家银行（Wells Fargo）于1998年安装，主要供驻扎在该站的科研人员使用。不过，由于南极的极端环境和极低的人口密度，这台ATM机并未长期运行，最终被移除。`,
      },
    ],
  },
];

// 使用 useChat Hook 创建聊天引擎
const { chatEngine, messages, status } = useChat({
  defaultMessages,
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
