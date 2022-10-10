:: BASE_DOC ::

## API

### Search Props

name | type | default | description | required
-- | -- | -- | -- | --
autoWidth | Boolean | false | \- | N
autocompleteOptions | Array | - | autocomplete words list。Typescript：`Array<AutocompleteOption>` `type AutocompleteOption = string \| { label: string \| TNode; group?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
autofocus | Boolean | false | auto focus as default | N
borderless | Boolean | true | \- | N
clearable | Boolean | true | \- | N
disabled | Boolean | - | \- | N
filter | Function | - | Typescript：`(keyword: string, option: any) => boolean \| Promise<boolean>` | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
label | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
multiline | Boolean | false | \- | N
placeholder | String | '' | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
prefixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | \- | N
selectInputProps | Object | - | Typescript：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
suffix | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
textareaProps | Object | - | Typescript：`TextareaProps`，[Textarea API Documents](./textarea?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
value | String | - | `v-model` and `v-model:value` is supported | N
defaultValue | String | - | uncontrolled property | N
onBlur | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent }) => void`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onEnter | Function |  | Typescript：`(context: { value: string; e: KeyboardEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onSearch | Function |  | Typescript：`(context?: { value: string; trigger: 'enter' \| 'option-click' \| 'clear' \| 'suffix-click' \| 'prefix-click'; e?: InputEvent \| MouseEvent }) => void`<br/> | N

### Search Events

name | params | description
-- | -- | --
blur | `(context: { value: string; e: FocusEvent })` | \-
change | `(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent })` | \-
clear | `(context: { e: MouseEvent })` | \-
enter | `(context: { value: string; e: KeyboardEvent })` | \-
focus | `(context: { value: string; e: FocusEvent })` | \-
search | `(context?: { value: string; trigger: 'enter' \| 'option-click' \| 'clear' \| 'suffix-click' \| 'prefix-click'; e?: InputEvent \| MouseEvent })` | \-
