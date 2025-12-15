<template>
  <div>
    <!-- 操作按钮区域 -->
    <div style="margin-bottom: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px">
      <div style="margin-bottom: 8px; font-size: 14px; font-weight: 500">快捷指令：</div>
      <t-space size="small" break-line>
        <t-button size="small" variant="outline" @click="handleSendUserMessage"> 发送用户消息 </t-button>
        <t-button size="small" variant="outline" @click="handleSendAIMessage"> 发送AI消息 </t-button>
        <t-button size="small" variant="outline" @click="handleSendSystemMessage"> 发送系统消息 </t-button>
        <t-button size="small" variant="outline" @click="handleSetMessages"> 批量设置消息 </t-button>
        <t-button size="small" variant="outline" @click="handleClearMessages"> 清空消息 </t-button>
        <t-button size="small" variant="outline" @click="handleRegenerate"> 重新生成 </t-button>
        <t-button size="small" variant="outline" @click="handleAbort"> 中止请求 </t-button>
        <t-button size="small" variant="outline" @click="handleAddPrompt"> 填充提示语 </t-button>
        <t-button size="small" variant="outline" @click="handleGetStatus"> 获取状态 </t-button>
      </t-space>
    </div>

    <!-- 聊天界面 -->
    <div style="height: 400px; display: flex; flex-direction: column">
      <t-chat-list :clear-history="false">
        <t-chat-message
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :placement="message.role === 'user' ? 'right' : 'left'"
          :variant="message.role === 'user' ? 'base' : 'text'"
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
import { type SSEChunkData, type AIMessageContent, useChat } from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';

/**
 * 实例方法示例
 *
 * 学习目标：
 * - 通过 chatEngine 调用实例方法
 * - 了解各种实例方法的使用场景
 *
 * 方法分类：
 * 1. 消息设置：sendUserMessage、sendSystemMessage、setMessages
 * 2. 发送控制: regenerateAIMessage、abortChat
 * 3. 获取状态
 */

const inputValue = ref<string>('');

const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
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

// 1. 发送用户消息
const handleSendUserMessage = () => {
  chatEngine.value?.sendUserMessage({
    prompt: '这是通过实例方法发送的用户消息',
  });
};

const handleSendAIMessage = () => {
  chatEngine.value?.sendAIMessage({
    params: {
      prompt: '这是通过实例方法发送的用户消息',
    },
    content: [
      {
        type: 'text',
        data: '这是通过实例方法发送的AI回答',
      },
    ],
    sendRequest: false,
  });
};

// 2. 发送系统消息
const handleSendSystemMessage = () => {
  chatEngine.value?.sendSystemMessage('这是一条系统通知消息');
};

// 3. 填充提示语到输入框
const handleAddPrompt = () => {
  inputValue.value = '请介绍一下 TDesign';
};

// 4. 批量设置消息
const handleSetMessages = () => {
  chatEngine.value?.setMessages(
    [
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: [{ type: 'text', data: '这是通过 setMessages 设置的消息' }],
        status: 'complete',
      },
    ],
    'replace',
  );
};

// 5. 清空消息
const handleClearMessages = () => {
  chatEngine.value?.setMessages([], 'replace');
};

// 6. 重新生成最后一条消息
const handleRegenerate = () => {
  chatEngine.value?.regenerateAIMessage();
};

// 7. 中止当前请求
const handleAbort = () => {
  chatEngine.value?.abortChat();
  MessagePlugin.info('已中止当前请求');
};

// 8. 获取当前状态
const handleGetStatus = () => {
  const statusInfo = {
    chatStatus: status.value,
    messagesCount: messages.value.length,
  };
  console.log('当前状态:', statusInfo);
  MessagePlugin.info(`状态: ${statusInfo.chatStatus}, 消息数: ${statusInfo.messagesCount}`);
};

// 发送消息
const handleSend = async (params: string) => {
  await chatEngine.value?.sendUserMessage({ prompt: params });
  inputValue.value = '';
};

// 停止生成
const handleStop = () => {
  chatEngine.value?.abortChat();
};
</script>
