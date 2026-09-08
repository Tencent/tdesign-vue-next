<template>
  <div class="json-render-demo">
    <div class="json-render-demo__header">
      <h3>完整自定义组件 + json-render 演示</h3>
      <p>AI 生成符合 Catalog 约束的 JSON → json-render 引擎解析 → Registry 查找组件实现 → 渲染真实 UI</p>
      <div v-if="currentStage" class="json-render-demo__status">当前状态: {{ currentStage }}</div>
    </div>

    <t-chat-list ref="listRef" class="json-render-demo__list">
      <template v-for="message in messages" :key="message.id">
        <t-chat-message
          :message="getTextMessage(message)"
          :placement="message.role === 'user' ? 'right' : 'left'"
          :variant="message.role === 'user' ? 'base' : 'text'"
        >
        </t-chat-message>
        <div
          v-for="{ item, index } in getActivityContents(message)"
          :key="`${message.id}-activity-${index}`"
          class="json-render-demo__activity"
        >
          <ActivityRenderer :activity="item.data" />
        </div>
      </template>
    </t-chat-list>

    <t-chat-sender
      v-model="inputValue"
      placeholder="试试：测试深层嵌套更新、创建任务进度表单"
      :loading="status === 'pending' || status === 'streaming'"
      @send="handleSend"
      @stop="handleStop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { z } from 'zod';
import {
  ActivityRenderer,
  createCustomRegistry,
  createJsonRenderActivityConfig,
  generateCatalogPrompt,
  isActivityContent,
  useAgentActivity,
  useChat,
  type ChatRequestParams,
  type ChatMessagesData,
} from '@tdesign-vue-next/chat';
import JsonRenderDiv from './components/json-render-div.vue';
import NestedPanel from './components/nested-panel.vue';
import ProgressBar from './components/progress-bar.vue';
import StatusCard from './components/status-card.vue';

const MOCK_SERVER = 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com';
const inputValue = ref('测试深层嵌套更新');
const currentStage = ref('');
const listRef = ref();

const systemPrompt = generateCatalogPrompt({
  name: 'vue-dashboard',
  components: {
    StatusCard: {
      props: z.object({
        title: z.string(),
        status: z.enum(['success', 'warning', 'error', 'info']),
        description: z.string().optional(),
        icon: z.string().optional(),
      }),
      description: '状态信息卡片',
    },
    ProgressBar: {
      props: z.object({
        label: z.string().optional(),
        percentage: z.number().min(0).max(100),
        showInfo: z.boolean().optional(),
      }),
      description: '任务进度条',
    },
    NestedPanel: {
      props: z.object({
        title: z.string(),
        level: z.number().min(1).max(10).optional(),
        collapsed: z.boolean().optional(),
        borderColor: z.string().optional(),
        backgroundColor: z.string().optional(),
      }),
      description: '支持深层嵌套的容器',
      hasChildren: true,
    },
  },
  actions: {
    refresh: { description: '刷新数据' },
    export: { description: '导出数据' },
  },
});

const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: `${MOCK_SERVER}/sse/json-render-activity`,
    protocol: 'agui',
    stream: true,
    onRequest: (params: ChatRequestParams) => ({
      body: JSON.stringify({
        uid: 'agui-json-render-full-custom-demo',
        prompt: params.prompt,
        demoMode: true,
        systemPrompt,
        userActionMessage: (params as any).userActionMessage,
      }),
    }),
    onStart: () => {
      currentStage.value = '🚀 开始流式传输';
    },
    onComplete: () => {
      currentStage.value = '✅ 传输完成';
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : '请求失败';
      currentStage.value = `❌ 错误: ${message}`;
      MessagePlugin.error(message);
    },
  },
});

const registry = createCustomRegistry({
  StatusCard,
  ProgressBar,
  NestedPanel,
  Div: JsonRenderDiv,
});

useAgentActivity(
  createJsonRenderActivityConfig({
    activityType: 'json-render-main-card',
    registry,
    actionHandlers: {
      submit: async (params) => {
        await chatEngine.value?.sendAIMessage({
          params: {
            userActionMessage: {
              name: 'submit',
              params,
              timestamp: new Date().toISOString(),
            },
          },
          sendRequest: true,
        });
        MessagePlugin.success('提交成功');
      },
      reset: () => MessagePlugin.info('表单已重置'),
      cancel: () => MessagePlugin.info('已取消'),
      refresh: () => MessagePlugin.info('数据已刷新'),
      export: () => MessagePlugin.success('导出成功'),
    },
  }),
);

const getActivityContents = (message: ChatMessagesData) =>
  Array.isArray(message.content)
    ? message.content.map((item, index) => ({ item, index })).filter(({ item }) => isActivityContent(item))
    : [];

const getTextMessage = (message: ChatMessagesData): ChatMessagesData => ({
  ...message,
  content: Array.isArray(message.content)
    ? message.content.filter((item) => !isActivityContent(item))
    : message.content,
});

const handleSend = async (value: string) => {
  if (!value.trim()) return;
  currentStage.value = '';
  await chatEngine.value?.sendUserMessage({ prompt: value });
  inputValue.value = '';
};

const handleStop = () => {
  chatEngine.value?.abortChat();
  MessagePlugin.info('已停止生成');
};
</script>

<style scoped>
.json-render-demo {
  display: flex;
  flex-direction: column;
  height: 600px;
}

.json-render-demo__header {
  padding: 12px;
  margin-bottom: 16px;
  background: #f5f5f5;
  border-radius: 4px;
}

.json-render-demo__header h3 {
  margin: 0;
  font-size: 16px;
}

.json-render-demo__header p {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--td-text-color-secondary);
}

.json-render-demo__status {
  margin-top: 8px;
  font-size: 12px;
  color: var(--td-text-color-primary);
}

.json-render-demo__list {
  flex: 1;
  overflow: auto;
}

.json-render-demo__activity {
  width: 100%;
  margin-bottom: var(--td-comp-margin-xxl);
}
</style>
