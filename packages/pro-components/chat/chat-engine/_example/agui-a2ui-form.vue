<template>
  <div class="a2ui-form-demo">
    <t-alert theme="info">
      A2UI v0.9.1 多 Surface 示例：表单数据双向绑定，Action 参数从 dataModel 实时解析，并支持自定义 Vue 组件。
    </t-alert>

    <t-chat-list ref="listRef" class="a2ui-form-demo__list">
      <t-chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :placement="message.role === 'user' ? 'right' : 'left'"
        :variant="message.role === 'user' ? 'base' : 'text'"
        allow-content-segment-custom
      >
        <template v-if="Array.isArray(message.content)">
          <template v-for="(item, index) in message.content" :key="`${message.id}-${index}`">
            <div v-if="isActivityContent(item as any)" :slot="`${item.type}-${index}`">
              <ActivityRenderer :activity="(item as any).data" />
            </div>
          </template>
        </template>
      </t-chat-message>
    </t-chat-list>

    <t-chat-sender
      v-model="inputValue"
      placeholder="发送任意消息开始，随后填写并提交预约表单"
      :loading="status === 'pending' || status === 'streaming'"
      @send="handleSend"
      @stop="chatEngine?.abortChat()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {
  ActivityRenderer,
  createA2UIJsonRenderActivityConfig,
  createA2UIRegistry,
  isActivityContent,
  useAgentActivity,
  useChat,
  type ChatRequestParams,
} from '@tdesign-vue-next/chat';
import BookingSummary from './components/booking-summary.vue';

const MOCK_SERVER = 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com';
const inputValue = ref('开始预约会议');
const listRef = ref();

type A2UIActionParams = ChatRequestParams<{
  action?: {
    name: string;
    context?: Record<string, unknown>;
    timestamp?: string;
  };
}>;

const customRegistry = createA2UIRegistry({
  BookingSummary,
});

const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: `${MOCK_SERVER}/sse/a2ui-form`,
    protocol: 'agui',
    stream: true,
    onRequest: (params: ChatRequestParams) => {
      const action = (params as A2UIActionParams).action;
      return {
        body: JSON.stringify({
          uid: 'a2ui-form-vue-demo',
          prompt: params.prompt,
          ...(action ? { version: 'v0.9.1', action } : {}),
        }),
      };
    },
    onError: (error) => MessagePlugin.error(error instanceof Error ? error.message : '请求失败'),
  },
});

const sendAction = async (name: string, context: Record<string, unknown>) => {
  await chatEngine.value?.sendAIMessage({
    params: {
      action: {
        name,
        context,
        timestamp: new Date().toISOString(),
      },
    } as ChatRequestParams,
    sendRequest: true,
  });
};

useAgentActivity(
  createA2UIJsonRenderActivityConfig({
    activityType: 'a2ui-form',
    registry: customRegistry,
    actionHandlers: {
      submitBooking: async (params) => {
        if (!String(params.topic || '').trim()) {
          MessagePlugin.warning('请先填写会议主题');
          return;
        }
        await sendAction('submitBooking', params);
      },
      confirmBooking: (params) => sendAction('confirmBooking', params),
    },
  }),
);

const handleSend = async (value: string) => {
  if (!value.trim()) return;
  await chatEngine.value?.sendUserMessage({ prompt: value });
  inputValue.value = '';
};
</script>

<style scoped>
.a2ui-form-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 650px;
}

.a2ui-form-demo__list {
  flex: 1;
  overflow: auto;
}
</style>
