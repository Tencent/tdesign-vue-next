:: BASE_DOC ::

## API

### Tree Props

name | type | default | description | required
-- | -- | -- | -- | --
activable | Boolean | false | \- | N
activeMultiple | Boolean | false | \- | N
actived | Array | - | `v-model:actived` is supported。Typescript：`Array<TreeNodeValue>` | N
defaultActived | Array | - | uncontrolled property。Typescript：`Array<TreeNodeValue>` | N
allowFoldNodeOnFilter | Boolean | false | \- | N
checkProps | Object | - | Typescript：`CheckboxProps`，[Checkbox API Documents](./checkbox?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
checkStrictly | Boolean | false | \- | N
checkable | Boolean | false | \- | N
data | Array | [] | Typescript：`Array<T>` | N
disableCheck | Boolean / Function | false | Typescript：`boolean \| ((node: TreeNodeModel<T>) => boolean)` | N
disabled | Boolean | - | \- | N
draggable | Boolean | - | \- | N
empty | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
expandAll | Boolean | false | \- | N
expandLevel | Number | 0 | \- | N
expandMutex | Boolean | false | \- | N
expandOnClickNode | Boolean | false | \- | N
expandParent | Boolean | false | \- | N
expanded | Array | [] | `v-model:expanded` is supported。Typescript：`Array<TreeNodeValue>` | N
defaultExpanded | Array | [] | uncontrolled property。Typescript：`Array<TreeNodeValue>` | N
filter | Function | - | Typescript：`(node: TreeNodeModel<T>) => boolean` | N
hover | Boolean | - | \- | N
icon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode<TreeNodeModel<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`TreeKeysType` `interface TreeKeysType { value?: string; label?: string; children?: string }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
label | String / Boolean / Slot / Function | true | Typescript：`string \| boolean \| TNode<TreeNodeModel<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
lazy | Boolean | true | \- | N
line | Boolean / Slot / Function | false | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
load | Function | - | Typescript：`(node: TreeNodeModel<T>) => Promise<Array<T>>` | N
operations | Slot / Function | - | Typescript：`TNode<TreeNodeModel<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
transition | Boolean | true | \- | N
value | Array | [] | `v-model` and `v-model:value` is supported。Typescript：`Array<TreeNodeValue>` `type TreeNodeValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
defaultValue | Array | [] | uncontrolled property。Typescript：`Array<TreeNodeValue>` `type TreeNodeValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
valueMode | String | onlyLeaf | options：onlyLeaf/parentFirst/all | N
onActive | Function |  | Typescript：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> }) => void`<br/> | N
onClick | Function |  | Typescript：`(context: { node: TreeNodeModel<T>; e: MouseEvent }) => void`<br/> | N
onExpand | Function |  | Typescript：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e: MouseEvent }) => void`<br/> | N
onLoad | Function |  | Typescript：`(context: { node: TreeNodeModel<T> }) => void`<br/> | N

### Tree Events

name | params | description
-- | -- | --
active | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> })` | \-
change | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T> })` | \-
click | `(context: { node: TreeNodeModel<T>; e: MouseEvent })` | \-
expand | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e: MouseEvent })` | \-
load | `(context: { node: TreeNodeModel<T> })` | \-

### TreeInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
appendTo | `(value: TreeNodeValue, newData: T \| Array<T>)` | \- | \-
getIndex | `(value: TreeNodeValue)` | `number` | \-
getItem | `(value: TreeNodeValue)` | `TreeNodeModel<T>` | \-
getItems | `(value?: TreeNodeValue)` | `Array<TreeNodeModel<T>>` | \-
getParent | `(value: TreeNodeValue)` | `TreeNodeModel<T>` | \-
getParents | `(value: TreeNodeValue)` | `TreeNodeModel<T>[]` | \-
getPath | `(value: TreeNodeValue)` | `TreeNodeModel<T>[]` | \-
insertAfter | `(value: TreeNodeValue, newData: T)` | \- | \-
insertBefore | `(value: TreeNodeValue, newData: T)` | \- | \-
remove | `(value: TreeNodeValue)` | \- | \-
setItem | `(value: TreeNodeValue, options: TreeNodeState)` | \- | \-

### TreeNodeState

name | type | default | description | required
-- | -- | -- | -- | --
activable | Boolean | false | \- | N
actived | Boolean | false | \- | N
checkable | Boolean | false | \- | N
checked | Boolean | false | \- | N
disabled | Boolean | false | \- | N
expandMutex | Boolean | false | \- | N
expanded | Boolean | false | \- | N
indeterminate | Boolean | false | \- | N
label | String | - | \- | N
loading | Boolean | false | \- | N
value | String / Number | - | \- | N
visible | Boolean | false | \- | N

### TreeNodeModel

name | type | default | description | required
-- | -- | -- | -- | --
actived | Boolean | - | required | Y
checked | Boolean | - | required | Y
data | Object | - | required。Typescript：`T` | Y
expanded | Boolean | - | required | Y
indeterminate | Boolean | - | required | Y
loading | Boolean | - | required | Y
`TreeNodeState` | \- | - | \- | N
### TreeNodeModel

name | params | return | description
-- | -- | -- | --
appendData | `(data: T \| Array<T>)` | \- | required
getChildren | `(deep: boolean)` | `Array<TreeNodeModel<T>> \| boolean` | required
getIndex | \- | `number` | required
getLevel | \- | `number` | required
getParent | \- | `TreeNodeModel<T>` | required
getParents | \- | `Array<TreeNodeModel<T>>` | required
getPath | \- | `Array<TreeNodeModel<T>>` | required
getRoot | \- | `TreeNodeModel<T>` | required
getSiblings | \- | `Array<TreeNodeModel<T>>` | required
insertAfter | `(newData: T)` | \- | required
insertBefore | `(newData: T)` | \- | required
isFirst | \- | `boolean` | required
isLast | \- | `boolean` | required
isLeaf | \- | `boolean` | required
remove | `(value?: TreeNodeValue)` | \- | required
setData | `(data: T)` | \- | required
