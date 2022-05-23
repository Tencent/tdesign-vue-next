:: BASE_DOC ::

## API
### Select Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autoWidth | Boolean | false | 宽度随内容自适应 | N
bordered | Boolean | true | 是否有边框 | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | false | 是否可以清空选项 | N
collapsedItems | Slot / Function | - | 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。TS 类型：`TNode<{ value: T[]; collapsedSelectedItems: T[]; count: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
creatable | Boolean | false | 是否允许用户创建新条目，需配合 filterable 使用 | N
disabled | Boolean | false | 是否禁用组件 | N
empty | String / Slot / Function | '' | 当下拉列表为空时显示的内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filter | Function | - | 自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。TS 类型：`(filterWords: string, option: T) => boolean | Promise<boolean>` | N
filterable | Boolean | false | 是否可搜索 | N
inputProps | Object | - | 透传 Input 输入框组件的全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
inputValue | String / Number | - | 输入框的值。支持语法糖 `v-model:inputValue`。TS 类型：`InputValue`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
defaultInputValue | String / Number | - | 输入框的值。非受控属性。TS 类型：`InputValue`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
keys | Object | - | 用来定义 value / label 在 `options` 中对应的字段别名。TS 类型：`SelectKeysType` `interface SelectKeysType { value?: string; label?: string }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
loading | Boolean | false | 是否为加载状态 | N
loadingText | String / Slot / Function | '' | 远程加载时显示的文字，支持自定义。如加上超链接。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | 0 | 用于控制多选数量，值为 0 则不限制 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否允许多选 | N
options | Array | [] | 数据化配置选项内容。TS 类型：`Array<T>` | N
panelBottomContent | String / Slot / Function | - | 面板内的底部内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
panelTopContent | String / Slot / Function | - | 面板内的顶部内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | undefined | 占位符 | N
popupProps | Object | - | 透传给 popup 组件的全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
popupVisible | Boolean | undefined | 是否显示下拉框 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态，值为真会隐藏输入框，且无法打开下拉框 | N
reserveKeyword | Boolean | false | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | N
selectInputProps | Object | - | 【开发中】透传 SelectInput 筛选器输入框组件的全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
showArrow | Boolean | true | 是否显示右侧箭头，默认显示 | N
size | String | medium | 组件尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | Object | - | 【开发中】透传 TagInput 标签输入框组件的全部属性。TS 类型：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
tagProps | Object | - | 【开发中】透传 Tag 标签组件全部属性。TS 类型：`TagProps`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
value | String / Number / Object / Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`SelectValue` `type SelectValue<T extends SelectOption = SelectOption> = string | number | T | Array<SelectValue<T>>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
defaultValue | String / Number / Object / Array | - | 选中值。非受控属性。TS 类型：`SelectValue` `type SelectValue<T extends SelectOption = SelectOption> = string | number | T | Array<SelectValue<T>>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义选中项呈现方式。TS 类型：`string | TNode<{ value: SelectValue; onClose: (index: number, item?: any) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
valueType | String | value | 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。。可选项：value/object | N
onBlur | Function |  | TS 类型：`(context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => void`<br/>输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: SelectValue, context: { trigger: SelectValueChangeTrigger; e?: MouseEvent | KeyboardEvent }) => void`<br/>选中值变化时触发，`context. trigger` 表示触发变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`type SelectValueChangeTrigger = 'clear' | 'tag-remove' | 'backspace' | 'check' | 'uncheck'`<br/> | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清除按钮时触发 | N
onCreate | Function |  | TS 类型：`(value: string | number) => void`<br/>当选择新创建的条目时触发 | N
onEnter | Function |  | TS 类型：`(context: { inputValue: string; e: KeyboardEvent; value: SelectValue }) => void`<br/>回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值 | N
onFocus | Function |  | TS 类型：`(context: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => void`<br/>输入框获得焦点时触发 | N
onInputChange | Function |  | TS 类型：`(value: InputValue, context?: SelectInputValueChangeContext) => void`<br/>输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/> | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onRemove | Function |  | TS 类型：`(options: SelectRemoveContext<T>) => void`<br/>多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`interface SelectRemoveContext<T> { value: string | number; data: T; e: MouseEvent | KeyboardEvent }`<br/> | N
onSearch | Function |  | TS 类型：`(filterWords: string) => void`<br/>输入值变化时，触发搜索事件。主要用于远程搜索新数据 | N
onVisibleChange | Function |  | TS 类型：`(visible: boolean) => void`<br/>下拉框隐藏/显示时触发 | N

### Select Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: SelectValue; e: FocusEvent | KeyboardEvent })` | 输入框失去焦点时触发
change | `(value: SelectValue, context: { trigger: SelectValueChangeTrigger; e?: MouseEvent | KeyboardEvent })` | 选中值变化时触发，`context. trigger` 表示触发变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`type SelectValueChangeTrigger = 'clear' | 'tag-remove' | 'backspace' | 'check' | 'uncheck'`<br/>
clear | `(context: { e: MouseEvent })` | 点击清除按钮时触发
create | `(value: string | number)` | 当选择新创建的条目时触发
enter | `(context: { inputValue: string; e: KeyboardEvent; value: SelectValue })` | 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值
focus | `(context: { value: SelectValue; e: FocusEvent | KeyboardEvent })` | 输入框获得焦点时触发
input-change | `(value: InputValue, context?: SelectInputValueChangeContext)` | 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { SelectInputValueChangeContext } from '@SelectInput'`<br/>
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | 下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
remove | `(options: SelectRemoveContext<T>)` | 多选模式下，选中数据被移除时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select/type.ts)。<br/>`interface SelectRemoveContext<T> { value: string | number; data: T; e: MouseEvent | KeyboardEvent }`<br/>
search | `(filterWords: string)` | 输入值变化时，触发搜索事件。主要用于远程搜索新数据
visible-change | `(visible: boolean)` | 下拉框隐藏/显示时触发

### Option Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 用于定义复杂的选项内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 用于定义复杂的选项内容。同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用该选项 | N
label | String | - | 选项名称 | N
value | String / Number | - | 选项值 | N

### OptionGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
divider | Boolean | true | 是否显示分隔线 | N
label | String | - | 分组别名 | N
