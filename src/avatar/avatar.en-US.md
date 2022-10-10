:: BASE_DOC ::

## API

### Avatar Props

name | type | default | description | required
-- | -- | -- | -- | --
alt | String | - | show it when url is not valid | N
hideOnLoadFailed | Boolean | false | hide image when loading image failed | N
icon | Slot / Function | - | use icon to fill。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
image | String | - | images url | N
shape | String | circle | shape。options：circle/round。Typescript：`ShapeEnum ` `type ShapeEnum = 'circle' \| 'round'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/avatar/type.ts) | N
size | String | - | size | N
onError | Function |  | Typescript：`() => void`<br/>trigger on image load failed | N

### Avatar Events

name | params | description
-- | -- | --
error | \- | trigger on image load failed

### AvatarGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
cascading | String | 'right-up' | multiple images cascading。options：left-up/right-up。Typescript：`CascadingValue` `type CascadingValue = 'left-up' \| 'right-up'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/avatar/type.ts) | N
collapseAvatar | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | - | \- | N
placement | String | - | popup placement。options：left/top/bottom/right。Typescript：`MaxOverPlacement` `type MaxOverPlacement = 'left' \| 'top' \| 'bottom' \| 'right'`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/avatar/type.ts) | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/avatar/type.ts) | N
size | String | medium | size | N
