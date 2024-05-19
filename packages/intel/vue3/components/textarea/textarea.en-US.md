:: BASE_DOC ::

## API
### Textarea Props

name | type | default | description | required
-- | -- | -- | -- | --
allowInputOverMax | Boolean | false | \- | N
autofocus | Boolean | false | \- | N
autosize | Boolean / Object | false | Typescript：`boolean \| { minRows?: number; maxRows?: number }` | N
disabled | Boolean | false | \- | N
maxcharacter | Number | - | \- | N
maxlength | Number / String | - | \- | N
name | String | - | \- | N
placeholder | String | undefined | \- | N
readonly | Boolean | false | \- | N
status | String | - | options：default/success/warning/error | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`TextareaValue` `type TextareaValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/textarea/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`TextareaValue` `type TextareaValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/textarea/type.ts) | N
onBlur | Function |  | Typescript：`(value: TextareaValue, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: TextareaValue, context?: { e?: InputEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: TextareaValue, context : { e: FocusEvent }) => void`<br/> | N
onKeydown | Function |  | Typescript：`(value: TextareaValue, context: { e: KeyboardEvent }) => void`<br/> | N
onKeypress | Function |  | Typescript：`(value: TextareaValue, context: { e: KeyboardEvent }) => void`<br/> | N
onKeyup | Function |  | Typescript：`(value: TextareaValue, context: { e: KeyboardEvent }) => void`<br/> | N

### Textarea Events

name | params | description
-- | -- | --
blur | `(value: TextareaValue, context: { e: FocusEvent })` | \-
change | `(value: TextareaValue, context?: { e?: InputEvent })` | \-
focus | `(value: TextareaValue, context : { e: FocusEvent })` | \-
keydown | `(value: TextareaValue, context: { e: KeyboardEvent })` | \-
keypress | `(value: TextareaValue, context: { e: KeyboardEvent })` | \-
keyup | `(value: TextareaValue, context: { e: KeyboardEvent })` | \-
