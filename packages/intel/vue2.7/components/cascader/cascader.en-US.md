:: BASE_DOC ::

## API
### Cascader Props

name | type | default | description | required
-- | -- | -- | -- | --
autofocus | Boolean | - | \- | N
borderless | Boolean | false | \- | N
checkProps | Object | - | Typescript：`CheckboxProps`，[Checkbox API Documents](./checkbox?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
checkStrictly | Boolean | false | \- | N
clearable | Boolean | false | \- | N
collapsedItems | Slot / Function | - | Typescript：`TNode<{ value: CascaderOption[]; collapsedSelectedItems: CascaderOption[]; count: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | - | \- | N
empty | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
filter | Function | - | Typescript：`(filterWords: string, node: TreeNodeModel) => boolean \| Promise<boolean>` | N
filterable | Boolean | false | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
keys | Object | - | Typescript：`TreeKeysType`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
lazy | Boolean | true | \- | N
load | Function | - | Typescript：`(node: TreeNodeModel<CascaderOption>) => Promise<Array<CascaderOption>>` | N
loading | Boolean | false | \- | N
loadingText | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
max | Number | 0 | \- | N
minCollapsedNum | Number | 0 | \- | N
multiple | Boolean | false | \- | N
option | Slot / Function | - | customize one option。Typescript：`TNode<{ item: CascaderOption; index: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
options | Array | [] | Typescript：`Array<CascaderOption>` | N
placeholder | String | undefined | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
popupVisible | Boolean | - | \- | N
defaultPopupVisible | Boolean | - | uncontrolled property | N
readonly | Boolean | false | \- | N
reserveKeyword | Boolean | false | \- | N
selectInputProps | Object | - | Typescript：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
showAllLevels | Boolean | true | \- | N
size | String | medium | options: large/medium/small。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
status | String | default | options: default/success/warning/error | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
tagInputProps | Object | - | Typescript：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
tagProps | Object | - | Typescript：`TagProps`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
tips | String / Slot / Function | - | tips at the bottom of cascader。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
trigger | String | click | options: click/hover | N
value | String / Number / Array | [] | `v-model` is supported。Typescript：`CascaderValue<CascaderOption>` `type CascaderValue<T extends TreeOptionData = TreeOptionData> = string \| number \| T \| Array<CascaderValue<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
defaultValue | String / Number / Array | [] | uncontrolled property。Typescript：`CascaderValue<CascaderOption>` `type CascaderValue<T extends TreeOptionData = TreeOptionData> = string \| number \| T \| Array<CascaderValue<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts) | N
valueDisplay | String / Slot / Function | - | `MouseEvent<SVGElement>`。Typescript：`string \| TNode<{ value: CascaderValue<CascaderOption>; onClose: (index: number) => void; displayValue?: CascaderValue<CascaderOption> }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
valueMode | String | onlyLeaf | options: onlyLeaf/parentFirst/all | N
valueType | String | single | options: single/full | N
onBlur | Function |  | Typescript：`(context: { value: CascaderValue<CascaderOption> } & SelectInputBlurContext ) => void`<br/> | N
onChange | Function |  | Typescript：`(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts)。<br/>`interface CascaderChangeContext<CascaderOption> { node?: TreeNodeModel<CascaderOption>; source: CascaderChangeSource }`<br/><br/>`import { TreeNodeModel } from '@Tree'`<br/><br/>`type CascaderChangeSource = 'invalid-value' \| 'check' \| 'clear' \| 'uncheck'`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void`<br/> | N
onPopupVisibleChange | Function |  | Typescript：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onRemove | Function |  | Typescript：`(context: RemoveContext<CascaderOption>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts)。<br/>`interface RemoveContext<T> { value: CascaderValue<T>; node: TreeNodeModel<T> }`<br/> | N

### Cascader Events

name | params | description
-- | -- | --
blur | `(context: { value: CascaderValue<CascaderOption> } & SelectInputBlurContext )` | \-
change | `(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts)。<br/>`interface CascaderChangeContext<CascaderOption> { node?: TreeNodeModel<CascaderOption>; source: CascaderChangeSource }`<br/><br/>`import { TreeNodeModel } from '@Tree'`<br/><br/>`type CascaderChangeSource = 'invalid-value' \| 'check' \| 'clear' \| 'uncheck'`<br/>
focus | `(context: { value: CascaderValue<CascaderOption>; e: FocusEvent })` | \-
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
remove | `(context: RemoveContext<CascaderOption>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/cascader/type.ts)。<br/>`interface RemoveContext<T> { value: CascaderValue<T>; node: TreeNodeModel<T> }`<br/>
