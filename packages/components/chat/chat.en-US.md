:: BASE_DOC ::

## API

### Chat Props

name | type | default | description | required
-- | -- | -- | -- | --
actions | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
animation | String | skeleton | options: skeleton/moving/gradient | N
avatar | Slot / Function | - | Typescript：`TNode<{ item: TdChatItemProps }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
clearHistory | Boolean | true | \- | N
content | Slot / Function | - | Typescript：`TNode<{ item: TdChatItemProps }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
data | Array | - | Typescript：`Array<TdChatItemProps>` | N
datetime | Slot / Function | - | Typescript：`TNode<{ item: TdChatItemProps }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
isStreamLoad | Boolean | false | \- | N
layout | String | both | options: both/single | N
name | Slot / Function | - | Typescript：`TNode<{ item: TdChatItemProps }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
reverse | Boolean | true | \- | N
textLoading | Boolean | false | \- | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onScroll | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N

### Chat Events

name | params | description
-- | -- | --
clear | `(context: { e: MouseEvent })` | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)
scroll | `(context: { e: MouseEvent })` | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### ChatInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
scrollToBottom | `(params: { behavior: 'auto' \| 'smooth'})` | \- | \-


### ChatLoading Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | String | moving | options: moving/gradient | N
text | String | - | text of chat loading | N


### ChatItem Props

name | type | default | description | required
-- | -- | -- | -- | --
actions | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
animation | String | skeleton | options: skeleton/moving/gradient | N
avatar | String / Object / Slot / Function | - | Typescript：`String \| AvatarProps \| TNode `，[Avatar API Documents](./avatar?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
datetime | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
name | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
reasoning | String / Object | false | Typescript：`boolean \| TdChatReasoning ` ` interface TdChatReasoning { expandIconPlacement?: 'left' \| 'right';onExpandChange?: (isExpand: boolean) => void; collapsePanelProps?: Object } `。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
role | String | - | options: user/assistant/error/model-change/system | N
textLoading | Boolean | false | \- | N
variant | String | text | options: base/outline/text | N


### ChatContent Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String | - | \- | N
role | String | - | options: user/assistant/error/model-change/system | N


### ChatAction Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String | - | \- | N
disabled | Boolean | false | \- | N
isBad | Boolean | false | \- | N
isGood | Boolean | false | \- | N
operationBtn | Array | ["replay", "copy", "good", "bad"] | \- | N
onOperation | Function |  | Typescript：`(value:string, context: { e: MouseEvent }) => void`<br/> | N

### ChatAction Events

name | params | description
-- | -- | --
operation | `(value:string, context: { e: MouseEvent })` | \-


### ChatInput Props

name | type | default | description | required
-- | -- | -- | -- | --
autofocus | Boolean | false | \- | N
autosize | Boolean / Object | { minRows: 1, maxRows: 5 } | Typescript：`boolean \| { minRows?: number; maxRows?: number }` | N
disabled | Boolean | false | \- | N
placeholder | String | - | \- | N
stopDisabled | Boolean | false | \- | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String / Number | - | input value。`v-model` and `v-model:value` is supported。Typescript：`T` `type InputValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
defaultValue | String / Number | - | input value。uncontrolled property。Typescript：`T` `type InputValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
onBlur | Function |  | Typescript：`(value:string, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value:string, context: { e: FocusEvent })  => void`<br/> | N
onSend | Function |  | Typescript：`(value:string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/> | N
onStop | Function |  | Typescript：`(value:string, context: { e: MouseEvent }) => void`<br/> | N

### ChatInput Events

name | params | description
-- | -- | --
blur | `(value:string, context: { e: FocusEvent })` | \-
change | `(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent })` | \-
focus | `(value:string, context: { e: FocusEvent }) ` | \-
send | `(value:string, context: { e: MouseEvent \| KeyboardEvent })` | \-
stop | `(value:string, context: { e: MouseEvent })` | \-


### ChatSender Props

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean | false | \- | N
placeholder | String | - | \- | N
prefix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
stopDisabled | Boolean | false | \- | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
textareaProps | Object | - | Typescript：`TextareaProps`，[Textarea API Documents](./textarea?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
value | String / Number | - | input value。`v-model` and `v-model:value` is supported。Typescript：`T` `type InputValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
defaultValue | String / Number | - | input value。uncontrolled property。Typescript：`T` `type InputValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
onBlur | Function |  | Typescript：`(value:string, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value:string, context: { e: FocusEvent })  => void`<br/> | N
onSend | Function |  | Typescript：`(value:string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/> | N
onStop | Function |  | Typescript：`(value:string, context: { e: MouseEvent }) => void`<br/> | N

### ChatSender Events

name | params | description
-- | -- | --
blur | `(value:string, context: { e: FocusEvent })` | \-
change | `(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent })` | \-
focus | `(value:string, context: { e: FocusEvent }) ` | \-
send | `(value:string, context: { e: MouseEvent \| KeyboardEvent })` | \-
stop | `(value:string, context: { e: MouseEvent })` | \-


### ChatReasoning Props

name | type | default | description | required
-- | -- | -- | -- | --
collapsePanelProps | Object | - | Typescript：`CollapsePanelProps`，[Collapse API Documents](./collapse?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
expandIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
expandIconPlacement | String | right | options: left/right | N
header | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
headerRightContent | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onExpandChange | Function |  | Typescript：`(value: CollapseValue) => void`<br/>Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts)。<br/>`import { CollapseValue } from '@Collapse'`<br/> | N

### ChatReasoning Events

name | params | description
-- | -- | --
expand-change | `(value: CollapseValue)` | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts)。<br/>`import { CollapseValue } from '@Collapse'`<br/>
