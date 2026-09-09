---
title: 生成式 UI
order: 5
group:
  title: 快速上手
  order: 3
docClass: tdesign-genui-doc
---

## 什么是生成式 UI

生成式 UI（Generative UI）是由 AI/LLM 动态生成的用户界面。传统对话只生成文本并渲染 Markdown；
生成式 UI 则让模型输出受约束的 UI Schema，前端将其渲染为可交互的表单、卡片、图表或任务面板。

典型场景包括：

- 根据用户需求生成数据收集表单
- 动态生成图表和数据面板
- 展示任务状态、执行进度和操作入口
- 根据上下文生成配置面板

直接执行模型生成的代码存在安全、稳定性和样式一致性问题。TDesign Chat 使用预定义组件目录约束模型：

- AI 只能使用 Catalog 中声明的组件和 Action
- 每个组件的 props 由 Schema 约束
- Registry 决定组件对应的 Vue 实现
- 未注册组件和 Action 不会被执行

## 核心设计

### Catalog：约束层

Catalog 定义模型可使用的组件、props 和 Action 白名单。`generateCatalogPrompt` 可以将 Catalog
转换为系统提示词，发送给后端模型。

```javascript
import { z } from 'zod';
import { generateCatalogPrompt } from '@tdesign-vue-next/chat';

const systemPrompt = generateCatalogPrompt({
  name: 'task-dashboard',
  components: {
    StatusCard: {
      props: z.object({
        title: z.string(),
        status: z.enum(['success', 'warning', 'error']),
      }),
      description: '任务状态卡片',
    },
  },
  actions: {
    refresh: { description: '刷新任务状态' },
  },
});
```

### Registry：渲染层

Registry 将 Schema 中的组件名称映射为实际 Vue 组件。内置 Registry 提供 Button、Input、TextField、
Card、Text、Row、Col、Space、Column 和 Divider，也可以扩展业务组件。

```javascript
import { defineComponent } from 'vue';
import { createCustomRegistry } from '@tdesign-vue-next/chat';

const StatusCard = defineComponent({
  props: ['element'],
  setup: (props) => () => <div>{props.element.props.title}</div>,
});

const registry = createCustomRegistry({ StatusCard });
```

### Activity：传输与挂载

生成式 UI 通过 AG-UI `ACTIVITY_SNAPSHOT` 传输完整 Schema，并通过 `ACTIVITY_DELTA`
携带 JSON Patch 增量更新。前端注册对应 Activity 渲染器：

```javascript
import { createJsonRenderActivityConfig, useAgentActivity } from '@tdesign-vue-next/chat';

useAgentActivity(
  createJsonRenderActivityConfig({
    activityType: 'json-render',
    registry,
    actionHandlers: {
      refresh: async (params) => {
        // 处理预先声明的 Action
      },
    },
  }),
);
```

## 协议支持

### 原生 json-render

json-render 使用邻接表 Schema 描述组件结构：

```json
{
  "root": "card",
  "elements": {
    "card": {
      "type": "Card",
      "props": { "title": "用户信息" },
      "children": ["name", "submit"]
    },
    "name": {
      "type": "TextField",
      "props": { "label": "姓名", "valuePath": "/form/name" }
    },
    "submit": {
      "type": "Button",
      "props": { "label": "提交", "action": { "action": "submit" } }
    }
  },
  "data": { "form": { "name": "" } }
}
```

### A2UI v0.9.1

[A2UI](https://a2ui.org/specification/v0.9.1-a2ui/) 将 UI 结构与数据模型分离，支持渐进式生成：

```json
{"createSurface":{"surfaceId":"form","catalogId":"tdesign"}}
{"updateComponents":{"surfaceId":"form","components":[
  {"id":"root","component":"Column","children":["name","submit"]},
  {"id":"name","component":"TextField","label":"姓名","text":{"path":"/form/name"}},
  {"id":"submit","component":"Button","child":"label","action":{"event":{"name":"submit"}}},
  {"id":"label","component":"Text","text":"提交"}
]}}
{"updateDataModel":{"surfaceId":"form","path":"/form","value":{"name":""}}}
```

ChatEngine 支持：

- `createSurface`：创建 Surface
- `updateComponents`：增量更新组件邻接表
- `updateDataModel`：更新数据模型并驱动绑定组件
- `deleteSurface`：销毁 Surface
- 多 Surface 管理和唯一 Ownership
- `{ path: "/..." }` 双向数据绑定和 Action 参数解析

通过 `createA2UIJsonRenderActivityConfig` 可将 AG-UI Activity 中的 A2UI 消息转换为 json-render Schema：

```typescript
import { createA2UIJsonRenderActivityConfig, useAgentActivity } from '@tdesign-vue-next/chat';

useAgentActivity(
  createA2UIJsonRenderActivityConfig({
    activityType: 'a2ui-form',
    actionHandlers: {
      submit: async (params) => {
        console.log('提交表单', params);
      },
    },
  }),
);
```

## 数据流

```text
Catalog 生成系统提示词
  → AI 生成 json-render 或 A2UI Schema
  → AG-UI Activity 流式传输
  → ChatEngine 合并 Snapshot/Delta
  → Registry 查找 Vue 组件
  → Renderer 渲染并绑定 dataModel
  → 用户操作触发预注册 Action
```

完整示例请查看 [ChatEngine 生成式 UI](/vue-next-chat/components/chat-engine#生成式-ui)。
