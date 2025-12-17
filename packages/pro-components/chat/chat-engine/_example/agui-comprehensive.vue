<template>
  <div style="height: 658px; margin-top: 12px; display: flex; flex-direction: column; position: relative">
    <!-- 右侧进度面板：使用 useAgentState 订阅状态 -->
    <ProgressPanel />

    <t-chat-list ref="listRef" :clear-history="false">
      <t-chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :variant="messageProps[message.role]?.variant"
        :placement="messageProps[message.role]?.placement"
        allow-content-segment-custom
      >
        <!-- 工具调用内容 -->
        <template v-for="(item, index) in message.content" :key="`content-${index}`">
          <div v-if="isToolCallContent(item)" :slot="`${item.type}-${index}`">
            <tool-call-renderer :tool-call="item.data" @respond="handleToolCallRespond" />
          </div>
        </template>
      </t-chat-message>
    </t-chat-list>

    <t-chat-sender
      ref="inputRef"
      v-model="inputValue"
      placeholder="请输入您的旅游需求，例如：请为我规划一个北京3日游行程"
      :loading="senderLoading"
      @send="sendHandler"
      @stop="handleStop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  type TdChatMessageConfig,
  type TdChatListApi,
  type TdChatSenderApi,
  type ChatRequestParams,
  type ToolCall,
  type AgentToolcallConfig,
  useChat,
  useAgentToolcall,
  isToolCallContent,
  ToolCallRenderer,
} from '@tdesign-vue-next/chat';
import WeatherCard from './components/WeatherCard.vue';
import PlanningSteps from './components/PlanningSteps.vue';
import UserPreferencesForm from './components/UserPreferencesForm.vue';
import ProgressPanel from './components/ProgressPanel.vue';

/**
 * AG-UI 综合示例
 *
 * 模拟一个完整的旅游规划 Agent 场景，演示了如何使用 AG-UI 协议构建复杂的多步骤任务规划应用
 *
 * 核心特性：
 * - 多步骤流程：支持分步骤执行复杂任务
 * - 状态流式传输：实时更新应用状态
 * - Human-in-the-Loop：支持人机协作，在流程中插入用户输入环节
 * - 工具调用：集成外部工具调用，如天气查询、行程规划等
 * - 外部状态订阅：演示如何在对话组件外部订阅和展示工具执行状态
 */

const listRef = ref<TdChatListApi | null>(null);
const inputRef = ref<TdChatSenderApi | null>(null);
const inputValue = ref<string>('请为我规划一个北京3日游行程');

// 注册工具配置
const toolcallActions: AgentToolcallConfig[] = [
  {
    name: 'collect_user_preferences',
    description: '收集用户偏好',
    parameters: [{ name: 'destination', type: 'string', required: true }],
    component: UserPreferencesForm,
  },
  {
    name: 'query_weather',
    description: '查询目的地天气',
    parameters: [{ name: 'city', type: 'string', required: true }],
    component: WeatherCard,
  },
  {
    name: 'show_planning_steps',
    description: '展示规划步骤',
    parameters: [
      { name: 'destination', type: 'string', required: true },
      { name: 'days', type: 'number', required: true },
      { name: 'taskId', type: 'string', required: true },
    ],
    component: PlanningSteps,
    // 配置 subscribeKey，让组件订阅对应 taskId 的状态
    subscribeKey: (props) => props.args?.taskId,
  },
];

useAgentToolcall(toolcallActions);

// 聊天配置
const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/travel-planner',
    protocol: 'agui',
    stream: true,
    onRequest: (params: ChatRequestParams) => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: params.prompt,
        toolCallMessage: params.toolCallMessage,
      }),
    }),
  },
});

const senderLoading = computed(() => status.value === 'pending' || status.value === 'streaming');

// 消息配置
const messageProps: TdChatMessageConfig = {
  user: {
    variant: 'base',
    placement: 'right',
  },
  assistant: {
    placement: 'left',
  },
};

// 处理工具调用响应
const handleToolCallRespond = async (toolcall: ToolCall, response: any) => {
  // 判断如果是收集用户偏好的响应，则使用 toolcall 中的信息来构建新的请求
  if (toolcall.toolCallName === 'collect_user_preferences') {
    await chatEngine.value?.sendAIMessage({
      params: {
        toolCallMessage: {
          toolCallId: toolcall.toolCallId,
          toolCallName: toolcall.toolCallName,
          result: JSON.stringify(response),
        },
      },
      sendRequest: true,
    });
    listRef.value?.scrollToBottom();
  }
};

// 发送消息
const sendHandler = async (params: string) => {
  await chatEngine.value?.sendUserMessage({ prompt: params });
  inputValue.value = '';
};

// 停止生成
const handleStop = () => {
  chatEngine.value?.abortChat();
};
</script>
