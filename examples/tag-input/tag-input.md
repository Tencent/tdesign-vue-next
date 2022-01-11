:: BASE_DOC ::

## API
### TagInput Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clearable | Boolean | false | 是否可清空 | N
collapsedItems | Slot / Function | - | 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示标签值，`collapsedTags` 表示折叠标签值，`count` 表示总标签数量。TS 类型：`TNode<{ value: TagInputValue; collapsedTags: TagInputValue; count: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用标签输入框 | N
inputProps | Object | - | 透传 Input 输入框组件全部属性。TS 类型：`InputProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
max | Number | - | 最大允许输入的标签数量 | N
minCollapsedNum | Number | 0 | 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 | N
placeholder | String | undefined | 占位符 | N
readonly | Boolean | false | 是否只读，值为真会隐藏标签移除按钮和输入框 | N
status | String | - | 输入框状态。可选项：success/warning/error | N
tag | String / Slot / Function | - | 自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签。TS 类型：`string | TNode<{ value: string | number }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tagProps | Object | - | 透传 Tag 组件全部属性。TS 类型：`TagProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
value | Array | - | 值。支持语法糖。TS 类型：`TagInputValue`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
defaultValue | Array | - | 值。非受控属性。TS 类型：`TagInputValue`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义值呈现的全部内容，参数为所有标签的值。TS 类型：`string | TNode<{ value: TagInputValue }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onChange | Function |  | 值变化时触发，参数 `trigger` 表示数据变化的触发来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)。`(value: TagInputValue, context: TagInputChangeContext) => {}` | N
onClear | Function |  | 清空按钮点击时触发。`(context: { e: MouseEvent }) => {}` | N
onEnter | Function |  | 按键按下 Enter 时触发。`(value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue }) => {}` | N
onMouseenter | Function |  | 进入输入框时触发。`(context: { e: MouseEvent }) => {}` | N
onMouseleave | Function |  | 离开输入框时触发。`(context: { e: MouseEvent }) => {}` | N
onRemove | Function |  | 移除单个标签时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)。`(context: TagInputRemoveContext) => {}` | N

### TagInput Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: TagInputValue, context: TagInputChangeContext)` | 值变化时触发，参数 `trigger` 表示数据变化的触发来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
enter | `(value: TagInputValue, context: { e: KeyboardEvent; inputValue: InputValue })` | 按键按下 Enter 时触发
mouseenter | `(context: { e: MouseEvent })` | 进入输入框时触发
mouseleave | `(context: { e: MouseEvent })` | 离开输入框时触发
remove | `(context: TagInputRemoveContext)` | 移除单个标签时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tag-input/type.ts)
