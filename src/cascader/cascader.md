:: BASE_DOC ::

## API

### Cascader Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
autofocus | Boolean | - | 自动聚焦 | N
borderless | Boolean | false | 无边框模式 | N
checkProps | Object | - | 参考 checkbox 组件 API。TS 类型：`CheckboxProps`，[Checkbox API Documents](./checkbox?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
checkStrictly | Boolean | false | 父子节点选中状态不再关联，可各自选中或取消 | N
clearable | Boolean | false | 是否支持清空选项 | N
collapsedItems | Slot / Function | - | 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调。TS 类型：`TNode<{ value: CascaderOption[]; collapsedSelectedItems: CascaderOption[]; count: number; onClose: (context: { index: number, e?: MouseEvent }) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | 是否禁用组件 | N
empty | String / Slot / Function | - | 无匹配选项时的内容，默认全局配置为 '暂无数据'。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | 自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。TS 类型：`(filterWords: string, node: TreeNodeModel) => boolean \| Promise<boolean>` | N
filterable | Boolean | false | 是否可搜索 | N
inputProps | Object | - | 透传 Input 输入框组件的全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
keys | Object | - | 用来定义 value / label / children / disabled 在 `options` 中对应的字段别名。TS 类型：`TreeKeysType`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
lazy | Boolean | true | 延迟加载 children 为 true 的子节点，即使 expandAll 被设置为 true，也同样延迟加载 | N
load | Function | - | 加载子树数据的方法（仅当节点 children 为 true 时生效）。TS 类型：`(node: TreeNodeModel<CascaderOption>) => Promise<Array<CascaderOption>>` | N
loading | Boolean | false | 是否为加载状态 | N
loadingText | String / Slot / Function | - | 远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | 0 | 用于控制多选数量，值为 0 则不限制 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否允许多选 | N
option | Slot / Function | - | 自定义单个级联选项。TS 类型：`TNode<{ item: CascaderOption; index: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
options | Array | [] | 可选项数据源。TS 类型：`Array<CascaderOption>` | N
panelBottomContent | String / Slot / Function | - | 面板内的底部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
panelTopContent | String / Slot / Function | - | 面板内的顶部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | undefined | 占位符 | N
popupProps | Object | - | 参考 popup 组件 API。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
popupVisible | Boolean | - | 是否显示下拉框 | N
defaultPopupVisible | Boolean | - | 是否显示下拉框。非受控属性 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态，值为真会隐藏输入框，且无法打开下拉框 | N
reserveKeyword | Boolean | false | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | N
selectInputProps | Object | - | 透传 SelectInput 筛选器输入框组件的全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
showAllLevels | Boolean | true | 选中值使用完整路径，输入框在单选时也显示完整路径 | N
size | String | medium | 组件尺寸。可选项：large/medium/small。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | Object | - | 透传 TagInput 标签输入框组件的全部属性。TS 类型：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
tagProps | Object | - | 透传 Tag 标签组件全部属性。TS 类型：`TagProps`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
trigger | String | click | 展开下一层级的方式。可选项：click/hover | N
value | String / Number / Array | [] | 选中项的值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`CascaderValue<CascaderOption>` `type CascaderValue<T extends TreeOptionData = TreeOptionData> = string \| number \| T \| Array<CascaderValue<T>>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
defaultValue | String / Number / Array | [] | 选中项的值。非受控属性。TS 类型：`CascaderValue<CascaderOption>` `type CascaderValue<T extends TreeOptionData = TreeOptionData> = string \| number \| T \| Array<CascaderValue<T>>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义选中项呈现的内容。TS 类型：`string \| TNode<{ value: CascaderValue<CascaderOption>; onClose: (index: number) => void; displayValue?: CascaderValue<CascaderOption>; selectedOptions: CascaderOption[] }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
valueMode | String | onlyLeaf | 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaf 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all | N
valueType | String | single | 用于控制选中值的类型。single 表示输入输出值为 叶子结点值， full 表示输入输出值为全路径。可选项：single/full | N
onBlur | Function |  | TS 类型：`(context: { value: CascaderValue<CascaderOption> } & SelectInputBlurContext ) => void`<br/>当输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => void`<br/>选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface CascaderChangeContext<CascaderOption> { node?: TreeNodeModel<CascaderOption>; source: CascaderChangeSource }`<br/><br/>`import { TreeNodeModel } from '@Tree'`<br/><br/>`type CascaderChangeSource = 'invalid-value' \| 'check' \| 'clear' \| 'uncheck'`<br/> | N
onFocus | Function |  | TS 类型：`(context: { value: CascaderValue<CascaderOption>; e: FocusEvent }) => void`<br/>获得焦点时触发 | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onRemove | Function |  | TS 类型：`(context: RemoveContext<CascaderOption>) => void`<br/>多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface RemoveContext<T> { value: CascaderValue<T>; node: TreeNodeModel<T> }`<br/> | N

### Cascader Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: CascaderValue<CascaderOption> } & SelectInputBlurContext )` | 当输入框失去焦点时触发
change | `(value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>)` | 选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface CascaderChangeContext<CascaderOption> { node?: TreeNodeModel<CascaderOption>; source: CascaderChangeSource }`<br/><br/>`import { TreeNodeModel } from '@Tree'`<br/><br/>`type CascaderChangeSource = 'invalid-value' \| 'check' \| 'clear' \| 'uncheck'`<br/>
focus | `(context: { value: CascaderValue<CascaderOption>; e: FocusEvent })` | 获得焦点时触发
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | 下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
remove | `(context: RemoveContext<CascaderOption>)` | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/cascader/type.ts)。<br/>`interface RemoveContext<T> { value: CascaderValue<T>; node: TreeNodeModel<T> }`<br/>
