<template>
  <div style="height: 600px; display: flex; flex-direction: column">
    <t-chat-list ref="listRef" style="width: 100%" @scroll="onScrollHandler">
      <t-chat-message
        v-for="(message, idx) in messages"
        :key="message.id"
        v-bind="messageProps[message.role]"
        :message="message"
      >
        <template #actionbar>
          <t-chat-action
            v-if="isAIMessage(message) && message.status === 'complete'"
            :action-bar="getChatActionBar(idx === messages.length - 1)"
            :content="getMessageContentForCopy(message)"
            :comment="message.role === 'assistant' ? message.comment : ''"
            @actions="actionHandler"
          />
        </template>
      </t-chat-message>
    </t-chat-list>
    <t-chat-sender
      ref="inputRef"
      v-model="inputValue"
      placeholder="请输入内容"
      :loading="senderLoading"
      @change="inputChangeHandler"
      @send="sendHandler"
      @stop="stopHandler"
    >
      <template #suffix="{ renderPresets }">
        <!-- 在这里可以进行自由的组合使用，或者新增预设 -->
        <!-- 不需要附件操作的使用方式 -->
        <component :is="renderPresets([])" />
      </template>
    </t-chat-sender>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  type SSEChunkData,
  type TdChatMessageConfig,
  type AIMessageContent,
  type ChatRequestParams,
  type ChatMessagesData,
  TdChatListApi,
  TdChatSenderApi,
  isAIMessage,
  getMessageContentForCopy,
  TdChatActionsName,
} from 'tdesign-web-components';
import mockData from './mock/data';
import { useChat } from '@tdesign/pro-components-chat';
import { MessagePlugin } from 'tdesign-vue-next';

// 状态管理
const listRef = ref<TdChatListApi | null>(null);
const inputRef = ref<TdChatSenderApi | null>(null);
const inputValue = ref<string>('南极的自动提款机叫什么名字');

// 使用聊天引擎
const { chatEngine, messages, status } = useChat({
  defaultMessages: mockData.normal,
  chatServiceConfig: {
    endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal`,
    stream: true,
    onComplete: (aborted: boolean, params: RequestInit) => {
      console.log('onComplete', aborted, params);
    },
    onError: (err: Error | Response) => {
      console.error('Chatservice Error:', err);
    },
    onAbort: async () => {
      console.log('中断');
    },
    onMessage: (chunk: SSEChunkData): AIMessageContent => {
      const { type, ...rest } = chunk.data as any;
      switch (type) {
        case 'search':
          return {
            type: 'search',
            data: {
              title: rest.title || `搜索到${rest?.docs?.length}条内容`,
              references: rest?.content,
            },
          };
        case 'think':
          return {
            type: 'thinking',
            status: (currentStatus: string | undefined) =>
              /耗时/.test(rest?.title) ? 'complete' : currentStatus || 'loading',
            data: {
              title: rest.title || '深度思考中',
              text: rest.content || '',
            },
          };
        case 'text':
          return {
            type: 'markdown',
            data: rest?.msg || '',
          };
        default:
          return { type: 'text', data: '' };
      }
    },
    onRequest: (innerParams: ChatRequestParams) => {
      const { prompt } = innerParams;
      return {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          uid: 'abcd',
          prompt,
          think: true,
          search: true,
        }),
      };
    },
  },
});

// 计算发送器加载状态
const senderLoading = computed(() => {
  return status.value === 'pending' || status.value === 'streaming';
});

// 消息属性配置
const messageProps: TdChatMessageConfig = {
  user: {
    variant: 'base',
    placement: 'right',
  },
  assistant: {
    placement: 'left',
    chatContentProps: {
      thinking: {
        maxHeight: 100,
      },
    },
  },
};

// 获取聊天操作栏配置
const getChatActionBar = (isLast: boolean): TdChatActionsName[] => {
  let filterActions: TdChatActionsName[] = ['replay', 'good', 'bad', 'copy'];
  if (!isLast) {
    filterActions = filterActions.filter((item) => item !== 'replay') as TdChatActionsName[];
  }
  return filterActions;
};

// 操作处理
const actionHandler = (name) => {
  switch (name) {
    case 'replay':
      console.log('自定义重新回复');
      chatEngine.value?.regenerateAIMessage();
      break;
    default:
      console.log('触发action', name);
  }
};

// 发送用户消息
const sendUserMessage = async (requestParams: ChatRequestParams) => {
  await chatEngine.value?.sendUserMessage(requestParams);
  listRef.value?.scrollToBottom();
};

// 输入变更处理
const inputChangeHandler = (value: string) => {
  inputValue.value = value;
};

// 发送处理
const sendHandler = async (params) => {
  if (senderLoading.value) {
    MessagePlugin.error('回答输出中，请稍后操作或点击停止回答');
  } else {
    await sendUserMessage({ prompt: params });
    inputValue.value = '';
  }
};

// 停止处理
const stopHandler = () => {
  chatEngine.value?.abortChat();
};

// 滚动处理
const onScrollHandler = (e: Event) => {
  console.log('===scroll', e);
};
</script>
