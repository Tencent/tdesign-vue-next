:: BASE_DOC ::

## API
### TagInput Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autoWidth | Boolean | false | 宽度随内容自适应 | N
clearable | Boolean | false | 是否可清空 | N
collapsedItems | Slot / Function | - | 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示标签值，`collapsedTags` 表示折叠标签值，`count` 表示总标签数量。TS 类型：`TNode<{ value: TagInputValue; collapsedTags: TagInputValue; count: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用标签输入框 | N
dragSort | Boolean | false | 【开发中】拖拽调整标签顺序 | N
excessTagsDisplayType | String | scroll | 标签超出时的呈现方式，有两种：横向滚动显示 和 换行显示。可选项：scroll/break-line | N
inputProps | Object | - | 透传 Input 输入框组件全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | - | 最大允许输入的标签数量 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
placeholder | String | undefined | 占位符 | N
readonly | Boolean | false | 是否只读，值为真会隐藏标签移除按钮和输入框 | N
size | String | medium | 尺寸。可选项：small/medium/large | N
status | String | - | 输入框状态。可选项：success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tag | String / Slot / Function | - | 自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签。TS 类型：`string | TNode<{ value: string | number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagProps | Object | - | 透传 Tag 组件全部属性。TS 类型：`TagProps`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | Array | - | 值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TagInputValue` `type TagInputValue = Array<string | number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
defaultValue | Array | - | 值。非受控属性。TS 类型：`TagInputValue` `type TagInputValue = Array<string | number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义值呈现的全部内容，参数为所有标签的值。TS 类型：`string | TNode<{ value: TagInputValue; onClose: (index: number, item?: any) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onBlur | Function |  | TS 类型：`(value: TagInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: TagInputValue, context: TagInputChangeContext) => void`<br/>值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)。<br/>`interface TagInputChangeContext { trigger: TagInputTriggerSource; index?: number; item?: string | number; e?: MouseEvent | KeyboardEvent }`<br/><br/>`type TagInputTriggerSource = 'enter' | 'tag-remove' | 'backspace' | 'clear'`<br/> | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>清空按钮点击时触发 | N
onEnter | Function |  | TS 类型：`(value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => void`<br/>按键按下 Enter 时触发 | N
onFocus | Function |  | TS 类型：`(value: TagInputValue, context: { inputValue: InputValue; e: FocusEvent }) => void`<br/>聚焦时触发 | N
onMouseenter | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>进入输入框时触发 | N
onMouseleave | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>离开输入框时触发 | N
onPaste | Function |  | TS 类型：`(context: { e: ClipboardEvent; pasteValue: string }) => void`<br/>粘贴事件，`pasteValue` 表示粘贴板的内容 | N
onRemove | Function |  | TS 类型：`(context: TagInputRemoveContext) => void`<br/>移除单个标签时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)。<br/>`interface TagInputRemoveContext { value: TagInputValue; index: number; item: string | number; e?: MouseEvent | KeyboardEvent; trigger: TagInputRemoveTrigger }`<br/><br/>`type TagInputRemoveTrigger = 'tag-remove' | 'backspace'`<br/> | N

### TagInput Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: TagInputValue, context: { inputValue: InputValue; e: FocusEvent })` | 失去焦点时触发
change | `(value: TagInputValue, context: TagInputChangeContext)` | 值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)。<br/>`interface TagInputChangeContext { trigger: TagInputTriggerSource; index?: number; item?: string | number; e?: MouseEvent | KeyboardEvent }`<br/><br/>`type TagInputTriggerSource = 'enter' | 'tag-remove' | 'backspace' | 'clear'`<br/>
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
enter | `(value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue })` | 按键按下 Enter 时触发
focus | `(value: TagInputValue, context: { inputValue: InputValue; e: FocusEvent })` | 聚焦时触发
mouseenter | `(context: { e: MouseEvent })` | 进入输入框时触发
mouseleave | `(context: { e: MouseEvent })` | 离开输入框时触发
paste | `(context: { e: ClipboardEvent; pasteValue: string })` | 粘贴事件，`pasteValue` 表示粘贴板的内容
remove | `(context: TagInputRemoveContext)` | 移除单个标签时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)。<br/>`interface TagInputRemoveContext { value: TagInputValue; index: number; item: string | number; e?: MouseEvent | KeyboardEvent; trigger: TagInputRemoveTrigger }`<br/><br/>`type TagInputRemoveTrigger = 'tag-remove' | 'backspace'`<br/>
