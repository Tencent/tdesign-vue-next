:: BASE_DOC ::

## API

### Select Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
autoWidth | Boolean | false | 宽度随内容自适应 | N
autofocus | Boolean | false | 自动聚焦 | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | false | 是否可以清空选项 | N
collapsedItems | Slot / Function | - | 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，泛型 `T` 继承 `SelectOption`，表示选项数据；`count` 表示折叠的数量, `onClose` 表示移除标签。TS 类型：`TNode<{ value: T[]; collapsedSelectedItems: T[]; count: number; onClose: (context: { index: number, e?: MouseEvent }) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
creatable | Boolean | false | 是否允许用户创建新条目，需配合 filterable 使用 | N
disabled | Boolean | - | 是否禁用组件 | N
empty | String / Slot / Function | - | 当下拉列表为空时显示的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | 自定义搜索规则，用于对现有数据进行搜索，判断是否过滤某一项数据。参数 `filterWords` 表示搜索词，`option`表示单个选项内容，返回值为 `true` 保留该选项，返回值为 `false` 则隐藏该选项。使用该方法时无需设置 `filterable`。TS 类型：`(filterWords: string, option: T) => boolean \| Promise<boolean>` | N
filterable | Boolean | false | 是否可搜索，默认搜索规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则 | N
inputProps | Object | - | 透传 Input 输入框组件的全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
inputValue | String / Number | - | 输入框的值。支持语法糖 `v-model:inputValue`。TS 类型：`string` | N
defaultInputValue | String / Number | - | 输入框的值。非受控属性。TS 类型：`string` | N
keys | Object | - | 用来定义 value / label / disabled 在 `options` 中对应的字段别名。TS 类型：`SelectKeysType` `interface SelectKeysType { value?: string \| ((option: SelectOption) => string); label?: string \| ((option: SelectOption) => string); disabled?: string }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | 是否为加载状态 | N
loadingText | String / Slot / Function | - | 远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | 0 | 用于控制多选数量，值为 0 则不限制 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否允许多选 | N
options | Array | - | 数据化配置选项内容。TS 类型：`Array<T>` | N
optionsLayout | String | vertical | 下拉选项布局方式，有纵向排列和横向排列两种，默认纵向排列。TS 类型：`vertical \| horizontal` | N
panelBottomContent | String / Slot / Function | - | 面板内的底部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
panelTopContent | String / Slot / Function | - | 面板内的顶部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | undefined | 占位符 | N
popupProps | Object | - | 透传给 popup 组件的全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
popupVisible | Boolean | - | 是否显示下拉框。支持语法糖 `v-model:popupVisible` | N
defaultPopupVisible | Boolean | - | 是否显示下拉框。非受控属性 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态，值为真会隐藏输入框，且无法打开下拉框 | N
reserveKeyword | Boolean | false | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | N
scroll | Object | - | 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`。TS 类型：`InfinityScroll`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
selectInputProps | Object | - | 透传 SelectInput 筛选器输入框组件的全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
showArrow | Boolean | true | 是否显示右侧箭头，默认显示 | N
size | String | medium | 组件尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | Object | - | 透传 TagInput 标签输入框组件的全部属性。TS 类型：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
tagProps | Object | - | 透传 Tag 标签组件全部属性。TS 类型：`TagProps`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number / Boolean / Object / Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`SelectValue` `type SelectValue<T extends SelectOption = SelectOption> = string \| number \| boolean \| T \| Array<SelectValue<T>>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
defaultValue | String / Number / Boolean / Object / Array | - | 选中值。非受控属性。TS 类型：`SelectValue` `type SelectValue<T extends SelectOption = SelectOption> = string \| number \| boolean \| T \| Array<SelectValue<T>>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义选中项呈现的内容。TS 类型：`string \| TNode<{ value: SelectValue; onClose: (index: number) => void; displayValue?: SelectValue }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
valueType | String | value | 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。。可选项：value/object | N
onBlur | Function |  | TS 类型：`(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent }) => void`<br/>输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: SelectValue, context: { option?: T, selectedOptions: T[], trigger: SelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent }) => void`<br/>选中值变化时触发。`context.trigger` 表示触发变化的来源；`context.selectedOptions` 表示选中值的完整对象，数组长度一定和 `value` 相同；`context.option` 表示当前操作的选项，不一定存在。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`type SelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck' \| 'default'`<br/> | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清除按钮时触发 | N
onCreate | Function |  | TS 类型：`(value: string \| number) => void`<br/>当选择新创建的条目时触发 | N
onEnter | Function |  | TS 类型：`(context: { inputValue: string; e: KeyboardEvent; value: SelectValue }) => void`<br/>回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值 | N
onFocus | Function |  | TS 类型：`(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent }) => void`<br/>输入框获得焦点时触发 | N
onInputChange | Function |  | TS 类型：`(value: string, context?: SelectInputValueChangeContext) => void`<br/>输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/> | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onRemove | Function |  | TS 类型：`(options: SelectRemoveContext<T>) => void`<br/>多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`interface SelectRemoveContext<T> { value: string \| number; data: T; e: MouseEvent \| KeyboardEvent }`<br/> | N
onSearch | Function |  | TS 类型：`(filterWords: string, context: { e: KeyboardEvent }) => void`<br/>输入值变化时，触发搜索事件。主要用于远程搜索新数据 | N

### Select Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent })` | 输入框失去焦点时触发
change | `(value: SelectValue, context: { option?: T, selectedOptions: T[], trigger: SelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent })` | 选中值变化时触发。`context.trigger` 表示触发变化的来源；`context.selectedOptions` 表示选中值的完整对象，数组长度一定和 `value` 相同；`context.option` 表示当前操作的选项，不一定存在。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`type SelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck' \| 'default'`<br/>
clear | `(context: { e: MouseEvent })` | 点击清除按钮时触发
create | `(value: string \| number)` | 当选择新创建的条目时触发
enter | `(context: { inputValue: string; e: KeyboardEvent; value: SelectValue })` | 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值
focus | `(context: { value: SelectValue; e: FocusEvent \| KeyboardEvent })` | 输入框获得焦点时触发
input-change | `(value: string, context?: SelectInputValueChangeContext)` | 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/>
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | 下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
remove | `(options: SelectRemoveContext<T>)` | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`interface SelectRemoveContext<T> { value: string \| number; data: T; e: MouseEvent \| KeyboardEvent }`<br/>
search | `(filterWords: string, context: { e: KeyboardEvent })` | 输入值变化时，触发搜索事件。主要用于远程搜索新数据


### Option Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
checkAll | Boolean | false | 当前选项是否为全选，全选可以在顶部，也可以在底部。点击当前选项会选中禁用态除外的全部选项，即使是分组选择器也会选中全部选项 | N
content | String / Slot / Function | - | 用于定义复杂的选项内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 用于定义复杂的选项内容。同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用该选项 | N
label | String | - | 选项名称 | N
title | String | - | 选项标题，在选项过长时hover选项展示 | N
value | String / Number | - | 选项值 | N


### OptionGroup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
divider | Boolean | true | 是否显示分隔线 | N
label | String | - | 分组别名 | N

### TScroll

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
bufferSize | Number | 20 | 表示除可视区域外，额外渲染的行数，避免快速滚动过程中，新出现的内容来不及渲染从而出现空白 | N
isFixedRowHeight | Boolean | false | 表示每行内容是否同一个固定高度，仅在 `scroll.type` 为 `virtual` 时有效，该属性设置为 `true` 时，可用于简化虚拟滚动内部计算逻辑，提升性能，此时则需要明确指定 `scroll.rowHeight` 属性的值 | N
rowHeight | Number | - | 行高，不会给`<tr>`元素添加样式高度，仅作为滚动时的行高参考。一般情况不需要设置该属性。如果设置，可尽量将该属性设置为每行平均高度，从而使得滚动过程更加平滑 | N
threshold | Number | 100 | 启动虚拟滚动的阈值。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动 | N
type | String | - | 必需。滚动加载类型，有两种：懒加载和虚拟滚动。<br />值为 `lazy` ，表示滚动时会进行懒加载，非可视区域内的内容将不会默认渲染，直到该内容可见时，才会进行渲染，并且已渲染的内容滚动到不可见时，不会被销毁；<br />值为`virtual`时，表示会进行虚拟滚动，无论滚动条滚动到哪个位置，同一时刻，仅渲染该可视区域内的内容，当需要展示的数据量较大时，建议开启该特性。可选项：lazy/virtual | Y
