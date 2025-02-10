:: BASE_DOC ::

## API
### Timeline Props

name | type | default | description | required
-- | -- | -- | -- | --
labelAlign | String | left | label info placement。options: left/right/alternate/top/bottom | N
layout | String | vertical | time line layout。options: horizontal/vertical | N
mode | String | alternate | The position relationship between the label and the content text, 'alternate' is displayed on both sides of the axis, and 'same' is displayed on the same side。options: alternate/same | N
reverse | Boolean | false | \- | N
theme | String | default | options: default/dot | N

### TimelineItem Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
dot | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
dotColor | String | primary | Typescript：`string` | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
labelAlign | String | - | options: left/right/top/bottom | N
loading | Boolean | - | Whether it is in the loading state | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent; item: TdTimelineItemProps }) => void`<br/>trigger on click | N

### TimelineItem Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent; item: TdTimelineItemProps })` | trigger on click
