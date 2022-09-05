:: BASE_DOC ::

## API
### Button Props

name | type | default | description | required
-- | -- | -- | -- | --
block | Boolean | false | make button to be a block-level element | N
content | String / Slot / Function | - | button's children elements。Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | default slot。Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | disable the button, make it can not be clicked | N
ghost | Boolean | false | make background-color to be transparent | N
href | String | - | address. When `href` exists, the button label is rendered by default using `< a >`; If `tag` is specified, the specified label is used for rendering | N
icon | Slot / Function | - | use it to set left icon in button。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
loading | Boolean | false | set button to be loading state | N
shape | String | rectangle | button shape。options：rectangle/square/round/circle | N
size | String | medium | a button has three size。options：small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
tag | String | - | The element used to render the button. By default, ` < button > ` is used for rendering, and can be customized as `<a>` `<div>`. Completely transfer all HTML attributes, such as: `href/target/data-*`. ⚠️ The pop-up floating layer information cannot be displayed when the button is disabled `<button disabled>`. This problem can be solved by modifying `tag = div`. Optional: `button/a/div` | N
theme | String | - | button theme。options：default/primary/danger/warning/success | N
type | String | button | type of button element in html。options：submit/reset/button | N
variant | String | base | variant of button。options：base/outline/dashed/text | N
onClick | Function |  | TS 类型：`(e: MouseEvent) => void`<br/> | N

### Button Events

name | params | description
-- | -- | --
click | `(e: MouseEvent)` | \-
