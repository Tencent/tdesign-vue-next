:: BASE_DOC ::

## API
### Button Props

name | type | default | description | required
-- | -- | -- | -- | --
block | Boolean | false | make button to be a block-level element | N
content | String / Slot / Function | - | button's children elements。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | default slot。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | disable the button, make it can not be clicked | N
ghost | Boolean | false | make background-color to be transparent | N
href | String | - | \- | N
icon | Slot / Function | - | use it to set left icon in button。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
loading | Boolean | false | set button to be loading state | N
shape | String | rectangle | button shape。options：rectangle/square/round/circle | N
size | String | medium | a button has three size。options：small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
suffix | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
tag | String | - | HTML Tag Element。options：button/a/div | N
theme | String | - | button theme。options：default/primary/danger/warning/success | N
type | String | button | type of button element in html。options：submit/reset/button | N
variant | String | base | variant of button。options：base/outline/dashed/text | N
onClick | Function |  | Typescript：`(e: MouseEvent) => void`<br/> | N

### Button Events

name | params | description
-- | -- | --
click | `(e: MouseEvent)` | \-
