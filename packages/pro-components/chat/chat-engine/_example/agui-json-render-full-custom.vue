<template>
  <div class="json-render-demo">
    <div class="json-render-demo__header">
      <strong>完整自定义组件 + json-render</strong>
      <span>Catalog 约束 AI 输出，Registry 决定 Vue 组件实现</span>
      <t-tag v-if="currentStage" theme="primary" variant="light">{{ currentStage }}</t-tag>
    </div>

    <t-chat-list ref="listRef" class="json-render-demo__list">
      <t-chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :placement="message.role === 'user' ? 'right' : 'left'"
        :variant="message.role === 'user' ? 'base' : 'text'"
      >
        <template v-if="Array.isArray(message.content)">
          <template v-for="(item, index) in message.content" :key="`${message.id}-${index}`">
            <ActivityRenderer v-if="isActivityContent(item)" :activity="item.data" />
          </template>
        </template>
      </t-chat-message>
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
} from '@tdesign-vue-next/chat';
import { NestedPanel, ProgressBar, StatusCard } from './components/JsonRenderCustomComponents';

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
        uid: 'agui-json-render-vue-demo',
        prompt: params.prompt,
        demoMode: true,
        systemPrompt,
        userActionMessage: (params as any).userActionMessage,
      }),
    }),
    onStart: () => {
      currentStage.value = '开始流式传输';
    },
    onComplete: () => {
      currentStage.value = '传输完成';
    },
    onError: (error) => {
      currentStage.value = '请求失败';
      MessagePlugin.error(error instanceof Error ? error.message : '请求失败');
    },
  },
});

const registry = createCustomRegistry({
  StatusCard,
  ProgressBar,
  NestedPanel,
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
  height: 680px;
}

.json-render-demo__header {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  margin-bottom: 12px;
  background: var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}

.json-render-demo__header span {
  color: var(--td-text-color-secondary);
}

.json-render-demo__list {
  flex: 1;
  overflow: auto;
}
</style>
