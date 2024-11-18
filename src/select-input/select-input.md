:: BASE_DOC ::

## API

### SelectInput Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许输入 | N
autoWidth | Boolean | false | 宽度随内容自适应 | N
autofocus | Boolean | false | 自动聚焦 | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | false | 是否可清空 | N
collapsedItems | Slot / Function | - | 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 `collapsedItems` 自定义。`value` 表示所有标签值，`collapsedSelectedItems` 表示折叠标签值，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调。TS 类型：`TNode<{ value: SelectInputValue; collapsedSelectedItems: SelectInputValue; count: number; onClose: (context: { index: number, e?: MouseEvent }) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | 是否禁用 | N
inputProps | Object | - | 透传 Input 输入框组件全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
inputValue | String / Number | - | 输入框的值。支持语法糖 `v-model:inputValue`。TS 类型：`string` | N
defaultInputValue | String / Number | - | 输入框的值。非受控属性。TS 类型：`string` | N
keys | Object | - | 定义字段别名，示例：`{ label: 'text', value: 'id', children: 'list' }`。TS 类型：`SelectInputKeys` `interface SelectInputKeys { label?: string; value?: string; children?: string }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loading | Boolean | false | 是否处于加载状态 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
multiple | Boolean | false | 是否为多选模式，默认为单选 | N
panel | String / Slot / Function | - | 下拉框内容，可完全自定义。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | - | 占位符 | N
popupProps | Object | - | 透传 Popup 浮层组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
popupVisible | Boolean | - | 是否显示下拉框。支持语法糖 `v-model:popupVisible` | N
defaultPopupVisible | Boolean | - | 是否显示下拉框。非受控属性 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | undefined | 只读状态，值为真会隐藏输入框，且无法打开下拉框 | N
reserveKeyword | Boolean | false | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | N
size | String | medium | 组件尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tag | String / Slot / Function | - | 多选场景下，自定义选中标签的内部内容。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签。TS 类型：`string \| TNode<{ value: string \| number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | Object | - | 透传 TagInput 组件全部属性。TS 类型：`TagInputProps`，[TagInput API Documents](./tag-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tagProps | Object | - | 透传 Tag 标签组件全部属性。TS 类型：`TagProps`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number / Boolean / Object / Array / Date | undefined | 全部标签值。值为数组表示多个标签，值为非数组表示单个数值。TS 类型：`SelectInputValue` `type SelectInputValue = string \| number \| boolean \| Date \| Object \| Array<any> \| Array<SelectInputValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义值呈现的全部内容，参数为所有标签的值。TS 类型：`string \| TNode<{ value: TagInputValue; onClose: (index: number, item?: any) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onBlur | Function |  | TS 类型：`(value: SelectInputValue, context: SelectInputBlurContext) => void`<br/>失去焦点时触发，`context.inputValue` 表示输入框的值；`context.tagInputValue` 表示标签输入框的值。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputBlurContext = PopupVisibleChangeContext & { inputValue: string; tagInputValue?: TagInputValue; }`<br/> | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>清空按钮点击时触发 | N
onEnter | Function |  | TS 类型：`(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: string; tagInputValue?: TagInputValue }) => void`<br/>按键按下 Enter 时触发 | N
onFocus | Function |  | TS 类型：`(value: SelectInputValue, context: SelectInputFocusContext) => void`<br/>聚焦时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputFocusContext { inputValue: string; tagInputValue?: TagInputValue; e: FocusEvent }`<br/> | N
onInputChange | Function |  | TS 类型：`(value: string, context?: SelectInputValueChangeContext) => void`<br/>输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发等。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputValueChangeContext { e?: Event \| InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent; trigger: 'input' \| 'clear' \| 'blur' \| 'focus' \| 'initial' \| 'change' }`<br/> | N
onMouseenter | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>进入输入框时触发 | N
onMouseleave | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>离开输入框时触发 | N
onPaste | Function |  | TS 类型：`(context: { e: ClipboardEvent; pasteValue: string }) => void`<br/>粘贴事件，`pasteValue` 表示粘贴板的内容 | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
onTagChange | Function |  | TS 类型：`(value: TagInputValue, context: SelectInputChangeContext) => void`<br/>值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputChangeContext = TagInputChangeContext`<br/> | N

### SelectInput Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: SelectInputValue, context: SelectInputBlurContext)` | 失去焦点时触发，`context.inputValue` 表示输入框的值；`context.tagInputValue` 表示标签输入框的值。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputBlurContext = PopupVisibleChangeContext & { inputValue: string; tagInputValue?: TagInputValue; }`<br/>
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
enter | `(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: string; tagInputValue?: TagInputValue })` | 按键按下 Enter 时触发
focus | `(value: SelectInputValue, context: SelectInputFocusContext)` | 聚焦时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputFocusContext { inputValue: string; tagInputValue?: TagInputValue; e: FocusEvent }`<br/>
input-change | `(value: string, context?: SelectInputValueChangeContext)` | 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发等。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface SelectInputValueChangeContext { e?: Event \| InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent; trigger: 'input' \| 'clear' \| 'blur' \| 'focus' \| 'initial' \| 'change' }`<br/>
mouseenter | `(context: { e: MouseEvent })` | 进入输入框时触发
mouseleave | `(context: { e: MouseEvent })` | 离开输入框时触发
paste | `(context: { e: ClipboardEvent; pasteValue: string })` | 粘贴事件，`pasteValue` 表示粘贴板的内容
popup-visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | 下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/>
tag-change | `(value: TagInputValue, context: SelectInputChangeContext)` | 值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`type SelectInputChangeContext = TagInputChangeContext`<br/>
