:: BASE_DOC ::

## API
### TreeSelect Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autoWidth | Boolean | false | 宽度随内容自适应 | N
autofocus | Boolean | false | 自动聚焦 | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | false | 是否允许清空 | N
collapsedItems | Slot / Function | - | 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调。TS 类型：`TNode<{ value: DataOption[]; collapsedSelectedItems: DataOption[]; count: number; onClose: (context: { index: number, e?: MouseEvent }) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
data | Array | [] | 树选择的数据列表。结构：`[{ label: TNode, value: string \| number, text: string, ... }]`，其中 `label` 表示选项呈现的内容，可自定义；`value` 表示选项的唯一值；表示当 `label` 用于选项复杂内容呈现时，`text` 用于搜索功能。<br />其中 `label` 和 `value` 可以使用 `keys` 属性定义别名。TS 类型：`Array<DataOption>` | N
disabled | Boolean | - | 是否禁用组件 | N
empty | String / Slot / Function | - | 当下拉列表为空时显示的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | 过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。TS 类型：`(filterWords: string, option: DataOption) => boolean` | N
filterable | Boolean | false | 是否可搜索 | N
inputProps | Object | - | 透传给 输入框 Input 组件的全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
inputValue | String / Number | - | 输入框的值。支持语法糖 `v-model:inputValue`。TS 类型：`string`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
defaultInputValue | String / Number | - | 输入框的值。非受控属性。TS 类型：`string`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
keys | Object | - | 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label: 'name', children: 'list' }`。TS 类型：`TreeKeysType`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | 是否正在加载数据 | N
loadingText | String / Slot / Function | - | 远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | 0 | 用于控制多选数量，值为 0 则不限制 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否允许多选 | N
panelBottomContent | String / Slot / Function | - | 面板内的底部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
panelTopContent | String / Slot / Function | - | 面板内的顶部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | undefined | 占位符 | N
popupProps | Object | - | 透传给 popup 组件的全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
popupVisible | Boolean | undefined | 是否显示下拉框。支持语法糖 `v-model:popupVisible` | N
defaultPopupVisible | Boolean | undefined | 是否显示下拉框。非受控属性 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态，值为真会隐藏输入框，且无法打开下拉框 | N
reserveKeyword | Boolean | false | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | N
selectInputProps | Object | - | 【开发中】透传 SelectInput 筛选器输入框组件的全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
size | String | medium | 尺寸。可选项：small/medium/large | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagProps | Object | - | 透传 Tag 标签组件全部属性。TS 类型：`TagProps`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
treeProps | Object | - | 透传 Tree 组件的全部属性。TS 类型：`TreeProps`，[Tree API Documents](./tree?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
value | String / Number / Object / Array | - | 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TreeValueType` `type TreeSelectValue = string \| number \| TreeOptionData \| Array<string \| number \| TreeOptionData>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
defaultValue | String / Number / Object / Array | - | 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`。非受控属性。TS 类型：`TreeValueType` `type TreeSelectValue = string \| number \| TreeOptionData \| Array<string \| number \| TreeOptionData>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts) | N
valueDisplay | Slot / Function | - | 自定义选中项呈现方式。TS 类型：`string \| TNode<{ value: TreeOptionData \| TreeOptionData[]; onClose: (index: number) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
valueType | String | value | 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。可选项：value/object | N
onBlur | Function |  | TS 类型：`(context: SelectInputBlurContext & { value: TreeSelectValue }) => void`<br/>输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: TreeValueType, context: TreeSelectChangeContext<DataOption>) => void`<br/>节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue` 。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`interface TreeSelectChangeContext<DataOption> { node: TreeNodeModel<DataOption>; data: DataOption; index?: number; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent \| Event }`<br/><br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/> | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清除按钮时触发 | N
onEnter | Function |  | TS 类型：`(context: { inputValue: string; e: KeyboardEvent; value: TreeValueType }) => void`<br/>回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值。泛型 `TreeValueType` 继承 `TreeSelectValue` | N
onFocus | Function |  | TS 类型：`(context: { value: TreeSelectValue; e: FocusEvent }) => void`<br/>输入框获得焦点时触发 | N
onInputChange | Function |  | TS 类型：`(value: string, context: SelectInputValueChangeContext) => void`<br/>输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等 | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: TreeSelectPopupVisibleContext<DataOption>) => void`<br/>下拉框显示或隐藏时触发。单选场景，选中某个选项时触发关闭，此时需要添加参数 `node`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`import { PopupVisibleChangeContext, PopupTriggerEvent, PopupTriggerSource } from '@Popup'`<br/><br/>`interface TreeSelectPopupVisibleContext<T> {   e?: PopupTriggerEvent \| Event;   node?: TreeNodeModel<T>;   trigger?: PopupTriggerSource \| 'clear'; }`<br/> | N
onRemove | Function |  | TS 类型：`(options: RemoveOptions<DataOption, TreeValueType>) => void`<br/>多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`export interface RemoveOptions<T extends TreeOptionData = TreeOptionData, N extends TreeSelectValue = TreeSelectValue> {   value: N;   data: T;  index: number; node: TreeNodeModel<T>;   e?: MouseEvent \| KeyboardEvent;   trigger: 'tag-remove' \| 'backspace'; }`<br/> | N
onSearch | Function |  | TS 类型：`(filterWords: string, context: { e: KeyboardEvent \| SelectInputValueChangeContext['e'] }) => void`<br/>输入值变化时，触发搜索事件。主要用于远程搜索新数据。设置 `filterable=true` 开启此功能。优先级高于本地数据搜索 `filter`，即一旦存在这个远程搜索事件 `filter` 失效 | N

### TreeSelect Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: SelectInputBlurContext & { value: TreeSelectValue })` | 输入框失去焦点时触发
change | `(value: TreeValueType, context: TreeSelectChangeContext<DataOption>)` | 节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue` 。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`interface TreeSelectChangeContext<DataOption> { node: TreeNodeModel<DataOption>; data: DataOption; index?: number; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent \| Event }`<br/><br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/>
clear | `(context: { e: MouseEvent })` | 点击清除按钮时触发
enter | `(context: { inputValue: string; e: KeyboardEvent; value: TreeValueType })` | 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值。泛型 `TreeValueType` 继承 `TreeSelectValue`
focus | `(context: { value: TreeSelectValue; e: FocusEvent })` | 输入框获得焦点时触发
input-change | `(value: string, context: SelectInputValueChangeContext)` | 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等
popup-visible-change | `(visible: boolean, context: TreeSelectPopupVisibleContext<DataOption>)` | 下拉框显示或隐藏时触发。单选场景，选中某个选项时触发关闭，此时需要添加参数 `node`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`import { PopupVisibleChangeContext, PopupTriggerEvent, PopupTriggerSource } from '@Popup'`<br/><br/>`interface TreeSelectPopupVisibleContext<T> {   e?: PopupTriggerEvent \| Event;   node?: TreeNodeModel<T>;   trigger?: PopupTriggerSource \| 'clear'; }`<br/>
remove | `(options: RemoveOptions<DataOption, TreeValueType>)` | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tree-select/type.ts)。<br/>`export interface RemoveOptions<T extends TreeOptionData = TreeOptionData, N extends TreeSelectValue = TreeSelectValue> {   value: N;   data: T;  index: number; node: TreeNodeModel<T>;   e?: MouseEvent \| KeyboardEvent;   trigger: 'tag-remove' \| 'backspace'; }`<br/>
search | `(filterWords: string, context: { e: KeyboardEvent \| SelectInputValueChangeContext['e'] })` | 输入值变化时，触发搜索事件。主要用于远程搜索新数据。设置 `filterable=true` 开启此功能。优先级高于本地数据搜索 `filter`，即一旦存在这个远程搜索事件 `filter` 失效