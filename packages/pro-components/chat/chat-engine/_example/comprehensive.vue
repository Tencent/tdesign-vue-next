<template>
  <div style="height: 598px; margin-top: 12px; display: flex; flex-direction: column">
    <t-chat-list :clear-history="false" style="flex: 1">
      <t-chat-message
        v-for="(message, idx) in messages"
        :key="message.id"
        :message="message"
        :variant="message.role === 'user' ? 'base' : undefined"
        :placement="message.role === 'user' ? 'right' : 'left'"
        :avatar="message.role === 'user' ? 'https://tdesign.gtimg.com/site/avatar.jpg' : undefined"
        :handle-actions="message.role === 'user' ? {} : handleMsgActions"
        :chat-content-props="
          message.role === 'assistant'
            ? {
                thinking: {
                  maxHeight: 100,
                  layout: 'block',
                  collapsed: message.content?.find((item) => item.type === 'thinking')?.status === 'complete',
                },
              }
            : {}
        "
        allow-content-segment-custom
      >
        <t-chat-action-bar
          v-if="isAIMessage(message) && message.status === 'complete'"
          slot="actionbar"
          :action-bar="getActionBar(message, idx === messages.length - 1)"
          :copy-text="getMessageContentForCopy(message)"
          @actions="handleAction"
        />
        <t-chat-loading v-else animation="dot" />
      </t-chat-message>
    </t-chat-list>

    <t-chat-sender
      v-model="inputValue"
      :textarea-props="{
        placeholder: '有问题，尽管问～ Enter 发送，Shift+Enter 换行',
      }"
      :loading="status === 'pending' || status === 'streaming'"
      @send="handleSend"
      @stop="handleStop"
    >
      <!-- 自定义输入框底部区域 -->
      <template #footer-prefix>
        <t-space align="center" size="small">
          <t-button
            variant="outline"
            shape="round"
            :theme="activeR1 ? 'primary' : 'default'"
            @click="activeR1 = !activeR1"
          >
            R1.深度思考
          </t-button>
          <t-button
            variant="outline"
            :theme="activeSearch ? 'primary' : 'default'"
            shape="round"
            @click="activeSearch = !activeSearch"
          >
            <template #icon>
              <internet-icon />
            </template>
            联网查询
          </t-button>
        </t-space>
      </template>
    </t-chat-sender>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  type SSEChunkData,
  type AIMessageContent,
  type ChatMessagesData,
  type ChatRequestParams,
  type TdChatActionsName,
  useChat,
  isAIMessage,
  getMessageContentForCopy,
} from '@tdesign-vue-next/chat';
import { InternetIcon } from 'tdesign-icons-vue-next';

/**
 * 综合示例
 *
 * 本示例展示如何综合使用多个功能：
 * - 初始消息和建议问题
 * - 消息配置（样式、操作按钮）
 * - 数据转换（思考过程、搜索结果、文本）
 * - 请求配置（自定义参数）
 * - 实例方法（重新生成、填充提示语）
 * - 自定义插槽（输入框底部区域）
 */

const inputValue = ref<string>('');
const activeR1 = ref<boolean>(true);
const activeSearch = ref<boolean>(true);
const reqParamsRef = ref<{ think: boolean; search: boolean }>({ think: false, search: false });

// 默认初始化消息
const defaultMessages: ChatMessagesData[] = [
  {
    id: '123',
    role: 'assistant',
    content: [
      {
        type: 'text',
        status: 'complete',
        data: '欢迎使用 TDesign Chatbot 智能助手，你可以这样问我：',
      },
      {
        type: 'suggestion',
        status: 'complete',
        data: [
          {
            title: '南极的自动提款机叫什么名字',
            prompt: '南极的自动提款机叫什么名字？',
          },
          {
            title: '南极自动提款机在哪里',
            prompt: '南极自动提款机在哪里',
          },
        ],
      },
    ],
  },
];

const { chatEngine, messages, status } = useChat({
  defaultMessages,
  chatServiceConfig: {
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
    stream: true,
    onComplete: (aborted: boolean, params: RequestInit) => {
      console.log('onComplete', aborted, params);
    },
    onError: (err: Error | Response) => {
      console.error('Chatservice Error:', err);
    },
    onMessage: (chunk: SSEChunkData): AIMessageContent | null => {
      console.log(chunk.data, 'chunk.data------');

      const { type, ...rest } = chunk.data;
      console.log(rest, 'rest-------');

      switch (type) {
        case 'search':
          return {
            type: 'search',
            data: {
              title: rest.title || `搜索到${rest?.docs?.length || 0}条内容`,
              references: rest?.content,
            },
          };
        case 'think':
          return {
            type: 'thinking',
            status: /耗时/.test(rest?.title) ? 'complete' : 'streaming',
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
      }
      return null;
    },
    onRequest: (innerParams: ChatRequestParams) => {
      const { prompt } = innerParams;
      return {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          uid: 'tdesign-chat',
          prompt,
          ...reqParamsRef.value,
        }),
      };
    },
  },
});

console.log(messages.value, 'messages.value------');

// 操作按钮配置
const getActionBar = (message: ChatMessagesData, isLast: boolean): TdChatActionsName[] => {
  const actions: TdChatActionsName[] = ['copy', 'good', 'bad'];
  if (isLast) {
    actions.push('replay');
  }
  return actions;
};

// 消息内容操作回调
const handleMsgActions = {
  suggestion: (data?: any) => {
    console.log('点击建议问题', data);
    inputValue.value = data?.content?.prompt || '';
  },
};

// 底部操作栏处理
const handleAction = (name: string, data?: any) => {
  console.log('触发操作栏action', name, 'data', data);
  switch (name) {
    case 'copy':
      console.log('复制');
      break;
    case 'good':
      console.log('点赞', data);
      break;
    case 'bad':
      console.log('点踩', data);
      break;
    case 'replay':
      console.log('重新生成');
      chatEngine.value?.regenerateAIMessage();
      break;
    default:
      console.log('其他操作', name, data);
  }
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

// 监听参数变化
watch(
  [activeR1, activeSearch],
  () => {
    reqParamsRef.value = {
      think: activeR1.value,
      search: activeSearch.value,
    };
  },
  { immediate: true },
);
</script>
