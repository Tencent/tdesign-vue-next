---
title: ChatThoughtChain 思维链
description: 以时间线形式结构化展示 AI 的思考过程与执行计划，适用于深度思考、Agent 任务规划等场景。
isComponent: true
usage: { title: '', description: '' }
spline: ai
---

## 组件类型

### 基础思维链

通过 `items` 配置思考节点，每个节点支持标题、内容与状态（`pending`/`processing`/`success`/`error`），内容可折叠展开。

{{ thought-chain }}

### 流式执行场景

配合 Agent 流式执行，逐步追加节点并更新状态，`processing` 状态自带加载动画。

{{ thought-chain-stream }}

### 自定义节点

通过 `icon`、`title`、`content` 插槽（携带 `{ item, index }` 参数）自定义任意节点的渲染。

{{ thought-chain-custom }}

## API

### ChatThoughtChain Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
collapsible | Boolean | true | 是否支持折叠每个思考节点的内容 | N
items | Array | [] | 思维链节点列表。TS 类型：`TdThoughtChainItem[]`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/pro-components/chat/type.ts) | N
expandedValue | Array | [] | 展开的节点。支持语法糖 v-model:expandedValue。TS 类型：`Array<string \| number>` | N
defaultExpandedValue | Array | [] | 展开的节点。非受控属性。TS 类型：`Array<string \| number>` | N
title | Slot / Function | - | 自定义节点标题。TS 类型：`TNode<{ item: TdThoughtChainItem; index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
content | Slot / Function | - | 自定义节点内容。TS 类型：`TNode<{ item: TdThoughtChainItem; index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
icon | Slot / Function | - | 自定义节点图标，优先级高于节点 status 对应的默认图标。TS 类型：`TNode<{ item: TdThoughtChainItem; index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onExpandChange | Function | — | TS 类型：`(value: Array<string \| number>, context: { item: TdThoughtChainItem; index: number; expanded: boolean }) => void`<br/>节点展开/收起时触发 | N

### TdThoughtChainItem

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
key | String / Number | - | 节点唯一标识，缺省时使用节点索引 | N
title | String / Function | - | 节点标题。TS 类型：`string \| TNode` | N
content | String / Function | - | 节点描述内容，为空时该节点不可展开。TS 类型：`string \| TNode` | N
status | String | pending | 节点状态。可选项：pending/processing/success/error | N
icon | Function | - | 自定义节点图标，优先级高于 status 对应的默认图标。TS 类型：`TNode` | N

### ChatThoughtChain Events

名称 | 参数 | 描述
-- | -- | --
expand-change | `(value: Array<string \| number>, context: { item: TdThoughtChainItem; index: number; expanded: boolean })` | 节点展开/收起时触发
