<template>
  <t-space direction="vertical" size="large" style="width: 100%">
    <t-card title="发送请求" bordered>
      <t-space direction="vertical" style="width: 100%">
        <t-input v-model="inputValue" placeholder="创建一个任务进度面板" :disabled="isLoading" @enter="handleSend" />
        <t-space>
          <t-button theme="primary" :loading="isLoading" @click="handleSend">生成 UI</t-button>
          <t-button variant="outline" :disabled="!isLoading" @click="chatEngine?.abortChat()">停止</t-button>
          <t-button variant="text" @click="externalActivity = null">清空面板</t-button>
        </t-space>
      </t-space>
    </t-card>

    <t-card title="⚡ 对话框外部渲染面板" bordered class="external-panel">
      <template v-if="externalActivity">
        <details>
          <summary>查看原始 Schema</summary>
          <pre>{{ JSON.stringify(externalActivity, null, 2) }}</pre>
        </details>
        <JsonRenderActivityRenderer
          activity-type="json-render-main-card"
          :content="externalActivity"
          message-id="external-panel"
          :registry="registry"
          :action-handlers="actionHandlers"
        />
      </template>
      <t-empty v-else description="等待 AGUI_ACTIVITY 事件" />
    </t-card>
  </t-space>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {
  ChatEngineEventType,
  JsonRenderActivityRenderer,
  createCustomRegistry,
  useChat,
  type ChatRequestParams,
  type JsonRenderSchema,
} from '@tdesign-vue-next/chat';
import ProgressBar from './components/progress-bar.vue';
import StatusCard from './components/status-card.vue';

const MOCK_SERVER = 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com';
const inputValue = ref('创建一个任务进度表单，包含状态卡片和进度条');
const externalActivity = ref<JsonRenderSchema | null>(null);
let unsubscribe: (() => void) | undefined;

const { chatEngine, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: `${MOCK_SERVER}/sse/json-render-activity`,
    protocol: 'agui',
    stream: true,
    onRequest: (params: ChatRequestParams) => ({
      body: JSON.stringify({
        uid: 'agui-json-render-external-panel-vue',
        prompt: params.prompt,
        demoMode: true,
      }),
    }),
    onError: (error) => MessagePlugin.error(error instanceof Error ? error.message : '请求失败'),
  },
});

const registry = createCustomRegistry({ StatusCard, ProgressBar });
const actionHandlers = {
  submit: () => MessagePlugin.success('提交成功'),
  refresh: () => MessagePlugin.info('数据已刷新'),
  export: () => MessagePlugin.success('导出成功'),
};

watch(
  chatEngine,
  (engine) => {
    unsubscribe?.();
    if (!engine) return;
    unsubscribe = engine.eventBus.on(ChatEngineEventType.AGUI_ACTIVITY, (event) => {
      if (event.activityType === 'json-render-main-card') {
        externalActivity.value = event.content as JsonRenderSchema;
      }
    });
  },
  { immediate: true },
);

onBeforeUnmount(() => unsubscribe?.());

const isLoading = computed(() => status.value === 'pending' || status.value === 'streaming');
const handleSend = async () => {
  if (!inputValue.value.trim()) return;
  await chatEngine.value?.sendUserMessage({ prompt: inputValue.value });
  inputValue.value = '';
};
</script>

<style scoped>
.external-panel {
  min-height: 420px;
  border: 2px solid var(--td-brand-color);
}

.external-panel pre {
  max-height: 200px;
  padding: 8px;
  overflow: auto;
  font-size: 11px;
  background: var(--td-bg-color-secondarycontainer);
}
</style>
