:: BASE_DOC ::

## API
### InputNumber Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | - | options：left/center/right | N
allowInputOverLimit | Boolean | true | \- | N
autoWidth | Boolean | false | \- | N
decimalPlaces | Number / Object | undefined | Typescript：`InputNumberDecimalPlaces` `type InputNumberDecimalPlaces = number \| { enableRound: boolean; places: number } `。[see more ts definition](https://github.com/Tencent/tdesign-react/blob/develop/src/input-number/type.ts) | N
disabled | Boolean | - | \- | N
format | Function | - | Typescript：`(value: InputNumberValue, context?: { fixedNumber?: InputNumberValue }) => InputNumberValue` | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
largeNumber | Boolean | false | \- | N
max | String / Number | Infinity | Typescript：`InputNumberValue` | N
min | String / Number | -Infinity | Typescript：`InputNumberValue` | N
placeholder | String | undefined | \- | N
readonly | Boolean | false | \- | N
size | String | medium | options：small/medium/large | N
status | String | default | options：default/success/warning/error | N
step | String / Number | 1 | Typescript：`InputNumberValue` | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | row | options：column/row/normal | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`T` `type InputNumberValue = number \| string`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`T` `type InputNumberValue = number \| string`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts) | N
onBlur | Function |  | Typescript：`(value: InputNumberValue, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: T, context: ChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts)。<br/>`interface ChangeContext { type: ChangeSource; e: InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent }`<br/><br/>`type ChangeSource = 'add' \| 'reduce' \| 'input' \| 'blur' \| 'enter' \| 'clear' \| 'props'`<br/> | N
onEnter | Function |  | Typescript：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: InputNumberValue, context: { e: FocusEvent }) => void`<br/> | N
onKeydown | Function |  | Typescript：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/> | N
onKeypress | Function |  | Typescript：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/> | N
onKeyup | Function |  | Typescript：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/> | N
onValidate | Function |  | Typescript：`(context: { error?: 'exceed-maximum' \| 'below-minimum' }) => void`<br/> | N

### InputNumber Events

name | params | description
-- | -- | --
blur | `(value: InputNumberValue, context: { e: FocusEvent })` | \-
change | `(value: T, context: ChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts)。<br/>`interface ChangeContext { type: ChangeSource; e: InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent }`<br/><br/>`type ChangeSource = 'add' \| 'reduce' \| 'input' \| 'blur' \| 'enter' \| 'clear' \| 'props'`<br/>
enter | `(value: InputNumberValue, context: { e: KeyboardEvent })` | \-
focus | `(value: InputNumberValue, context: { e: FocusEvent })` | \-
keydown | `(value: InputNumberValue, context: { e: KeyboardEvent })` | \-
keypress | `(value: InputNumberValue, context: { e: KeyboardEvent })` | \-
keyup | `(value: InputNumberValue, context: { e: KeyboardEvent })` | \-
validate | `(context: { error?: 'exceed-maximum' \| 'below-minimum' })` | \-
