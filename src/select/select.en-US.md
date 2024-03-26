:: BASE_DOC ::

## API

### Select Props

name | type | default | description | required
-- | -- | -- | -- | --
autoWidth | Boolean | false | \- | N
autofocus | Boolean | false | \- | N
borderless | Boolean | false | \- | N
clearable | Boolean | false | \- | N
collapsedItems | Slot / Function | - | Typescript：`TNode<{ value: T[]; collapsedSelectedItems: T[]; count: number; onClose: (context: { index: number, e?: MouseEvent }) => void }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
creatable | Boolean | false | \- | N
disabled | Boolean | - | \- | N
empty | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | Typescript：`(filterWords: string, option: T) => boolean \| Promise<boolean>` | N
filterable | Boolean | false | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
inputValue | String / Number | - | input value。`v-model:inputValue` is supported。Typescript：`string` | N
defaultInputValue | String / Number | - | input value。uncontrolled property。Typescript：`string` | N
keys | Object | - | alias option field。Typescript：`SelectKeysType` `interface SelectKeysType { value?: string \| ((option: SelectOption) => string); label?: string \| ((option: SelectOption) => string); disabled?: string }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | \- | N
loadingText | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | 0 | \- | N
minCollapsedNum | Number | 0 | \- | N
multiple | Boolean | false | \- | N
options | Array | - | Typescript：`Array<T>` | N
panelBottomContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
panelTopContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | undefined | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
popupVisible | Boolean | - | `v-model:popupVisible` is supported | N
defaultPopupVisible | Boolean | - | uncontrolled property | N
prefixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | \- | N
reserveKeyword | Boolean | false | \- | N
scroll | Object | - | lazy load and virtual scroll。Typescript：`InfinityScroll`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
selectInputProps | Object | - | Typescript：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
showArrow | Boolean | true | \- | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
status | String | default | options: default/success/warning/error | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | Object | - | Typescript：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
tagProps | Object | - | Typescript：`TagProps`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number / Boolean / Object / Array | - | `v-model` and `v-model:value` is supported。Typescript：`SelectValue` `type SelectValue<T extends SelectOption = SelectOption> = string \| number \| boolean \| T \| Array<SelectValue<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
defaultValue | String / Number / Boolean / Object / Array | - | uncontrolled property。Typescript：`SelectValue` `type SelectValue<T extends SelectOption = SelectOption> = string \| number \| boolean \| T \| Array<SelectValue<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
valueDisplay | String / Slot / Function | - | `MouseEvent<SVGElement>`。Typescript：`string \| TNode<{ value: SelectValue; onClose: (index: number) => void; displayValue?: SelectValue }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
valueType | String | value | options: value/object | N
onBlur | Function |  | Typescript：`(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: SelectValue, context: { option?: T, selectedOptions: T[], trigger: SelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`type SelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck' \| 'default'`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onCreate | Function |  | Typescript：`(value: string \| number) => void`<br/> | N
onEnter | Function |  | Typescript：`(context: { inputValue: string; e: KeyboardEvent; value: SelectValue }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent }) => void`<br/> | N
onInputChange | Function |  | Typescript：`(value: InputValue, context?: SelectInputValueChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/> | N
onPopupVisibleChange | Function |  | Typescript：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onRemove | Function |  | Typescript：`(options: SelectRemoveContext<T>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`interface SelectRemoveContext<T> { value: string \| number; data: T; e: MouseEvent \| KeyboardEvent }`<br/> | N
onSearch | Function |  | Typescript：`(filterWords: string, context: { e: KeyboardEvent }) => void`<br/> | N

### Select Events

name | params | description
-- | -- | --
blur | `(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent })` | \-
change | `(value: SelectValue, context: { option?: T, selectedOptions: T[], trigger: SelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent })` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`type SelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck' \| 'default'`<br/>
clear | `(context: { e: MouseEvent })` | \-
create | `(value: string \| number)` | \-
enter | `(context: { inputValue: string; e: KeyboardEvent; value: SelectValue })` | \-
focus | `(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent })` | \-
input-change | `(value: InputValue, context?: SelectInputValueChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/>
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
remove | `(options: SelectRemoveContext<T>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`interface SelectRemoveContext<T> { value: string \| number; data: T; e: MouseEvent \| KeyboardEvent }`<br/>
search | `(filterWords: string, context: { e: KeyboardEvent })` | \-


### Option Props

name | type | default | description | required
-- | -- | -- | -- | --
checkAll | Boolean | false | check all option, which can be both top of the panel and bottom of the panel | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | \- | N
label | String | - | \- | N
title | String | - | \- | N
value | String / Number | - | \- | N


### OptionGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
divider | Boolean | true | \- | N
label | String | - | \- | N

### TScroll

name | type | default | description | required
-- | -- | -- | -- | --
bufferSize | Number | 20 | \- | N
isFixedRowHeight | Boolean | false | \- | N
rowHeight | Number | - | \- | N
threshold | Number | 100 | \- | N
type | String | - | required。options: lazy/virtual | Y
