:: BASE_DOC ::

## API
### Space Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | - | alignment。options: start/end/center/baseline | N
breakLine | Boolean | false | Whether to wrap, valid only in horizontal | N
direction | String | horizontal | Spacing direction。options: vertical/horizontal | N
separator | String / Slot / Function | - | separator。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
size | String / Number / Array | 'medium' | Spacing。Typescript：`SpaceSize \| SpaceSize[]` `type SpaceSize = number \| string \| SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/space/type.ts) | N
