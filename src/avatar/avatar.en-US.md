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

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cascading | String | 'right-up' | 图片之间的层叠关系，可选值：左侧图片在上和右侧图片在上。可选项：left-up/right-up。TS 类型：`CascadingValue` `type CascadingValue = 'left-up' \| 'right-up'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/avatar/type.ts) | N
collapseAvatar | String / Slot / Function | - | 头像数量超出时，会出现一个头像折叠元素。该元素内容可自定义。默认为 `+N`。示例：`+5`，`...`, `更多`。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | - | 能够同时显示的最多头像数量 | N
popupProps | Object | - | 头像右上角提示信息。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/avatar/type.ts) | N
size | String | - | 尺寸，示例值：small/medium/large/24px/38px 等。优先级低于 Avatar.size | N