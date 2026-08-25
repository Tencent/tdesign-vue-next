<template>
  <div style="height: 500px; display: flex; flex-direction: column">
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
      placeholder="请输入内容，体验 AG-UI 协议"
      :loading="status === 'pending' || status === 'streaming'"
      @send="handleSend"
      @stop="handleStop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChat } from '@tdesign-vue-next/chat';

/**
 * AG-UI 协议基础示例
 *
 * 学习目标：
 * - 开启 AG-UI 协议支持（protocol: 'agui'）
 * - 理解 AG-UI 协议的自动解析机制
 * - 处理思考消息事件（THINKING_*）
 * - 验证连续的思考文本可以正常流式更新
 */

const inputValue = ref<string>('AG-UI协议的作用是什么');

const events = [
  { type: 'RUN_STARTED', threadId: 'thinking-thread', runId: 'thinking-run' },
  { type: 'THINKING_START', title: '思考中...' },
  { type: 'THINKING_TEXT_MESSAGE_START' },
  { type: 'THINKING_TEXT_MESSAGE_CONTENT', delta: '正在分析 AG-UI 协议的作用。' },
  { type: 'THINKING_TEXT_MESSAGE_CONTENT', delta: '它可以标准化 AI Agent 与前端之间的实时交互。' },
  { type: 'THINKING_TEXT_MESSAGE_END' },
  { type: 'THINKING_END', title: '思考结束' },
  { type: 'RUN_FINISHED', threadId: 'thinking-thread', runId: 'thinking-run' },
];

const endpoint = `data:text/event-stream;charset=utf-8,${encodeURIComponent(
  `${events.map((event) => `data: ${JSON.stringify(event)}`).join('\n\n')}\n\n`,
)}`;

const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint,
    // 开启 AG-UI 协议解析支持
    protocol: 'agui',
    stream: true,
    // 使用本地 SSE 数据，示例不依赖外部服务
    onRequest: () => ({ method: 'GET' }),
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
