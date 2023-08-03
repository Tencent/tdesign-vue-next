:: BASE_DOC ::

## API
### Input Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | left | options: left/center/right | N
allowInputOverMax | Boolean | false | \- | N
autoWidth | Boolean | false | \- | N
autocomplete | String | undefined | \- | N
autofocus | Boolean | false | \- | N
clearable | Boolean | false | \- | N
disabled | Boolean | - | \- | N
format | Function | - | Typescript：`InputFormatType` `type InputFormatType = (value: InputValue) => string`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input/type.ts) | N
inputClass | String / Object / Array | - | Typescript：`ClassName`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
maxcharacter | Number | - | \- | N
maxlength | Number | - | \- | N
name | String | - | \- | N
placeholder | String | undefined | \- | N
prefixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | \- | N
showClearIconOnEmpty | Boolean | false | \- | N
showLimitNumber | Boolean | false | show limit number text on the right | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
status | String | undefined | options: default/success/warning/error | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
type | String | text | options: text/number/url/tel/password/search/submit/hidden | N
value | String | '' | `v-model` and `v-model:value` is supported。Typescript：`InputValue` `type InputValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input/type.ts) | N
defaultValue | String | '' | uncontrolled property。Typescript：`InputValue` `type InputValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input/type.ts) | N
onBlur | Function |  | Typescript：`(value: InputValue, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: InputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; trigger: 'input' \| 'initial' \| 'clear' }) => void`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onCompositionend | Function |  | Typescript：`(value: InputValue, context: { e: CompositionEvent }) => void`<br/>trigger on compositionend | N
onCompositionstart | Function |  | Typescript：`(value: InputValue, context: { e: CompositionEvent }) => void`<br/>trigger on compositionstart | N
onEnter | Function |  | Typescript：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: InputValue, context: { e: FocusEvent }) => void`<br/> | N
onKeydown | Function |  | Typescript：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/> | N
onKeypress | Function |  | Typescript：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/> | N
onKeyup | Function |  | Typescript：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/> | N
onMouseenter | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>trigger on mouseenter | N
onMouseleave | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>trigger on mouseleave | N
onPaste | Function |  | Typescript：`(context: { e: ClipboardEvent; pasteValue: string }) => void`<br/> | N
onValidate | Function |  | Typescript：`(context: { error?: 'exceed-maximum' \| 'below-minimum' }) => void`<br/>trigger on text length being over max length or max character | N
onWheel | Function |  | Typescript：`(context: { e: WheelEvent }) => void`<br/>trigger on mouse wheel | N

### Input Events

name | params | description
-- | -- | --
blur | `(value: InputValue, context: { e: FocusEvent })` | \-
change | `(value: InputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; trigger: 'input' \| 'initial' \| 'clear' })` | \-
clear | `(context: { e: MouseEvent })` | \-
click | `(context: { e: MouseEvent })` | \-
compositionend | `(value: InputValue, context: { e: CompositionEvent })` | trigger on compositionend
compositionstart | `(value: InputValue, context: { e: CompositionEvent })` | trigger on compositionstart
enter | `(value: InputValue, context: { e: KeyboardEvent })` | \-
focus | `(value: InputValue, context: { e: FocusEvent })` | \-
keydown | `(value: InputValue, context: { e: KeyboardEvent })` | \-
keypress | `(value: InputValue, context: { e: KeyboardEvent })` | \-
keyup | `(value: InputValue, context: { e: KeyboardEvent })` | \-
mouseenter | `(context: { e: MouseEvent })` | trigger on mouseenter
mouseleave | `(context: { e: MouseEvent })` | trigger on mouseleave
paste | `(context: { e: ClipboardEvent; pasteValue: string })` | \-
validate | `(context: { error?: 'exceed-maximum' \| 'below-minimum' })` | trigger on text length being over max length or max character
wheel | `(context: { e: WheelEvent })` | trigger on mouse wheel

### InputGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
separate | Boolean | - | need separate between multiple inputs | N
