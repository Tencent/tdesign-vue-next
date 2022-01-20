:: BASE_DOC ::

## API
### SelectInput Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clearable | Boolean | false | 是否可清空 | N
collapsedItems | Slot / Function | - | 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 `collapsedItems` 自定义。`value` 表示所有标签值，`collapsedTags` 表示折叠标签值，`count` 表示总标签数量。TS 类型：`TNode<{ value: SelectInputValue; collapsedTags: SelectInputValue; count: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用 | N
inputProps | Object | - | 透传 Input 输入框组件全部属性。TS 类型：`InputProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
overTagsDisplayType | String | scroll | 标签超出时的呈现方式，有两种：横向滚动显示 和 换行显示。可选项：scroll/break-line | N
placeholder | String | - | 占位符 | N
popupProps | Object | - | 透传 Popup 浮层组件全部属性。TS 类型：`popupProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
popupVisible | Boolean | false | 是否显示下拉框，受控属性 | N
readonly | Boolean | false | 是否只读，值为真会隐藏输入框，且无法打开下拉框 | N
status | String | - | 输入框状态。可选项：success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagInputProps | - | - | 透传 TagInput 组件全部属性。TS 类型：`TagInputProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tagProps | Object | - | 透传 Tag 标签组件全部属性。TS 类型：`TagProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Array | - | 全部标签值。值为数组表示多个标签，值为非数组表示单个数值。TS 类型：`SelectInputValue`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义值呈现的全部内容，参数为所有标签的值。TS 类型：`string | TNode<{ value: SelectInputValue }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
variant | String | text | 值的呈现方式，有两种：文本 和 标签。一般情况，单选选择器使用 `text` 模式，多选选择器使用 `tag` 模式。可选项：text/tag | N
onBlur | Function |  | TS 类型：`(value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>清空按钮点击时触发 | N
onEnter | Function |  | TS 类型：`(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => void`<br/>按键按下 Enter 时触发 | N
onFocus | Function |  | TS 类型：`(value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void`<br/>聚焦时触发 | N
onMouseenter | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>进入输入框时触发 | N
onMouseleave | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>离开输入框时触发 | N
onPaste | Function |  | TS 类型：`(context: { e: ClipboardEvent; pasteValue: string }) => void`<br/>粘贴事件，`pasteValue` 表示粘贴板的内容 | N
onPopupVisible | Function |  | TS 类型：`() => void`<br/>下拉框显示或隐藏时触发 | N
onRemove | Function |  | TS 类型：`(context: TagInputRemoveContext) => void`<br/>移除单个标签时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface TagInputRemoveContext { value: SelectInputValue; index: number; item: string | number; e: MouseEvent | KeyboardEvent; trigger: TagInputRemoveTrigger }`<br/><br/>`type TagInputRemoveTrigger = 'tag-remove' | 'backspace'`<br/> | N

### SelectInput Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent })` | 失去焦点时触发
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
enter | `(value: SelectInputValue, context: { e: KeyboardEvent; inputValue: InputValue })` | 按键按下 Enter 时触发
focus | `(value: SelectInputValue, context: { inputValue: InputValue; e: FocusEvent })` | 聚焦时触发
mouseenter | `(context: { e: MouseEvent })` | 进入输入框时触发
mouseleave | `(context: { e: MouseEvent })` | 离开输入框时触发
paste | `(context: { e: ClipboardEvent; pasteValue: string })` | 粘贴事件，`pasteValue` 表示粘贴板的内容
popup-visible | - | 下拉框显示或隐藏时触发
remove | `(context: TagInputRemoveContext)` | 移除单个标签时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/select-input/type.ts)。<br/>`interface TagInputRemoveContext { value: SelectInputValue; index: number; item: string | number; e: MouseEvent | KeyboardEvent; trigger: TagInputRemoveTrigger }`<br/><br/>`type TagInputRemoveTrigger = 'tag-remove' | 'backspace'`<br/>
