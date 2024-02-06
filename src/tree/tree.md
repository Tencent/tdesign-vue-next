:: BASE_DOC ::

## API
### Tree Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
activable | Boolean | false | 节点是否可高亮 | N
activeMultiple | Boolean | false | 是否允许多个节点同时高亮 | N
actived | Array | - | 高亮的节点值。支持语法糖 `v-model:actived`。TS 类型：`Array<TreeNodeValue>` | N
allowFoldNodeOnFilter | Boolean | false | 是否允许在过滤时节点折叠节点 | N
checkProps | Object | - | 透传属性到 checkbox 组件。参考 checkbox 组件 API。TS 类型：`CheckboxProps`，[Checkbox API Documents](./checkbox?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
checkStrictly | Boolean | false | 父子节点选中状态不再关联，可各自选中或取消 | N
checkable | Boolean | false | 隐藏节点复选框 | N
data | Array | [] | 树数据，泛型 `T` 表示树节点 TS 类型。TS 类型：`Array<T>` | N
disableCheck | Boolean / Function | false | 禁用复选框，可支持禁用不同的行。TS 类型：`boolean \| ((node: TreeNodeModel<T>) => boolean)` | N
disabled | Boolean | - | 是否禁用树操作 | N
draggable | Boolean | - | 节点是否可拖拽 | N
empty | String / Slot / Function | '' | 数据为空时展示的文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
expandAll | Boolean | false | 是否展开全部节点 | N
expandLevel | Number | 0 | 默认展开的级别，第一层为 0 | N
expandMutex | Boolean | false | 同级别展开互斥，手风琴效果 | N
expandOnClickNode | Boolean | false | 是否支持点击节点也能展开收起 | N
expandParent | Boolean | false | 展开子节点时是否自动展开父节点 | N
expanded | Array | [] | 展开的节点值。支持语法糖 `v-model:expanded`。TS 类型：`Array<TreeNodeValue>` | N
filter | Function | - | 节点过滤方法，只呈现返回值为 true 的节点，泛型 `T` 表示树节点 TS 类型。TS 类型：`(node: TreeNodeModel<T>) => boolean` | N
height | String / Number | - | 树的高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定树的高度，建议使用 `maxHeight` | N
hover | Boolean | - | 节点是否有悬浮状态 | N
icon | Boolean / Slot / Function | true | 节点图标，可自定义。TS 类型：`boolean \| TNode<TreeNodeModel<T>>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
keys | Object | - | 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label 'name', children: 'list' }`。其中，disabled 待开发。。TS 类型：`TreeKeysType`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Boolean / Slot / Function | true | 自定义节点内容，值为 `false` 不显示，值为 `true` 显示默认 label，值为字符串直接输出该字符串。泛型 `T` 表示树节点 TS 类型。<br/>如果期望只有点击复选框才选中，而点击节点不选中，可以使用 `label` 自定义节点，然后加上点击事件 `e.preventDefault()`，通过调整自定义节点的宽度和高度决定禁止点击选中的范围。TS 类型：`string \| boolean \| TNode<TreeNodeModel<T>>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
lazy | Boolean | true | 延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载 | N
line | Boolean / Slot / Function | false | 连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
load | Function | - | 加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效），泛型 `T` 表示树节点 TS 类型。TS 类型：`(node: TreeNodeModel<T>) => Promise<Array<T>>` | N
maxHeight | String / Number | - | 树的最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px | N
operations | Slot / Function | - | 自定义节点操作项，泛型 `T` 表示树节点 TS 类型。TS 类型：`TNode<TreeNodeModel<T>>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
scroll | Object | - | 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`。TS 类型：`TScroll`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
transition | Boolean | true | 节点展开折叠时是否使用过渡动画 | N
value | Array | [] | 选中值，组件为可选状态时有效。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`Array<TreeNodeValue>` `type TreeNodeValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
defaultValue | Array | [] | 选中值，组件为可选状态时有效。非受控属性。TS 类型：`Array<TreeNodeValue>` `type TreeNodeValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree/type.ts) | N
valueMode | String | onlyLeaf | 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all | N
onActive | Function |  | TS 类型：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'setItem' }) => void`<br/>节点激活时触发，泛型 `T` 表示树节点 TS 类型 | N
onChange | Function |  | TS 类型：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: any; trigger: 'node-click' \| 'setItem' }) => void`<br/>节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 `T` 表示树节点 TS 类型 | N
onClick | Function |  | TS 类型：`(context: { node: TreeNodeModel<T>; e: MouseEvent }) => void`<br/>节点点击时触发，泛型 `T` 表示树节点 TS 类型 | N
onDragEnd | Function |  | TS 类型：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/>节点结束拖拽时触发，泛型 `T` 表示树节点 TS 类型 | N
onDragLeave | Function |  | TS 类型：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/>节点拖拽时离开目标元素时触发，泛型 `T` 表示树节点 TS 类型 | N
onDragOver | Function |  | TS 类型：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/>节点拖拽到目标元素时触发，泛型 `T` 表示树节点 TS 类型 | N
onDragStart | Function |  | TS 类型：`(context: { e: DragEvent; node: TreeNodeModel<T> }) => void`<br/>节点开始拖拽时触发，泛型 `T` 表示树节点 TS 类型 | N
onDrop | Function |  | TS 类型：`(context: {     e: DragEvent;     dragNode: TreeNodeModel<T>;     dropNode: TreeNodeModel<T>;     dropPosition: number;   }) => void`<br/>节点在目标元素上释放时触发，泛型 `T` 表示树节点 TS 类型 | N
onExpand | Function |  | TS 类型：`(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'icon-click' \| 'setItem' }) => void`<br/>节点展开或收起时触发，泛型 `T` 表示树节点 TS 类型 | N
onLoad | Function |  | TS 类型：`(context: { node: TreeNodeModel<T> }) => void`<br/>异步加载后触发，泛型 `T` 表示树节点 TS 类型 | N
onScroll | Function |  | TS 类型：`(params: { e: WheelEvent }) => void`<br/>滚动事件 | N

### Tree Events

名称 | 参数 | 描述
-- | -- | --
active | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'setItem' })` | 节点激活时触发，泛型 `T` 表示树节点 TS 类型
change | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: any; trigger: 'node-click' \| 'setItem' })` | 节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 `T` 表示树节点 TS 类型
click | `(context: { node: TreeNodeModel<T>; e: MouseEvent })` | 节点点击时触发，泛型 `T` 表示树节点 TS 类型
drag-end | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | 节点结束拖拽时触发，泛型 `T` 表示树节点 TS 类型
drag-leave | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | 节点拖拽时离开目标元素时触发，泛型 `T` 表示树节点 TS 类型
drag-over | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | 节点拖拽到目标元素时触发，泛型 `T` 表示树节点 TS 类型
drag-start | `(context: { e: DragEvent; node: TreeNodeModel<T> })` | 节点开始拖拽时触发，泛型 `T` 表示树节点 TS 类型
drop | `(context: {     e: DragEvent;     dragNode: TreeNodeModel<T>;     dropNode: TreeNodeModel<T>;     dropPosition: number;   })` | 节点在目标元素上释放时触发，泛型 `T` 表示树节点 TS 类型
expand | `(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' \| 'icon-click' \| 'setItem' })` | 节点展开或收起时触发，泛型 `T` 表示树节点 TS 类型
load | `(context: { node: TreeNodeModel<T> })` | 异步加载后触发，泛型 `T` 表示树节点 TS 类型
scroll | `(params: { e: WheelEvent })` | 滚动事件

### TreeInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
appendTo | `(value: TreeNodeValue, newData: T \| Array<T>)` | \- | 必需。为指定节点添加子节点，默认添加到根节点，泛型 `T` 表示树节点 TS 类型
getIndex | `(value: TreeNodeValue)` | `number` | 必需。获取指定节点下标
getItem | `(value: TreeNodeValue)` | `TreeNodeModel<T>` | 必需。获取指定节点所有信息，泛型 `T` 表示树节点 TS 类型
getItems | `(value?: TreeNodeValue)` | `Array<TreeNodeModel<T>>` | 必需。获取某节点的全部子孙节点；参数为空，则表示获取整棵树的全部节点，泛型 `T` 表示树节点 TS 类型
getParent | `(value: TreeNodeValue)` | `TreeNodeModel<T>` | 必需。获取指定节点的直属父节点，泛型 `T` 表示树节点 TS 类型
getParents | `(value: TreeNodeValue)` | `TreeNodeModel<T>[]` | 必需。获取指定节点的全部父节点，泛型 `T` 表示树节点 TS 类型
getPath | `(value: TreeNodeValue)` | `TreeNodeModel<T>[]` | 必需。自下而上获取全路径数据，泛型 `T` 表示树节点 TS 类型
getTreeData | `(value?: TreeNodeValue)` | `Array<T>` | 必需。获取某节点的全部树形结构；参数为空，则表示获取整棵树的结构数据，泛型 `T` 表示树节点 TS 类型
insertAfter | `(value: TreeNodeValue, newData: T)` | \- | 必需。插入新节点到指定节点后面，泛型 `T` 表示树节点 TS 类型
insertBefore | `(value: TreeNodeValue, newData: T)` | \- | 必需。插入新节点到指定节点前面，泛型 `T` 表示树节点 TS 类型
remove | `(value: TreeNodeValue)` | \- | 必需。移除指定节点
scrollTo | `(scrollToParams: ScrollToElementParams)` | \- | 虚拟滚动场景下 支持指定滚动到具体的节点
setItem | `(value: TreeNodeValue, options: TreeNodeState)` | \- | 必需。设置节点状态

### TreeNodeState

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
activable | Boolean | false | 节点是否允许被激活 | N
actived | Boolean | false | 节点是否被激活 | N
checkable | Boolean | false | 节点是否允许被选中 | N
checked | Boolean | false | 节点是否被选中 | N
disabled | Boolean | false | 节点是否被禁用 | N
draggable | Boolean | true | 该节点是否允许被拖动，当树本身开启时，默认允许 | N
expandMutex | Boolean | false | 子节点是否互斥展开 | N
expanded | Boolean | false | 节点是否已展开 | N
indeterminate | Boolean | false | 节点是否为半选中状态 | N
label | String | - | 节点标签文案 | N
loading | Boolean | false | 子节点数据是否在加载中 | N
value | String / Number | - | 节点值 | N
visible | Boolean | false | 节点是否可视 | N

### TreeNodeModel

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
actived | Boolean | - | 必需。当前节点是否处于高亮激活态 | Y
checked | Boolean | - | 必需。当前节点是否被选中 | Y
data | Object | - | 必需。节点数据，泛型 `T` 表示树节点 TS 类型，继承 `TreeOptionData`。TS 类型：`T` | Y
disabled | Boolean | - | 必需。禁用状态 | Y
expanded | Boolean | - | 必需。当前节点是否展开 | Y
indeterminate | Boolean | - | 必需。当前节点是否处于半选状态 | Y
level | Number | - | 必需。当前节点所在层级，如果不存在请使用 `getLevel` 获取 | Y
loading | Boolean | - | 必需。当前节点是否处于加载中状态 | Y
`TreeNodeState` | \- | - | 继承 `TreeNodeState` 中的全部属性 | N
### TreeNodeModel

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
appendData | `(data: T \| Array<T>)` | \- | 必需。追加子节点数据，泛型 `T` 表示树节点 TS 类型，继承 `TreeOptionData`
getChildren | `(deep: boolean)` | `Array<TreeNodeModel<T>> \| boolean` | 必需。默认获取当前节点的全部子节点，deep 值为 true 则表示获取全部子孙节点
getIndex | \- | `number` | 必需。获取节点在父节点的子节点列表中的位置，如果没有父节点，则获取节点在根节点列表的位置
getLevel | \- | `number` | 必需。获取节点所在的层级
getParent | \- | `TreeNodeModel<T>` | 必需。获取单个父节点
getParents | \- | `Array<TreeNodeModel<T>>` | 必需。获取所有父节点
getPath | \- | `Array<TreeNodeModel<T>>` | 必需。获取节点全路径
getRoot | \- | `TreeNodeModel<T>` | 必需。获取根节点
getSiblings | \- | `Array<TreeNodeModel<T>>` | 必需。获取兄弟节点，包含自己在内
insertAfter | `(newData: T)` | \- | 必需。在当前节点前插入新节点，泛型 `T` 表示树节点 TS 类型
insertBefore | `(newData: T)` | \- | 必需。在当前节点前插入新节点，泛型 `T` 表示树节点 TS 类型
isFirst | \- | `boolean` | 必需。是否为兄弟节点中的第一个节点
isLast | \- | `boolean` | 必需。是否为兄弟节点中的最后一个节点
isLeaf | \- | `boolean` | 必需。是否为叶子节点
remove | `(value?: TreeNodeValue)` | \- | 必需。移除当前节点或当前节点的子节点，值为空则移除当前节点，值存在则移除当前节点的子节点
setData | `(data: T)` | \- | 必需。设置节点数据，数据变化可自动刷新页面，泛型 `T` 表示树节点 TS 类型，继承 `TreeOptionData`

### TScroll

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bufferSize | Number | 20 | 表示除可视区域外，额外渲染的行数，避免快速滚动过程中，新出现的内容来不及渲染从而出现空白 | N
isFixedRowHeight | Boolean | false | 表示每行内容是否同一个固定高度，仅在 `scroll.type` 为 `virtual` 时有效，该属性设置为 `true` 时，可用于简化虚拟滚动内部计算逻辑，提升性能，此时则需要明确指定 `scroll.rowHeight` 属性的值 | N
rowHeight | Number | - | 行高，不会给`<tr>`元素添加样式高度，仅作为滚动时的行高参考。一般情况不需要设置该属性。如果设置，可尽量将该属性设置为每行平均高度，从而使得滚动过程更加平滑 | N
threshold | Number | 100 | 启动虚拟滚动的阈值。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动 | N
type | String | - | 必需。滚动加载类型，有两种：懒加载和虚拟滚动。<br />值为 `lazy` ，表示滚动时会进行懒加载，非可视区域内的内容将不会默认渲染，直到该内容可见时，才会进行渲染，并且已渲染的内容滚动到不可见时，不会被销毁；<br />值为`virtual`时，表示会进行虚拟滚动，无论滚动条滚动到哪个位置，同一时刻，仅渲染该可视区域内的内容，当需要展示的数据量较大时，建议开启该特性。可选项：lazy/virtual | Y
