<template>
  <div style="height: 598px; margin-top: 12px; display: flex; flex-direction: column">
    <t-chat-list ref="listRef" :clear-history="false">
      <t-chat-message
        v-for="(message, idx) in messages"
        :key="message.id"
        :message="message"
        :variant="messageProps[message.role]?.variant"
        :placement="messageProps[message.role]?.placement"
        :handle-actions="{
          suggestion: ({ content }) => handleSuggestionClick(content.prompt),
        }"
        allow-content-segment-custom
      >
        <!-- 工具调用内容 -->
        <template v-for="(item, index) in message.content" :key="`content-${index}`">
          <div v-if="isToolCallContent(item)" :slot="`${item.type}-${index}`">
            <tool-call-renderer :tool-call="item.data" @respond="handleToolCallRespond" />
          </div>
        </template>

        <!-- 操作栏 -->
        <template #actionbar>
          <t-chat-actionbar
            v-if="isAIMessage(message) && message.status === 'complete'"
            :action-bar="getActionBar(idx === messages.length - 1)"
            @actions="handleAction"
          />
          <t-chat-loading v-else-if="idx === messages.length - 1 && message.status !== 'stop'" animation="dot" />
        </template>
      </t-chat-message>
    </t-chat-list>

    <t-chat-sender
      v-model="inputValue"
      placeholder="请描述您想要生成的图片，例如：赛博朋克风格的城市夜景"
      :loading="senderLoading"
      @send="handleSend"
      @stop="handleStop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  type TdChatMessageConfig,
  type ChatRequestParams,
  type ToolCall,
  type AgentToolcallConfig,
  type TdChatActionsName,
  type ChatMessagesData,
  useChat,
  useAgentToolcall,
  isAIMessage,
  isToolCallContent,
  ToolCallRenderer,
} from '@tdesign-vue-next/chat';
import ImageGenProgress from './components/ImageGenProgress.vue';

/**
 * AG-UI 工具调用示例
 *
 * 演示如何使用 useAgentToolcall 和 ToolCallRenderer 实现工具调用功能
 */

const listRef = ref<any>(null);
const inputValue = ref<string>('请帮我生成一张3D风格海报，应用于B端产品的场景，整体色调是蓝白色系');
const defaultMessages: ChatMessagesData[] = [
  {
    id: 'demo-2',
    role: 'assistant',
    datetime: '2024-01-01 10:00:05',
    content: [
      // 3. Markdown 内容
      {
        type: 'markdown',
        data: `欢迎使用TDesign智能生图助手，请先写下你的创意，可以试试上传参考图哦～`,
      },
    ],
  },
];

// 图片生成工具调用配置
const imageGenActions: AgentToolcallConfig[] = [
  // {
  //   name: 'generate_image',
  //   description: '生成图片',
  //   parameters: [
  //     { name: 'taskId', type: 'string', required: true },
  //     { name: 'prompt', type: 'string', required: true },
  //   ],
  //   component: ImageGenStart,
  // },
  {
    name: 'show_progress',
    description: '展示图片生成进度',
    parameters: [{ name: 'taskId', type: 'string', required: true }],
    subscribeKey: (props) => props.args?.taskId,
    component: ImageGenProgress,
  },
];

// 注册工具
useAgentToolcall(imageGenActions);

// 创建聊天服务配置
const createChatServiceConfig = () => ({
  endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/image-gen',
  protocol: 'agui' as const,
  stream: true,
  onError: (err: Error | Response) => {
    console.error('图片生成服务错误:', err);
  },
  onRequest: (innerParams: ChatRequestParams) => {
    const { prompt, toolCallMessage } = innerParams;
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 'image_gen_uid',
        prompt,
        toolCallMessage,
      }),
    };
  },
});

const { chatEngine, messages, status } = useChat({
  defaultMessages,
  chatServiceConfig: createChatServiceConfig(),
});

const senderLoading = computed(() => status.value === 'pending' || status.value === 'streaming');

// 消息属性配置
const messageProps: TdChatMessageConfig = {
  user: { variant: 'base', placement: 'right' },
  assistant: {
    placement: 'left',
    handleActions: {
      suggestion: (data) => {
        inputValue.value = data.content.prompt;
      },
    },
  },
};

// 操作栏配置
const getActionBar = (isLast: boolean): TdChatActionsName[] => {
  const actions: TdChatActionsName[] = ['good', 'bad'];
  if (isLast) actions.unshift('replay');
  return actions;
};

// 操作处理
const handleAction = (name: string) => {
  if (name === 'replay') {
    chatEngine.value?.regenerateAIMessage();
  }
};

// 处理工具调用响应
const handleToolCallRespond = async <T extends object = any>(toolcall: ToolCall, response: T) => {
  const tools = chatEngine.value?.getToolcallByName(toolcall.toolCallName) || {};
  await chatEngine.value?.sendAIMessage({
    params: {
      prompt: inputValue.value,
      toolCallMessage: { ...tools, result: JSON.stringify(response) },
    },
    sendRequest: true,
  });
};

// 发送消息
const handleSend = async (params: string) => {
  await chatEngine.value?.sendUserMessage({ prompt: params });
  inputValue.value = '';
};

const handleSuggestionClick = (prompt: string) => {
  inputValue.value = prompt;
};

// 停止生成
const handleStop = () => {
  chatEngine.value?.abortChat();
};
</script>
