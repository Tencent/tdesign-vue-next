:: BASE_DOC ::

## API
### Descriptions Props

name | type | default | description | required
-- | -- | -- | -- | --
bordered | Boolean | false | set description list with grey border | N
colon | Boolean | - | set label with ":" on the right | N
column | Number | 2 | count of DescriptionItem in one row | N
contentStyle | Object | - | style of description cotent。Typescript：`Styles`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
itemLayout | String | horizontal | layout direction of description item。options: horizontal/vertical | N
items | Array | - | list of descriptions items。Typescript：`Array<TdDescriptionItemProps>` | N
labelStyle | Object | - | style of description item。Typescript：`Styles`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
layout | String | horizontal | layout direction。options: horizontal/vertical | N
size | String | medium | a descriptions has three size。options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | title of descriptions。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### DescriptionItem Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | content of description item。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | content of description item。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | label of description item。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
span | Number | 1 | width count | N
