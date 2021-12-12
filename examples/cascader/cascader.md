:: BASE_DOC ::

## API

### Cascader Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
checkProps | Object | - | 参考 checkbox 组件 API。TS 类型：`CheckboxProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts) | N
checkStrictly | Boolean | false | 父子节点选中状态不再关联，可各自选中或取消 | N
clearable | Boolean | false | 是否支持清空选项 | N
collapsedItems | Slot / Function | - | 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。TS 类型：`TNode<{ value: CascaderOption[]; collapsedSelectedItems: CascaderOption[]; count: number }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用组件 | N
empty | String / Slot / Function | - | 无匹配选项时的内容，默认全局配置为 '暂无数据'。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
filterable | Boolean | false | 是否可搜索 | N
keys | Object | - | 用来定义 value / label / children 在 `options` 中对应的字段别名。TS 类型：`CascaderKeysType`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts) | N
lazy | Boolean | true | 延迟加载 children 为 true 的子节点，即使 expandAll 被设置为 true，也同样延迟加载 | N
load | Function | - | 加载子树数据的方法（仅当节点 children 为 true 时生效）。TS 类型：`(node: TreeNodeModel<CascaderOption>) => Promise<Array<CascaderOption>>` | N
loading | Boolean | false | 是否为加载状态 | N
loadingText | String / Slot / Function | '' | 远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
max | Number | 0 | 用于控制多选数量，值为 0 则不限制 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否允许多选 | N
options | Array | [] | 可选项数据源。TS 类型：`Array<CascaderOption>` | N
placeholder | String | - | 占位符 | N
popupProps | Object | - | 参考 popup 组件 API。TS 类型：`PopupProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts) | N
showAllLevels | Boolean | true | 输入框中是否显示选中值的完整路径 | N
size | String | medium | 组件尺寸。可选项：large/medium/small。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
trigger | String | click | 展开下一层级的方式。可选项：click/hover | N
value | String / Number / Array | [] | 选中项的值。支持语法糖。TS 类型：`CascaderValue<CascaderOption>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts) | N
defaultValue | String / Number / Array | [] | 选中项的值。非受控属性。TS 类型：`CascaderValue<CascaderOption>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts) | N
valueMode | String | onlyLeaf | 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all | N
onBlur | Function |  | 当输入框失去焦点时触发。`(context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => {}` | N
onChange | Function |  | 选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts)。`(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => {}` | N
onFocus | Function |  | 获得焦点时触发。`(context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => {}` | N
onRemove | Function |  | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts)。`(context: RemoveContext<CascaderOption>) => {}` | N

### Cascader Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: CascaderValue<CascaderOption>; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>)` | 选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts)
focus | `(context: { value: CascaderValue<CascaderOption>; e: FocusEvent })` | 获得焦点时触发
remove | `(context: RemoveContext<CascaderOption>)` | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/cascader/type.ts)
