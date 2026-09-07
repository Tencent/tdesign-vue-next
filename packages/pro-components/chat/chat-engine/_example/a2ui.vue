<template>
  <t-space direction="vertical" size="large" style="width: 100%">
    <t-alert theme="info">
      A2UI 消息由 ChatEngine 转换为统一的 json-render Schema。点击按钮可模拟组件流式到达、数据模型更新和 Surface 删除。
    </t-alert>

    <t-space>
      <t-button theme="primary" @click="appendSubmitControls">接收下一批组件</t-button>
      <t-button variant="outline" @click="fillDemoData">模拟 updateDataModel</t-button>
      <t-button variant="outline" theme="danger" @click="deleteSurface">模拟 deleteSurface</t-button>
      <t-button variant="text" @click="resetSurface">重置</t-button>
    </t-space>

    <div class="a2ui-layout">
      <section class="a2ui-panel">
        <div class="a2ui-panel__header">
          <strong>渲染结果</strong>
          <t-tag theme="primary" variant="light">{{ surfaceId }}</t-tag>
        </div>
        <A2UISurfaceRenderer v-if="schema" :schema="schema" @data-change="handleDataChange" @action="handleAction" />
        <t-alert v-else theme="warning">Surface 已删除，点击“重置”重新创建。</t-alert>
        <div v-if="lastAction" class="a2ui-action">
          最近 Action：<code>{{ JSON.stringify(lastAction) }}</code>
        </div>
      </section>

      <section class="a2ui-panel">
        <div class="a2ui-panel__header">
          <strong>A2UI 消息流</strong>
          <span>{{ messages.length }} 条</span>
        </div>
        <pre>{{ JSON.stringify(messages, null, 2) }}</pre>
      </section>
    </div>

    <details>
      <summary>查看转换后的 json-render Schema</summary>
      <pre class="a2ui-schema">{{ JSON.stringify(schema, null, 2) }}</pre>
    </details>
  </t-space>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import {
  applyA2UIUpdates,
  convertA2UIMessagesToJsonRender,
  surfaceStateManager,
  type A2UIComponent,
  type A2UIMessage,
  type JsonRenderSchema,
} from '@tdesign-vue-next/chat';
import A2UISurfaceRenderer from './components/A2UISurfaceRenderer';

const surfaceId = 'signup-surface';
const messages = ref<A2UIMessage[]>([]);
const schema = ref<JsonRenderSchema | null>(null);
const lastAction = ref<Record<string, unknown> | null>(null);
let unsubscribe: (() => void) | undefined;

const initialMessages: A2UIMessage[] = [
  {
    version: 'v0.9.1',
    createSurface: {
      surfaceId,
      catalogId: 'tdesign-vue-next',
    },
  },
  {
    version: 'v0.9.1',
    updateComponents: {
      surfaceId,
      components: [
        { id: 'root', component: 'Column', children: ['title', 'description', 'form-card'] },
        { id: 'title', component: 'Text', text: '活动报名' },
        { id: 'description', component: 'Text', text: '界面结构和数据均由 A2UI 消息生成。' },
        { id: 'form-card', component: 'Card', child: 'form' },
        { id: 'form', component: 'Column', children: ['name-field', 'company-field'] },
        { id: 'name-field', component: 'TextField', label: '姓名', text: { path: '/form/name' } },
        { id: 'company-field', component: 'TextField', label: '公司', text: { path: '/form/company' } },
      ],
    },
  },
  {
    version: 'v0.9.1',
    updateDataModel: {
      surfaceId,
      path: '/',
      value: {
        form: {
          name: '',
          company: '',
        },
      },
    },
  },
];

const subscribeSurface = () => {
  unsubscribe?.();
  unsubscribe = surfaceStateManager.subscribe(surfaceId, () => {
    schema.value = surfaceStateManager.getSchema(surfaceId);
  });
};

const resetSurface = () => {
  unsubscribe?.();
  surfaceStateManager.deleteSurface(surfaceId);
  messages.value = structuredClone(initialMessages);
  lastAction.value = null;

  const nextSchema = convertA2UIMessagesToJsonRender(messages.value);
  if (!nextSchema) return;

  surfaceStateManager.registerSurface(surfaceId, nextSchema, 'tdesign-vue-next');
  schema.value = nextSchema;
  subscribeSurface();
};

const appendSubmitControls = () => {
  if (!schema.value) return;

  const components: A2UIComponent[] = [
    {
      id: 'form',
      component: 'Column',
      children: ['name-field', 'company-field', 'submit-button'],
    },
    {
      id: 'submit-button',
      component: 'Button',
      child: 'submit-label',
      action: {
        event: {
          name: 'submit-signup',
          context: {
            name: { path: '/form/name' },
            company: { path: '/form/company' },
          },
        },
      },
    },
    { id: 'submit-label', component: 'Text', text: '提交报名' },
  ];

  messages.value.push({
    version: 'v0.9.1',
    updateComponents: {
      surfaceId,
      components,
    },
  });

  const nextSchema = applyA2UIUpdates(schema.value, components);
  surfaceStateManager.updateSchema(surfaceId, nextSchema);
  schema.value = nextSchema;
};

const updateData = (path: string, value: unknown) => {
  if (!schema.value) return;

  messages.value.push({
    version: 'v0.9.1',
    updateDataModel: {
      surfaceId,
      path,
      op: 'replace',
      value,
    },
  });
  surfaceStateManager.updateData(surfaceId, path, 'replace', value);
  schema.value = surfaceStateManager.getSchema(surfaceId);
};

const handleDataChange = ({ path, value }: { path: string; value: unknown }) => {
  updateData(path, value);
};

const fillDemoData = () => {
  updateData('/form/name', 'TDesign 用户');
  updateData('/form/company', 'Tencent');
};

const handleAction = (action: { name: string; kind: string; params: Record<string, unknown> }) => {
  lastAction.value = action;
};

const deleteSurface = () => {
  messages.value.push({
    version: 'v0.9.1',
    deleteSurface: { surfaceId },
  });
  surfaceStateManager.deleteSurface(surfaceId);
  schema.value = null;
};

resetSurface();

onBeforeUnmount(() => {
  unsubscribe?.();
  surfaceStateManager.deleteSurface(surfaceId);
});
</script>

<style scoped>
.a2ui-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
}

.a2ui-panel {
  min-height: 320px;
  padding: 16px;
  overflow: hidden;
  border: 1px solid var(--td-component-border);
  border-radius: var(--td-radius-medium);
}

.a2ui-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.a2ui-panel pre,
.a2ui-schema {
  max-height: 360px;
  padding: 12px;
  overflow: auto;
  font-size: 12px;
  background: var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-default);
}

.a2ui-action {
  margin-top: 16px;
  padding: 8px 12px;
  word-break: break-all;
  background: var(--td-success-color-light);
  border-radius: var(--td-radius-default);
}

@media (max-width: 768px) {
  .a2ui-layout {
    grid-template-columns: 1fr;
  }
}
</style>
