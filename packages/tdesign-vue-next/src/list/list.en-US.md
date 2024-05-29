:: BASE_DOC ::

## API
### List Props

name | type | default | description | required
-- | -- | -- | -- | --
asyncLoading | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
footer | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
header | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
layout | String | horizontal | options: horizontal/vertical | N
scroll | Object | - | lazy load and virtual scroll。Typescript：`TScroll`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
size | String | medium | options: small/medium/large | N
split | Boolean | false | \- | N
stripe | Boolean | false | \- | N
onLoadMore | Function |  | Typescript：`(options: { e: MouseEvent }) => void`<br/> | N
onScroll | Function |  | Typescript：`(options: { e: Event \| WheelEvent; scrollTop: number; scrollBottom: number }) => void`<br/> | N

### List Events

name | params | description
-- | -- | --
load-more | `(options: { e: MouseEvent })` | \-
scroll | `(options: { e: Event \| WheelEvent; scrollTop: number; scrollBottom: number })` | \-

### ListItem Props

name | type | default | description | required
-- | -- | -- | -- | --
action | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### ListItemMeta Props

name | type | default | description | required
-- | -- | -- | -- | --
avatar | String / Slot / Function | - | `deprecated`。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
description | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
image | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
