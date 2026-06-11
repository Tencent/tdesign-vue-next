:: BASE_DOC ::

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
