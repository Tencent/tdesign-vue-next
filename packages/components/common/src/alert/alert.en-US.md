:: BASE_DOC ::

## API

### Alert Props

name | type | default | description | required
-- | -- | -- | -- | --
close | String / Boolean / Slot / Function | false | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
maxLine | Number | 0 | \- | N
message | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
operation | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | info | options：success/info/warning/error | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClosed | Function |  | Typescript：`(context: { e: TransitionEvent }) => void`<br/> | N

### Alert Events

name | params | description
-- | -- | --
close | `(context: { e: MouseEvent })` | \-
closed | `(context: { e: TransitionEvent })` | \-
