:: BASE_DOC ::

## API

### Alert Props

name | type | default | description | required
-- | -- | -- | -- | --
close | String / Boolean / Slot / Function | false | Deprecated, use closeBtn instead. Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeBtn | String / Boolean / Slot / Function | false | Close button. Value "true" show the close button. Value "False" hide close button. Value type string display as is. Use TNode to custom the close trigger. Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
maxLine | Number | 0 | \- | N
message | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
operation | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
theme | String | info | options: success/info/warning/error | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClosed | Function |  | Typescript：`(context: { e: TransitionEvent }) => void`<br/> | N

### Alert Events

name | params | description
-- | -- | --
close | `(context: { e: MouseEvent })` | \-
closed | `(context: { e: TransitionEvent })` | \-
