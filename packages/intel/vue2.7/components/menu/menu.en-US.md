:: BASE_DOC ::

## API
### Menu Props

name | type | default | description | required
-- | -- | -- | -- | --
collapsed | Boolean | false | \- | N
expandMutex | Boolean | false | \- | N
expandType | String | normal | options：normal/popup | N
expanded | Array | [] | `.sync` is supported。Typescript：`Array<MenuValue>` | N
defaultExpanded | Array | [] | uncontrolled property。Typescript：`Array<MenuValue>` | N
logo | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
operations | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
theme | String | light | Menu can be light mode or dark mode.。options：light/dark/global/system | N
value | String / Number | - | `v-model` is supported。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/menu/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/menu/type.ts) | N
width | String / Number / Array | '232px' | Typescript：`string \| number \| Array<string \| number>` | N
onChange | Function |  | Typescript：`(value: MenuValue) => void`<br/> | N
onExpand | Function |  | Typescript：`(value: Array<MenuValue>) => void`<br/> | N

### Menu Events

name | params | description
-- | -- | --
change | `(value: MenuValue)` | \-
expand | `(value: Array<MenuValue>)` | \-

### HeadMenu Props

name | type | default | description | required
-- | -- | -- | -- | --
expandType | String | normal | options：normal/popup | N
expanded | Array | [] | `.sync` is supported。Typescript：`Array<MenuValue>` | N
defaultExpanded | Array | [] | uncontrolled property。Typescript：`Array<MenuValue>` | N
logo | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
operations | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
theme | String | light | options：light/dark | N
value | String / Number | - | `v-model` is supported。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/menu/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/menu/type.ts) | N
onChange | Function |  | Typescript：`(value: MenuValue) => void`<br/> | N
onExpand | Function |  | Typescript：`(value: Array<MenuValue>) => void`<br/> | N

### HeadMenu Events

name | params | description
-- | -- | --
change | `(value: MenuValue)` | \-
expand | `(value: Array<MenuValue>)` | \-

### Submenu Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | - | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
popupProps | Object | - | Transparent all feature props of the Popup。Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/menu/type.ts) | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
value | String / Number | - | Typescript：`MenuValue` | N

### MenuItem Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | - | \- | N
href | String | - | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
replace | Boolean | false | \- | N
router | Object | - | Typescript：`Record<string, any>` | N
target | String | - | options：_blank/_self/_parent/_top | N
to | String / Object | - | Typescript：`MenuRoute` `interface MenuRoute { path?: string; name?: string; hash?: string; query?: MenuQueryData; params?: MenuQueryData }` `type MenuQueryData = { [key: string]: string \| string[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/menu/type.ts) | N
value | String / Number | - | Typescript：`MenuValue` | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>trigger on click | N

### MenuItem Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | trigger on click

### MenuGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
