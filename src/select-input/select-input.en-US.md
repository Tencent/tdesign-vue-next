:: BASE_DOC ::

## API
### SelectInput Props

name | type | default | description | required
-- | -- | -- | -- | --
allowInput | Boolean | false | \- | N
autoWidth | Boolean | false | \- | N
autofocus | Boolean | false | \- | N
borderless | Boolean | false | \- | N
clearable | Boolean | false | \- | N
collapsedItems | Slot / Function | - | Typescript：`TNode<{ value: SelectInputValue; collapsedTags: SelectInputValue; count: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | - | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
inputValue | String / Number | - | input value。`v-model:inputValue` is supported。Typescript：`InputValue`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
defaultInputValue | String / Number | - | input value。uncontrolled property。Typescript：`InputValue`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
keys | Object | - | Typescript：`SelectInputKeys` `interface SelectInputKeys { label?: string; value?: string; children?: string }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | \- | N
minCollapsedNum | Number | 0 | \- | N
multiple | Boolean | false | \- | N
panel | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | - | placeholder description | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
popupVisible | Boolean | - | `v-model:popupVisible` is supported | N
defaultPopupVisible | Boolean | - | uncontrolled property | N
readonly | Boolean | false | \- | N
status | String | default | options：default/success/warning/error | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tag | String / Slot / Function | - | Typescript：`string \| TNode<{ value: string \| number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | Object | - | Typescript：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tagProps | Object | - | Typescript：`TagProps`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number / Boolean / Object / Array / Date | - | Typescript：`SelectInputValue` `type SelectInputValue = string \| number \| boolean \| Date \| Object \| Array<any> \| Array<SelectInputValue>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
valueDisplay | String / Slot / Function | - | Typescript：`string \| TNode<{ value: TagInputValue; onClose: (index: number, item?: any) => void }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
valueDisplayOptions | Object | - | Custom value display. See `SelectInputValueDisplayOptions` below. TypeScript: `SelectInputValueDisplayOptions` | N
onBlur | Function |  | Typescript：`(value: SelectInputValue, context: SelectInputBlurContext) => void`<br/>trigger on blur。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputBlurContext = PopupVisibleChangeContext & { inputValue: string; tagInputValue?: TagInputValue; }`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onEnter | Function |  | Typescript：`(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue; tagInputValue?: TagInputValue }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: SelectInputValue, context: SelectInputFocusContext) => void`<br/>trigger on focus。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputFocusContext { inputValue: InputValue; tagInputValue?: TagInputValue; e: FocusEvent }`<br/> | N
onInputChange | Function |  | Typescript：`(value: InputValue, context?: SelectInputValueChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputValueChangeContext { e?: Event \| InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent; trigger: 'input' \| 'clear' \| 'blur' \| 'focus' \| 'initial' \| 'change' }`<br/> | N
onMouseenter | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>trigger on mouseenter | N
onMouseleave | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>trigger on mouseleave | N
onPaste | Function |  | Typescript：`(context: { e: ClipboardEvent; pasteValue: string }) => void`<br/> | N
onPopupVisibleChange | Function |  | Typescript：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onTagChange | Function |  | Typescript：`(value: TagInputValue, context: SelectInputChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputChangeContext = TagInputChangeContext`<br/> | N

### SelectInput Events

name | params | description
-- | -- | --
blur | `(value: SelectInputValue, context: SelectInputBlurContext)` | trigger on blur。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputBlurContext = PopupVisibleChangeContext & { inputValue: string; tagInputValue?: TagInputValue; }`<br/>
clear | `(context: { e: MouseEvent })` | \-
enter | `(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue; tagInputValue?: TagInputValue })` | \-
focus | `(value: SelectInputValue, context: SelectInputFocusContext)` | trigger on focus。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputFocusContext { inputValue: InputValue; tagInputValue?: TagInputValue; e: FocusEvent }`<br/>
input-change | `(value: InputValue, context?: SelectInputValueChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputValueChangeContext { e?: Event \| InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent; trigger: 'input' \| 'clear' \| 'blur' \| 'focus' \| 'initial' \| 'change' }`<br/>
mouseenter | `(context: { e: MouseEvent })` | trigger on mouseenter
mouseleave | `(context: { e: MouseEvent })` | trigger on mouseleave
paste | `(context: { e: ClipboardEvent; pasteValue: string })` | \-
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
tag-change | `(value: TagInputValue, context: SelectInputChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputChangeContext = TagInputChangeContext`<br/>

### SelectInputValueDisplayOptions

name | type | default | description | required
-- | -- | -- | -- | --
useInputDisplay | Boolean | false | Use with valueDisplay, enable component's integrated input display when single select(multiple disabled) with filterable enabled. In default need to render valueDisplay via input event. This option is not used when multiple select(multiple enabled), will use component's integrated input display by default. | N
usePlaceholder | Boolean | false | Use with valueDisplay, enable component's integrated placeholder implementation when single select(multiple disabled). In default need to render valueDisplay via param value(while param placeholder not rendered). This option is not used when multiple select(multiple enabled), will use component's integrated placeholder implementation by default. | N
