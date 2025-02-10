:: BASE_DOC ::

## API

### AutoComplete Props

name | type | default | description | required
-- | -- | -- | -- | --
autofocus | Boolean | - | \- | N
borderless | Boolean | false | \- | N
clearable | Boolean | - | \- | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | undefined | \- | N
empty | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | Typescript：`(filterWords: string, option: T) => boolean \| Promise<boolean>` | N
filterable | Boolean | true | \- | N
highlightKeyword | Boolean | true | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/auto-complete/type.ts) | N
options | Array | - | Typescript：`Array<T>` | N
panelBottomContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
panelTopContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
placeholder | String | undefined | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/auto-complete/type.ts) | N
readonly | Boolean | undefined | \- | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
status | String | default | options: default/success/warning/error | N
textareaProps | Object | - | Typescript：`TextareaProps`，[Textarea API Documents](./textarea?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/auto-complete/type.ts) | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
triggerElement | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String | - | `v-model` and `v-model:value` is supported | N
defaultValue | String | - | uncontrolled property | N
onBlur | Function |  | Typescript：`(context: { e: FocusEvent; value: string }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: string, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent \| KeyboardEvent }) => void`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onCompositionend | Function |  | Typescript：`(context: { e: CompositionEvent; value: string }) => void`<br/>trigger on compositionend | N
onCompositionstart | Function |  | Typescript：`(context: { e: CompositionEvent; value: string }) => void`<br/>trigger on compositionstart | N
onEnter | Function |  | Typescript：`(context: { e: KeyboardEvent; value: string }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { e: FocusEvent; value: string }) => void`<br/> | N
onSelect | Function |  | Typescript：`(value: string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/> | N

### AutoComplete Events

name | params | description
-- | -- | --
blur | `(context: { e: FocusEvent; value: string })` | \-
change | `(value: string, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent \| KeyboardEvent })` | \-
clear | `(context: { e: MouseEvent })` | \-
compositionend | `(context: { e: CompositionEvent; value: string })` | trigger on compositionend
compositionstart | `(context: { e: CompositionEvent; value: string })` | trigger on compositionstart
enter | `(context: { e: KeyboardEvent; value: string })` | \-
focus | `(context: { e: FocusEvent; value: string })` | \-
select | `(value: string, context: { e: MouseEvent \| KeyboardEvent })` | \-
