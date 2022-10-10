:: BASE_DOC ::

## API

### StickyTool Props

name | type | default | description | required
-- | -- | -- | -- | --
collapsed | Boolean | false | \- | N
draggable | Boolean | false | \- | N
entrance | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
list | Array | [] | Typescript：`Array<TdStickyItemProps>` | N
offset | Object | - | Typescript：`Array<string \| number>` | N
placement | String | right-bottom | options：right-top/right-center/right-bottom/left-top/left-center/left-bottom | N
width | String / Number | - | \- | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent; item: TdStickyItemProps }) => void`<br/> | N
onHover | Function |  | Typescript：`(context: { e: MouseEvent; item: TdStickyItemProps }) => void`<br/> | N

### StickyTool Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent; item: TdStickyItemProps })` | \-
hover | `(context: { e: MouseEvent; item: TdStickyItemProps })` | \-

### StickyItem Props

name | type | default | description | required
-- | -- | -- | -- | --
icon | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
popup | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/sticky-tool/type.ts) | N
trigger | String | hover | options：hover/click | N
