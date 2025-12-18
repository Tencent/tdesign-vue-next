<template>
  <div>
    <!-- 操作按钮 -->
    <div class="quick-actions">
      <div class="actions-title">快捷指令：</div>
      <div class="actions-buttons">
        <t-button variant="outline" size="small" :disabled="hasHistory" @click="loadHistory"> 加载历史消息 </t-button>
        <t-button variant="outline" size="small" :disabled="!hasHistory" @click="clearMessages">
          清空历史消息
        </t-button>
      </div>
    </div>
    <!-- 聊天组件 -->
    <div style="height: 500px">
      <t-chatbot
        ref="chatRef"
        :default-messages="defaultMessages"
        :message-props="messageProps"
        :chat-service-config="chatServiceConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  type SSEChunkData,
  type AIMessageContent,
  type ChatRequestParams,
  type ChatMessagesData,
  type ChatServiceConfig,
  type TdChatbotApi,
} from '@tdesign-vue-next/chat';

/**
 * 初始化消息示例
 *
 * 学习目标：
 * - 使用 defaultMessages 设置欢迎语和建议问题
 * - 通过 setMessages 动态加载历史消息
 * - 实现点击建议问题填充输入框
 */

const chatRef = ref<TdChatbotApi | null>(null);
const hasHistory = ref(false);

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
            title: 'TDesign 是什么？',
            prompt: '请介绍一下 TDesign 设计体系',
          },
          {
            title: '如何快速上手？',
            prompt: 'TDesign React 如何快速开始使用？',
          },
          {
            title: '有哪些组件？',
            prompt: 'TDesign 提供了哪些常用组件？',
          },
        ],
      },
    ],
  },
];

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

// 加载历史消息
const loadHistory = () => {
  chatRef.value?.setMessages(historyMessages, 'replace');
  hasHistory.value = true;
};

// 清空消息
const clearMessages = () => {
  chatRef.value?.clearMessages();
  hasHistory.value = false;
};

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
  stream: true,
  onMessage: (chunk: SSEChunkData): AIMessageContent => {
    const { ...rest } = chunk.data as any;
    return {
      type: 'markdown',
      data: rest?.msg || '',
    };
  },
};

// 消息配置：处理建议问题点击
const messageProps = {
  assistant: {
    handleActions: {
      // 点击建议问题时，填充到输入框
      suggestion: ({ content }) => {
        chatRef.value?.addPrompt(content.prompt);
      },
    },
  },
};
</script>

<style scoped lang="less">
.quick-actions {
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;

  .actions-title {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  .actions-buttons {
    display: flex;
    gap: 8px;
  }
}
</style>
