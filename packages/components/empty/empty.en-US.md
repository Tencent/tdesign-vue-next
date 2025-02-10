:: BASE_DOC ::

## API

### Empty Props

name | type | default | description | required
-- | -- | -- | -- | --
action | Slot / Function | - | action block。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
description | String / Slot / Function | - | empty component description。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
image | String / Slot / Function | - | image url, or Image component props, or custom any node you need.。Typescript：`string \| ImageProps \| TNode `，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/empty/type.ts) | N
imageStyle | Object | - | pass `Cascading Style Sheets` to image element。Typescript：`Styles`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
size | String | medium | size of Empty,  default value is `medium`。options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
title | String / Slot / Function | - | empty component title。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
type | String | empty | Empty component type。options: empty/success/fail/network-error/maintenance | N
