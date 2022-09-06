:: BASE_DOC ::

## API
### SelectInput Props

name | type | default | description | required
-- | -- | -- | -- | --
allowInput | Boolean | false | \- | N
autoWidth | Boolean | false | \- | N
borderless | Boolean | false | \- | N
clearable | Boolean | false | \- | N
collapsedItems | Slot / Function | - | Typescript：`TNode<{ value: SelectInputValue; collapsedTags: SelectInputValue; count: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
inputValue | String / Number | - | input value。`v-model:inputValue` is supported。Typescript：`InputValue`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
defaultInputValue | String / Number | - | input value。uncontrolled property。Typescript：`InputValue`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
keys | Object | - | Typescript：`SelectInputKeys` `interface SelectInputKeys { label?: string; value?: string; children?: string }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
label | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | \- | N
minCollapsedNum | Number | 0 | \- | N
multiple | Boolean | false | \- | N
panel | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | - | placeholder description | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
popupVisible | Boolean | undefined | \- | N
readonly | Boolean | false | \- | N
status | String | default | options：default/success/warning/error | N
suffix | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tag | String / Slot / Function | - | Typescript：`string | TNode<{ value: string | number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | Object | - | Typescript：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tagProps | Object | - | Typescript：`TagProps`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tips | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number / Boolean / Object / Array / Date | - | Typescript：`SelectInputValue` `type SelectInputValue = string | number | boolean | Date | Object | Array<any> | Array<SelectInputValue>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
valueDisplay | String / Slot / Function | - | Typescript：`string | TNode<{ value: SelectInputValue; onClose: (index: number, item?: any) => void }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onBlur | Function |  | TS 类型：`(value: SelectInputValue, context: SelectInputFocusContext) => void`<br/>trigger on blur | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/> | N
onEnter | Function |  | TS 类型：`(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => void`<br/> | N
onFocus | Function |  | TS 类型：`(value: SelectInputValue, context: SelectInputFocusContext) => void`<br/>trigger on focus。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputFocusContext { inputValue: InputValue; tagInputValue?: TagInputValue; e: FocusEvent }`<br/> | N
onInputChange | Function |  | TS 类型：`(value: InputValue, context?: SelectInputValueChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputValueChangeContext { e?: InputEvent | MouseEvent | FocusEvent | KeyboardEvent; trigger: 'input' | 'clear' | 'blur' }`<br/> | N
onMouseenter | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>trigger on mouseenter | N
onMouseleave | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>trigger on mouseleave | N
onPaste | Function |  | TS 类型：`(context: { e: ClipboardEvent; pasteValue: string }) => void`<br/> | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onTagChange | Function |  | TS 类型：`(value: SelectInputValue, context: SelectInputChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputChangeContext = TagInputChangeContext`<br/> | N

### SelectInput Events

name | params | description
-- | -- | --
blur | `(value: SelectInputValue, context: SelectInputFocusContext)` | trigger on blur
clear | `(context: { e: MouseEvent })` | \-
enter | `(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue })` | \-
focus | `(value: SelectInputValue, context: SelectInputFocusContext)` | trigger on focus。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputFocusContext { inputValue: InputValue; tagInputValue?: TagInputValue; e: FocusEvent }`<br/>
input-change | `(value: InputValue, context?: SelectInputValueChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputValueChangeContext { e?: InputEvent | MouseEvent | FocusEvent | KeyboardEvent; trigger: 'input' | 'clear' | 'blur' }`<br/>
mouseenter | `(context: { e: MouseEvent })` | trigger on mouseenter
mouseleave | `(context: { e: MouseEvent })` | trigger on mouseleave
paste | `(context: { e: ClipboardEvent; pasteValue: string })` | \-
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
tag-change | `(value: SelectInputValue, context: SelectInputChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputChangeContext = TagInputChangeContext`<br/>
