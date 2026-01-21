<template>
  <div style="position: relative">
    <!-- 操作按钮 -->
    <div class="op-button-area">
      <t-radio-group v-model="historyMode" variant="default-filled" @change="handleModeChange">
        <t-radio-button value="default">设置初始化消息</t-radio-button>
        <t-radio-button value="history">加载历史消息</t-radio-button>
      </t-radio-group>
    </div>
    <!-- 聊天界面 -->
    <div style="margin-top: 38px; height: 352px; display: flex; flex-direction: column">
      <t-chat-list :clear-history="false">
        <t-chat-message
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :placement="message.role === 'user' ? 'right' : 'left'"
          :variant="message.role === 'user' ? 'base' : 'text'"
          :handle-actions="{
            suggestion: ({ content }) => handleSuggestionClick(content.prompt),
          }"
        />
      </t-chat-list>

      <t-chat-sender
        v-model="inputValue"
        placeholder="请输入内容"
        :loading="status === 'pending' || status === 'streaming'"
        @send="handleSend"
        @stop="handleStop"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type SSEChunkData, type AIMessageContent, type ChatMessagesData, useChat } from '@tdesign-vue-next/chat';

/**
 * 初始化消息示例
 *
 * 学习目标：
 * - 使用 defaultMessages 设置欢迎语和建议问题
 * - 通过 chatEngine.setMessages 动态加载历史消息
 * - 实现点击建议问题填充输入框
 */

const inputValue = ref<string>('');
const historyMode = ref<string>('default');

// 初始化消息
const defaultMessages: ChatMessagesData[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: [
      {
        type: 'text',
        status: 'complete',
        data: '你好！我是 TDesign 智能助手，有什么可以帮助你的吗？',
      },
      {
        type: 'suggestion',
        status: 'complete',
        data: [
          {
            title: '请介绍一下 TDesign 设计体系',
            prompt: '请介绍一下 TDesign 设计体系',
          },
          {
            title: 'TDesign Vue 如何快速开始使用？',
            prompt: 'TDesign Vue 如何快速开始使用？',
          },
          {
            title: 'TDesign 提供了哪些常用组件？',
            prompt: 'TDesign 提供了哪些常用组件？',
          },
        ],
      },
    ],
  },
];

// 使用 useChat Hook
const { chatEngine, messages, status } = useChat({
  defaultMessages,
  chatServiceConfig: {
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
    stream: true,
    onMessage: (chunk: SSEChunkData): AIMessageContent => {
      const { ...rest } = chunk.data;
      return {
        type: 'markdown',
        data: rest?.msg || '',
      };
    },
  },
});

// 模拟历史消息数据（通常从后端接口获取）
const historyMessages: ChatMessagesData[] = [
  {
    id: 'history-1',
    role: 'user',
    datetime: '2024-01-01 10:00:00',
    content: [
      {
        type: 'text',
        data: 'TDesign 支持哪些框架？',
      },
    ],
  },
  {
    id: 'history-2',
    role: 'assistant',
    datetime: '2024-01-01 10:00:05',
    status: 'complete',
    content: [
      {
        type: 'markdown',
        data: 'TDesign 目前支持以下框架：\n\n- **React**\n- **Vue 2/3**\n- **Flutter**\n- **小程序**',
      },
    ],
  },
  {
    id: 'history-3',
    role: 'user',
    datetime: '2024-01-01 10:01:00',
    content: [
      {
        type: 'text',
        data: '如何安装 TDesign React？',
      },
    ],
  },
  {
    id: 'history-4',
    role: 'assistant',
    datetime: '2024-01-01 10:01:03',
    status: 'complete',
    content: [
      {
        type: 'markdown',
        data: '安装 TDesign React 非常简单：\n\n```bash\nnpm install tdesign-react\n```',
      },
    ],
  },
];

// 切换消息模式
const handleModeChange = (value: string) => {
  if (value === 'history') {
    chatEngine.value?.setMessages(historyMessages, 'replace');
  } else {
    chatEngine.value?.setMessages(defaultMessages, 'replace');
  }
};

// 发送消息
const handleSend = async (params: string) => {
  await chatEngine.value?.sendUserMessage({ prompt: params });
  inputValue.value = '';
};

// 点击建议问题
const handleSuggestionClick = (prompt: string) => {
  inputValue.value = prompt;
};

// 停止生成
const handleStop = () => {
  chatEngine.value?.abortChat();
};
</script>
<style scoped lang="less">
.op-button-area {
  position: absolute;
  top: -40px;
  left: -40px;
  width: calc(100% + 80px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  background: #f5f5f5;
}
</style>
