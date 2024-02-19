:: BASE_DOC ::

## API
### Tree Props

name | type | default | description | required
-- | -- | -- | -- | --
activable | Boolean | false | make nodes can be highlight | N
activeMultiple | Boolean | false | \- | N
actived | Array | - | `v-model:actived` is supported。Typescript：`Array<TreeNodeValue>` | N
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
filter | Function | - | Typescript：`(node: TreeNodeModel<T>) => boolean` | N
height | String / Number | - | The height of tree. Scrollbar will appear after the content is overflow. Examples: 100, '30%', '300'. The value should be a number and will automatically be converted to a pixel value. If the tree height is not fixed, it is recommended to use `maxHeight`. | N
hover | Boolean | - | \- | N
icon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode<TreeNodeModel<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
keys | Object | - | alias field name in data。Typescript：`TreeKeysType`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Boolean / Slot / Function | true | Typescript：`string \| boolean \| TNode<TreeNodeModel<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
lazy | Boolean | true | \- | N
line | Boolean / Slot / Function | false | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
load | Function | - | Typescript：`(node: TreeNodeModel<T>) => Promise<Array<T>>` | N
maxHeight | String / Number | - | The max height of tree. Scrollbar will appear after the content is overflow. Examples: 100, '30%', '300'.  | N
operations | Slot / Function | - | Typescript：`TNode<TreeNodeModel<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
scroll | Object | - | lazy load and virtual scroll。Typescript：`TScroll`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
transition | Boolean | true | \- | N
value | Array | [] | `v-model` and `v-model:value` is supported。Typescript：`Array<TreeNodeValue>` `type TreeNodeValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
defaultValue | Array | [] | uncontrolled property。Typescript：`Array<TreeNodeValue>` `type TreeNodeValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
valueMode | String | onlyLeaf | options: onlyLeaf/parentFirst/all | N
onActive | Function |  | Typescript：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'setItem' }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: any; trigger: 'node-click' \| 'setItem' }) => void`<br/> | N
onClick | Function |  | Typescript：`(context: { node: TreeNodeModel<T>; e: MouseEvent }) => void`<br/> | N
onDragEnd | Function |  | Typescript：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/> | N
onDragLeave | Function |  | Typescript：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/> | N
onDragOver | Function |  | Typescript：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/> | N
onDragStart | Function |  | Typescript：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/> | N
onDrop | Function |  | Typescript：`(context: {     e: DragEvent;     dragNode: TreeNodeModel<T>;     dropNode: TreeNodeModel<T>;     dropPosition: number;   }) => void`<br/> | N
onExpand | Function |  | Typescript：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'icon-click' \| 'setItem' }) => void`<br/> | N
onLoad | Function |  | Typescript：`(context: { node: TreeNodeModel<T> }) => void`<br/> | N
onScroll | Function |  | Typescript：`(params: { e: WheelEvent }) => void`<br/>trigger on content scroll | N

### Tree Events

name | params | description
-- | -- | --
active | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'setItem' })` | \-
change | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: any; trigger: 'node-click' \| 'setItem' })` | \-
click | `(context: { node: TreeNodeModel<T>; e: MouseEvent })` | \-
drag-end | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | \-
drag-leave | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | \-
drag-over | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | \-
drag-start | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | \-
drop | `(context: {     e: DragEvent;     dragNode: TreeNodeModel<T>;     dropNode: TreeNodeModel<T>;     dropPosition: number;   })` | \-
expand | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'icon-click' \| 'setItem' })` | \-
load | `(context: { node: TreeNodeModel<T> })` | \-
scroll | `(params: { e: WheelEvent })` | trigger on content scroll

### TreeInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
appendTo | `(value: TreeNodeValue, newData: T \| Array<T>)` | \- | required
getIndex | `(value: TreeNodeValue)` | `number` | required
getItem | `(value: TreeNodeValue)` | `TreeNodeModel<T>` | required
getItems | `(value?: TreeNodeValue)` | `Array<TreeNodeModel<T>>` | required
getParent | `(value: TreeNodeValue)` | `TreeNodeModel<T>` | required
getParents | `(value: TreeNodeValue)` | `TreeNodeModel<T>[]` | required
getPath | `(value: TreeNodeValue)` | `TreeNodeModel<T>[]` | required
getTreeData | `(value?: TreeNodeValue)` | `Array<T>` | required。get tree struct data
insertAfter | `(value: TreeNodeValue, newData: T)` | \- | required
insertBefore | `(value: TreeNodeValue, newData: T)` | \- | required
refresh | \- | \- | required。refresh tree state, used in tree search
remove | `(value: TreeNodeValue)` | \- | required
scrollTo | `(scrollToParams: ScrollToElementParams)` | \- | support scrolling to a specific node when virtual scrolling 
setItem | `(value: TreeNodeValue, options: TreeNodeState)` | \- | required

### TreeNodeState

name | type | default | description | required
-- | -- | -- | -- | --
activable | Boolean | false | \- | N
actived | Boolean | false | \- | N
checkable | Boolean | false | \- | N
checked | Boolean | false | \- | N
disabled | Boolean | false | \- | N
draggable | Boolean | true | \- | N
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
data | Object | - | required。node data, extends `TreeOptionData`。Typescript：`T` | Y
disabled | Boolean | - | required。node disabled state | Y
expanded | Boolean | - | required | Y
indeterminate | Boolean | - | required | Y
loading | Boolean | - | required | Y
`TreeNodeState` | \- | - | extends `TreeNodeState` | N
### TreeNodeModel

name | params | return | description
-- | -- | -- | --
appendData | `(data: T \| Array<T>)` | \- | required。add node data, `T` extends `TreeOptionData`
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
setData | `(data: T)` | \- | required。set node data, `T` extends `TreeOptionData`

### TScroll

name | type | default | description | required
-- | -- | -- | -- | --
bufferSize | Number | 20 | \- | N
isFixedRowHeight | Boolean | false | \- | N
rowHeight | Number | - | \- | N
threshold | Number | 100 | \- | N
type | String | - | required。options: lazy/virtual | Y
