:: BASE_DOC ::

## API

### TreeSelect Props

name | type | default | description | required
-- | -- | -- | -- | --
autoWidth | Boolean | false | \- | N
borderless | Boolean | false | \- | N
clearable | Boolean | false | \- | N
collapsedItems | Slot / Function | - | Typescript：`TNode<{ value: DataOption[]; collapsedSelectedItems: DataOption[]; count: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
data | Array | [] | Typescript：`Array<DataOption>` | N
disabled | Boolean | - | \- | N
empty | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | Typescript：`(filterWords: string, option: DataOption) => boolean` | N
filterable | Boolean | false | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
inputValue | String / Number | - | input value。`v-model:inputValue` is supported。Typescript：`InputValue`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
defaultInputValue | String / Number | - | input value。uncontrolled property。Typescript：`InputValue`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
keys | Object | - | Typescript：`TreeKeysType`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | \- | N
loadingText | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | 0 | \- | N
minCollapsedNum | Number | 0 | \- | N
multiple | Boolean | false | \- | N
placeholder | String | undefined | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
popupVisible | Boolean | - | \- | N
prefixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | \- | N
selectInputProps | Object | - | Typescript：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
size | String | medium | options：small/medium/large | N
status | String | - | options：default/success/warning/error | N
tagProps | Object | - | Typescript：`TagProps`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
treeProps | Object | - | Typescript：`TreeProps`，[Tree API Documents](./tree?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
value | String / Number / Object / Array | - | `v-model` and `v-model:value` is supported。Typescript：`TreeSelectValue` `type TreeSelectValue = string \| number \| object \| Array<TreeSelectValue>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
defaultValue | String / Number / Object / Array | - | uncontrolled property。Typescript：`TreeSelectValue` `type TreeSelectValue = string \| number \| object \| Array<TreeSelectValue>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
valueDisplay | Slot / Function | - | Typescript：`string \| TNode<{ value: TreeSelectValue; onClose: (index: number, item?: any) => void }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
valueType | String | value | options：value/object | N
onBlur | Function |  | Typescript：`(context: { value: TreeSelectValue; e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: TreeSelectValue, context: { node: TreeNodeModel<DataOption>; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: TreeSelectValue; e: FocusEvent }) => void`<br/> | N
onInputChange | Function |  | Typescript：`(value: InputValue, context?: SelectInputValueChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/> | N
onPopupVisibleChange | Function |  | Typescript：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onRemove | Function |  | Typescript：`(options: RemoveOptions<DataOption>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`interface RemoveOptions<T> { value: string \| number \| object; data: T; e?: MouseEvent }`<br/> | N
onSearch | Function |  | Typescript：`(filterWords: string) => void`<br/> | N

### TreeSelect Events

name | params | description
-- | -- | --
blur | `(context: { value: TreeSelectValue; e: FocusEvent })` | \-
change | `(value: TreeSelectValue, context: { node: TreeNodeModel<DataOption>; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent })` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/>
clear | `(context: { e: MouseEvent })` | \-
focus | `(context: { value: TreeSelectValue; e: FocusEvent })` | \-
input-change | `(value: InputValue, context?: SelectInputValueChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/>
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
remove | `(options: RemoveOptions<DataOption>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`interface RemoveOptions<T> { value: string \| number \| object; data: T; e?: MouseEvent }`<br/>
search | `(filterWords: string)` | \-
