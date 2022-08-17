:: BASE_DOC ::

## API
### Cascader Props

name | type | default | description | required
-- | -- | -- | -- | --
checkProps | Object | - | Typescript：`CheckboxProps`，[Checkbox API Documents](./checkbox?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
checkStrictly | Boolean | false | \- | N
clearable | Boolean | false | \- | N
collapsedItems | Slot / Function | - | Typescript：`TNode<{ value: CascaderOption[]; collapsedSelectedItems: CascaderOption[]; count: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | \- | N
empty | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | Typescript：`(filterWords: string, node: TreeNodeModel) => boolean | Promise<boolean>` | N
filterable | Boolean | false | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
keys | Object | - | Typescript：`CascaderKeysType` `interface CascaderKeysType { value?: string; label?: string; children?: string | boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
lazy | Boolean | true | \- | N
load | Function | - | Typescript：`(node: TreeNodeModel<CascaderOption>) => Promise<Array<CascaderOption>>` | N
loading | Boolean | false | \- | N
loadingText | String / Slot / Function | '' | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | 0 | \- | N
minCollapsedNum | Number | 0 | \- | N
multiple | Boolean | false | \- | N
options | Array | [] | Typescript：`Array<CascaderOption>` | N
placeholder | String | undefined | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
popupVisible | Boolean | undefined | \- | N
readonly | Boolean | false | \- | N
selectInputProps | Object | - | Typescript：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
showAllLevels | Boolean | true | \- | N
size | String | medium | options：large/medium/small。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
status | String | - | options：default/success/warning/error | N
tagInputProps | Object | - | Typescript：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
tagProps | Object | - | Typescript：`TagProps`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
tips | String / Slot / Function | - | tips at the bottom of cascader。Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
trigger | String | click | options：click/hover | N
value | String / Number / Array | [] | `v-model` and `v-model:value` is supported。Typescript：`CascaderValue<CascaderOption>` `type CascaderValue<T extends TreeOptionData = TreeOptionData> = string | number | T | Array<CascaderValue<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
defaultValue | String / Number / Array | [] | uncontrolled property。Typescript：`CascaderValue<CascaderOption>` `type CascaderValue<T extends TreeOptionData = TreeOptionData> = string | number | T | Array<CascaderValue<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
valueMode | String | onlyLeaf | options：onlyLeaf/parentFirst/all | N
valueType | String | single | options：single/full | N
onBlur | Function |  | TS 类型：`(context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void`<br/> | N
onChange | Function |  | TS 类型：`(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface CascaderChangeContext<CascaderOption> { node?: TreeNodeModel<CascaderOption>; source: CascaderChangeSource }`<br/><br/>`import { TreeNodeModel } from '@Tree'`<br/><br/>`type CascaderChangeSource = 'invalid-value' | 'check' | 'clear' | 'uncheck'`<br/> | N
onFocus | Function |  | TS 类型：`(context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void`<br/> | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onRemove | Function |  | TS 类型：`(context: RemoveContext<CascaderOption>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface RemoveContext<T> { value: CascaderValue<T>; node: TreeNodeModel<T> }`<br/> | N

### Cascader Events

name | params | description
-- | -- | --
blur | `(context: { value: CascaderValue<CascaderOption>; e: FocusEvent })` | \-
change | `(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface CascaderChangeContext<CascaderOption> { node?: TreeNodeModel<CascaderOption>; source: CascaderChangeSource }`<br/><br/>`import { TreeNodeModel } from '@Tree'`<br/><br/>`type CascaderChangeSource = 'invalid-value' | 'check' | 'clear' | 'uncheck'`<br/>
focus | `(context: { value: CascaderValue<CascaderOption>; e: FocusEvent })` | \-
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
remove | `(context: RemoveContext<CascaderOption>)` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface RemoveContext<T> { value: CascaderValue<T>; node: TreeNodeModel<T> }`<br/>
