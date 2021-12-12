:: BASE_DOC ::
## API

### TreeSelect Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clearable | Boolean | false | 是否允许清空 | N
collapsedItems | Slot / Function | - | 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。TS 类型：`TNode<{ value: DataOption[]; collapsedSelectedItems: DataOption[]; count: number }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
data | Array | [] | 数据。TS 类型：`Array<DataOption>` | N
disabled | Boolean | false | 是否禁用组件 | N
empty | String / Slot / Function | '' | 当下拉列表为空时显示的内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
filter | Function | - | 过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。TS 类型：`(filterWords: string, option: DataOption) => boolean` | N
filterable | Boolean | false | 是否可搜索 | N
loading | Boolean | false | 是否正在加载数据 | N
loadingText | String / Slot / Function | '' | 远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
max | Number | 0 | 用于控制多选数量，值为 0 则不限制 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否允许多选 | N
placeholder | String | - | 占位符 | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tree-select/type.ts) | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
showCheckAlll | Boolean | false | 【讨论中】是否显示全选 | N
size | String | medium | 尺寸。可选项：small/medium/large | N
treeProps | Object | - | 透传 Tree 组件属性。TS 类型：`TreeProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tree-select/type.ts) | N
value | String / Number / Object / Array | - | 选中值。支持语法糖。TS 类型：`TreeSelectValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tree-select/type.ts) | N
defaultValue | String / Number / Object / Array | - | 选中值。非受控属性。TS 类型：`TreeSelectValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tree-select/type.ts) | N
valueDisplay | Slot / Function | - | 自定义选中项呈现方式。TS 类型：`TNode<{ value: DataOption[]; onClose: () => void }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
valueType | String | value | 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。可选项：value/object | N
onBlur | Function |  | 输入框失去焦点时触发。`(context: { value: TreeSelectValue; e: FocusEvent }) => {}` | N
onChange | Function |  | 节点选中状态变化时触发，context.node 表示当前变化的选项。`(value: TreeSelectValue, context: { node: TreeNodeModel<DataOption> }) => {}` | N
onClear | Function |  | 点击清除按钮时触发。`(context: { e: MouseEvent }) => {}` | N
onFocus | Function |  | 输入框获得焦点时触发。`(context: { value: TreeSelectValue; e: FocusEvent }) => {}` | N
onRemove | Function |  | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tree-select/type.ts)。`(options: RemoveOptions<DataOption>) => {}` | N
onSearch | Function |  | 输入值变化时，触发搜索事件。主要用于远程搜索新数据。`(filterWords: string) => {}` | N

### TreeSelect Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: TreeSelectValue; e: FocusEvent })` | 输入框失去焦点时触发
change | `(value: TreeSelectValue, context: { node: TreeNodeModel<DataOption> })` | 节点选中状态变化时触发，context.node 表示当前变化的选项
clear | `(context: { e: MouseEvent })` | 点击清除按钮时触发
focus | `(context: { value: TreeSelectValue; e: FocusEvent })` | 输入框获得焦点时触发
remove | `(options: RemoveOptions<DataOption>)` | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/tree-select/type.ts)
search | `(filterWords: string)` | 输入值变化时，触发搜索事件。主要用于远程搜索新数据
