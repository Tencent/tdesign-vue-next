:: BASE_DOC ::

## API

### Chat Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
actions | Slot / Function | - | 自定义操作按钮的插槽。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
animation | String | skeleton | 动画效果，支持「渐变加载动画」,「闪烁加载动画」, 「骨架屏」三种。可选项：skeleton/moving/gradient | N
avatar | Slot / Function | - | 自定义头像的插槽。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
clearHistory | Boolean | true | 是否显示清空历史 | N
content | Slot / Function | - | 自定义 markdown 的渲染效果。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
data | Array | - | 对话列表的数据。TS 类型：`Array<TdChatItemProps>` | N
datetime | Slot / Function | - | 自定义时间的插槽。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
isStreamLoad | Boolean | false | 流式加载是否结束 | N
layout | String | both | 对话布局形式，支持两侧对齐与左对齐。可选项：both/single | N
name | Slot / Function | - | 自定义昵称的插槽。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
reverse | Boolean | true | 是否表现为倒序 | N
textLoading | Boolean | false | 新消息是否处于加载状态，加载状态默认显示骨架屏，接口请求返回数据时请将新消息加载状态置为false | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清空历史按钮回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onScroll | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>滚动事件的回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N

### Chat Events

名称 | 参数 | 描述
-- | -- | --
clear | `(context: { e: MouseEvent })` | 点击清空历史按钮回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
scroll | `(context: { e: MouseEvent })` | 滚动事件的回调。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### ChatInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
scrollToBottom | `(params: { behavior: 'auto' \| 'smooth'})` | \- | 对话列表过长时，支持对话列表重新滚动回底部的方法


### ChatLoading Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
animation | String | moving | 加载的状态形式。可选项：moving/gradient | N
text | String | - | 加载过程展示的文字内容 | N


### ChatItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
actions | String / Slot / Function | - | 自定义的操作内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
animation | String | skeleton | 动画效果，支持「渐变加载动画」,「闪烁加载动画」, 「骨架屏」三种。可选项：skeleton/moving/gradient | N
avatar | String / Object / Slot / Function | - | 自定义的头像配置。TS 类型：`String \| AvatarProps \| TNode `，[Avatar API Documents](./avatar?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
content | String / Slot / Function | - | 对话单元的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
datetime | String / Slot / Function | - | 对话单元的时间配置。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
name | String / Slot / Function | - | 自定义的昵称。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
reasoning | String / Object | false | 值为false不显示思维链，为对象则单独配置思维链内容。TS 类型：`boolean \| TdChatReasoning ` ` interface TdChatReasoning { expandIconPlacement?: 'left' \| 'right';onExpandChange?: (isExpand: boolean) => void; collapsePanelProps?: Object } `。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
role | String | - | 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息。可选项：user/assistant/error/model-change/system | N
textLoading | Boolean | false | 新消息是否处于加载状态，加载状态默认显示骨架屏，接口请求返回数据时请将新消息加载状态置为false | N
variant | String | text | 气泡框样式，支持基础、线框、文字三种类型。可选项：base/outline/text | N


### ChatContent Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String | - | 聊天内容，支持 markdown 格式 | N
role | String | - | 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息。可选项：user/assistant/error/model-change/system | N


### ChatAction Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String | - | 被复制的内容 | N
disabled | Boolean | false | 操作按钮是否可点击 | N
isBad | Boolean | false | 是否点踩 | N
isGood | Boolean | false | 是否点赞 | N
operationBtn | Array | - | 操作按钮配置项，可配置操作按钮选项和顺序 | N
onOperation | Function |  | TS 类型：`(value:string, context: { e: MouseEvent }) => void`<br/>点击点赞，点踩，复制，重新生成按钮时触发 | N

### ChatAction Events

名称 | 参数 | 描述
-- | -- | --
operation | `(value:string, context: { e: MouseEvent })` | 点击点赞，点踩，复制，重新生成按钮时触发


### ChatInput Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
autofocus | Boolean | false | 输入框是否自动聚焦 | N
autosize | Boolean / Object | { minRows: 1, maxRows: 5 } | 高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度。TS 类型：`boolean \| { minRows?: number; maxRows?: number }` | N
disabled | Boolean | false | 是否禁用输入框 | N
placeholder | String | - | 输入框默认文案 | N
stopDisabled | Boolean | false | 中止按钮是否可点击。等流式数据全部返回结束置为false，注意跟textLoading的控制时机不是同一个 | N
onBlur | Function |  | TS 类型：`(value:string, context: { e: FocusEvent }) => void`<br/>输入框聚焦时触发 | N
onChange | Function |  | TS 类型：`(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent }) => void`<br/>输入框值发生变化时触发 | N
onFocus | Function |  | TS 类型：`(value:string, context: { e: FocusEvent })  => void`<br/>输入框聚焦时触发 | N
onSend | Function |  | TS 类型：`(value:string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/>点击消息发送的回调方法 | N
onStop | Function |  | TS 类型：`(value:string, context: { e: MouseEvent }) => void`<br/>点击消息终止的回调方法 | N

### ChatInput Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value:string, context: { e: FocusEvent })` | 输入框聚焦时触发
change | `(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent })` | 输入框值发生变化时触发
focus | `(value:string, context: { e: FocusEvent }) ` | 输入框聚焦时触发
send | `(value:string, context: { e: MouseEvent \| KeyboardEvent })` | 点击消息发送的回调方法
stop | `(value:string, context: { e: MouseEvent })` | 点击消息终止的回调方法


### ChatSender Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
prefix | String / Slot / Function | - | 输入框左下角区域扩展。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
stopDisabled | Boolean | false | 中止按钮是否可点击。等流式数据全部返回结束置为false，注意跟textLoading的控制时机不是同一个 | N
suffix | String / Slot / Function | - | 输入框右下角区域扩展。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onSend | Function |  | TS 类型：`(value:string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/>点击消息发送的回调方法 | N
onStop | Function |  | TS 类型：`(value:string, context: { e: MouseEvent }) => void`<br/>点击消息终止的回调方法 | N

### ChatSender Events

名称 | 参数 | 描述
-- | -- | --
send | `(value:string, context: { e: MouseEvent \| KeyboardEvent })` | 点击消息发送的回调方法
stop | `(value:string, context: { e: MouseEvent })` | 点击消息终止的回调方法


### ChatReasoning Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
collapsePanelProps | Object | - | 透传给 CollapsePanel 组件的全部属性。TS 类型：`CollapsePanelProps`，[Collapse API Documents](./collapse?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
expandIcon | Slot / Function | - | 当前折叠面板展开图标。优先级低于collapsePanelProps.expandIcon。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
expandIconPlacement | String | right | 展开图标位置，可选项：left/right。可选项：left/right | N
header | Slot / Function | - | 折叠面板头内容。优先级低于collapsePanelProps.header。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
headerRightContent | Slot / Function | - | 折叠面板尾内容。优先级低于collapsePanelProps.headerRightContent。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onExpandChange | Function |  | TS 类型：`(value: CollapseValue) => void`<br/>展开图标点击事件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts)。<br/>`import { CollapseValue } from '@Collapse'`<br/> | N

### ChatReasoning Events

名称 | 参数 | 描述
-- | -- | --
expand-change | `(value: CollapseValue)` | 展开图标点击事件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts)。<br/>`import { CollapseValue } from '@Collapse'`<br/>
