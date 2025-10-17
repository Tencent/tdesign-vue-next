:: BASE_DOC ::

## API

### Chat Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
actions | Slot / Function | - | 自定义操作按钮的插槽。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) `待废弃，请尽快使用actionbar` | N
actionbar | Slot / Function | - | 自定义操作按钮的插槽。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)  | N
animation | String | skeleton | 动画效果，支持「渐变加载动画」,「闪烁加载动画」, 「骨架屏」三种。可选项：skeleton/moving/gradient | N
avatar | Slot / Function | - | 自定义每个对话单元的头像插槽。TS 类型：`TNode<{ item: TdChatItemProps, index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
clearHistory | Boolean | true | 是否显示清空历史 | N
content | Slot / Function | - | 自定义每个对话单独的聊天内容。TS 类型：`TNode<{ item: TdChatItemProps, index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
data | Array | - | 对话列表的数据。TS 类型：`Array<TdChatItemMeta>` ` interface TdChatItemMeta { avatar?: string; name?:string; role?:string; datetime?: string; content?: string \| object; reasoning?: string }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/pro-components/chat/type.ts) | N
datetime | Slot / Function | - | 自定义每个对话单元的时间。TS 类型：`TNode<{ item: TdChatItemProps, index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
layout | String | both | 对话布局形式，支持两侧对齐与左对齐。可选项：both/single `使用默认插槽时无效，请使用ChatMessage的placement设置消息显示位置` | N
name | Slot / Function | - | 自定义每个对话单元的昵称。TS 类型：`TNode<{ item: TdChatItemProps, index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
reasoning | Slot / Function | - | 自定义每个对话单元的思考过程的插槽。TS 类型：`TNode<{ item: TdChatItemProps, index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
reverse | Boolean | false | 默认为正序 | N
textLoading | Boolean | false | 新消息是否处于加载状态，加载状态默认显示骨架屏，接口请求返回数据时请将新消息加载状态置为false | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清空历史按钮回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onScroll | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>滚动事件的回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
autoScroll | Boolean | true | 是否开启自动滚动到底部 | N
showScrollButton | Boolean | true | 是否显示滚动到底部按钮 | N
### Chat Events

名称 | 参数 | 描述
-- | -- | --
clear | `(context: { e: MouseEvent })` | 点击清空历史按钮回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
scroll | `(context: { e: MouseEvent })` | 滚动事件的回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### ChatInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
scrollToBottom | `(params: ScrollToBottomParams)` | \- | 对话列表过长时，支持对话列表重新滚动回底部的方法。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/pro-components/chat/type.ts)。<br/>` type ScrollToBottomParams = { behavior: 'auto' \| 'smooth'} `<br/>
