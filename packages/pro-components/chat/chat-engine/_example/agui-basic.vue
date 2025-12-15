<template>
  <div style="height: 500px; display: flex; flex-direction: column">
    <t-chat-list ref="listRef" :clear-history="false">
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
      placeholder="请输入内容，体验 AG-UI 协议"
      :loading="status === 'pending' || status === 'streaming'"
      @send="handleSend"
      @stop="handleStop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type ChatRequestParams, type TdChatListApi, AGUIAdapter, useChat } from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';

/**
 * AG-UI 协议基础示例
 *
 * 学习目标：
 * - 开启 AG-UI 协议支持（protocol: 'agui'）
 * - 理解 AG-UI 协议的自动解析机制
 * - 处理文本消息事件（TEXT_MESSAGE_*）
 * - 初始化加载历史消息方法 AGUIAdapter.convertHistoryMessages
 */

const inputValue = ref<string>('AG-UI协议的作用是什么');
const listRef = ref<TdChatListApi | null>(null);

const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/agui-simple',
    // 开启 AG-UI 协议解析支持
    protocol: 'agui',
    stream: true,
    // 自定义请求参数
    onRequest: (params: ChatRequestParams) => ({
      body: JSON.stringify({
        uid: 'agui-demo',
        prompt: params.prompt,
      }),
    }),
    // 生命周期回调
    onStart: (chunk) => {
      console.log('AG-UI 流式传输开始:', chunk);
    },
    onComplete: (aborted, params, event) => {
      console.log('AG-UI 流式传输完成:', { aborted, event });
    },
    onError: (err) => {
      console.error('AG-UI 错误:', err);
    },
  },
});

// 初始化加载历史消息
onMounted(async () => {
  try {
    const response = await fetch(
      'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/api/conversation/history?type=simple',
    );
    const result = await response.json();
    if (result.success && result.data) {
      const convertedMessages = AGUIAdapter.convertHistoryMessages(result.data);
      chatEngine.value?.setMessages(convertedMessages);
      listRef.value?.scrollToBottom();
    }
  } catch (error) {
    console.error('加载历史消息出错:', error);
    MessagePlugin.error('加载历史消息出错');
  }
});

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
