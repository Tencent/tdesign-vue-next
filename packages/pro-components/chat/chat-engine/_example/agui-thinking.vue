<template>
  <div class="agui-thinking-demo">
    <t-chat-list :clear-history="false">
      <t-chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :placement="message.role === 'user' ? 'right' : 'left'"
        :variant="message.role === 'user' ? 'base' : 'text'"
      />
    </t-chat-list>

    <div class="agui-thinking-demo__result">
      <span>当前状态：{{ status }}</span>
      <span data-testid="agui-thinking-text">思考内容：{{ thinkingText || '等待运行' }}</span>
    </div>

    <t-button :loading="status === 'pending' || status === 'streaming'" @click="runThinkingStream">
      运行 THINKING 冻结回归流
    </t-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isAIMessage, isThinkingContent, useChat } from '@tdesign-vue-next/chat';

const events = [
  { type: 'RUN_STARTED', threadId: 'thinking-thread', runId: 'thinking-run' },
  { type: 'THINKING_START', title: '思考中...' },
  { type: 'THINKING_TEXT_MESSAGE_START' },
  { type: 'THINKING_TEXT_MESSAGE_CONTENT', delta: '第一段' },
  { type: 'THINKING_TEXT_MESSAGE_CONTENT', delta: '第二段' },
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
    protocol: 'agui',
    stream: true,
    onRequest: () => ({ method: 'GET' }),
  },
});

const thinkingText = computed(() => {
  for (let messageIndex = messages.value.length - 1; messageIndex >= 0; messageIndex -= 1) {
    const message = messages.value[messageIndex];
    if (!isAIMessage(message)) continue;

    for (let contentIndex = message.content.length - 1; contentIndex >= 0; contentIndex -= 1) {
      const content = message.content[contentIndex];
      if (isThinkingContent(content)) return content.data.text || '';
    }
  }
  return '';
});

const runThinkingStream = async () => {
  await chatEngine.value?.sendUserMessage({ prompt: '请运行思考流' });
};
</script>

<style scoped>
.agui-thinking-demo {
  display: flex;
  height: 500px;
  flex-direction: column;
  gap: 12px;
}

.agui-thinking-demo__result {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--td-text-color-secondary);
  font-size: 12px;
}
</style>
