:: BASE_DOC ::

## API
### InputNumber Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | - | 文本内容位置，居左/居中/居右。可选项：left/center/right | N
allowInputOverLimit | Boolean | true | 是否允许输入超过 `max` `min` 范围外的数字。为保障用户体验，仅在失去焦点时进行数字范围矫正。默认允许超出，数字超出范围时，输入框变红提醒 | N
autoWidth | Boolean | false | 宽度随内容自适应 | N
decimalPlaces | Number | undefined | [小数位数](https://en.wiktionary.org/wiki/decimal_place) | N
disabled | Boolean | - | 禁用组件 | N
format | Function | - | 格式化输入框展示值。第二个事件参数 `context.fixedNumber` 表示处理过小数位数 `decimalPlaces` 的数字。TS 类型：`(value: InputNumberValue, context?: { fixedNumber?: InputNumberValue }) => InputNumberValue` | N
inputProps | Object | - | 透传 Input 输入框组件全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
largeNumber | Boolean | false | 是否作为大数使用。JS 支持的最大数字位数是 16 位，超过 16 位的数字需作为字符串大数处理。此时，数据类型必须保持为字符串，否则会丢失数据 | N
max | String / Number | Infinity | 最大值。如果是大数，请传入字符串。TS 类型：`InputNumberValue` | N
min | String / Number | -Infinity | 最小值。如果是大数，请传入字符串。TS 类型：`InputNumberValue` | N
placeholder | String | undefined | 占位符 | N
readonly | Boolean | false | 只读状态 | N
size | String | medium | 组件尺寸。可选项：small/medium/large | N
status | String | default | 文本框状态。可选项：default/success/warning/error | N
step | String / Number | 1 | 数值改变步数，可以是小数。如果是大数，请保证数据类型为字符串。TS 类型：`InputNumberValue` | N
suffix | String / Slot / Function | - | 后置内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | row | 按钮布局。可选项：column/row/normal | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number | - | 数字输入框的值。当值为 '' 时，输入框显示为空。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`T` `type InputNumberValue = number \| string`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts) | N
defaultValue | String / Number | - | 数字输入框的值。当值为 '' 时，输入框显示为空。非受控属性。TS 类型：`T` `type InputNumberValue = number \| string`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts) | N
onBlur | Function |  | TS 类型：`(value: InputNumberValue, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: T, context: ChangeContext) => void`<br/>值变化时触发，`type` 表示触发本次变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts)。<br/>`interface ChangeContext { type: ChangeSource; e: InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent }`<br/><br/>`type ChangeSource = 'add' \| 'reduce' \| 'input' \| 'blur' \| 'enter' \| 'clear' \| 'props'`<br/> | N
onEnter | Function |  | TS 类型：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/>回车键按下时触发 | N
onFocus | Function |  | TS 类型：`(value: InputNumberValue, context: { e: FocusEvent }) => void`<br/>获取焦点时触发 | N
onKeydown | Function |  | TS 类型：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/>键盘按下时触发 | N
onKeypress | Function |  | TS 类型：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/>按下字符键时触发（keydown -> keypress -> keyup） | N
onKeyup | Function |  | TS 类型：`(value: InputNumberValue, context: { e: KeyboardEvent }) => void`<br/>释放键盘时触发 | N
onValidate | Function |  | TS 类型：`(context: { error?: 'exceed-maximum' \| 'below-minimum' }) => void`<br/>最大值或最小值校验结束后触发，`exceed-maximum` 表示超出最大值，`below-minimum` 表示小于最小值 | N

### InputNumber Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: InputNumberValue, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: T, context: ChangeContext)` | 值变化时触发，`type` 表示触发本次变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts)。<br/>`interface ChangeContext { type: ChangeSource; e: InputEvent \| MouseEvent \| FocusEvent \| KeyboardEvent \| CompositionEvent }`<br/><br/>`type ChangeSource = 'add' \| 'reduce' \| 'input' \| 'blur' \| 'enter' \| 'clear' \| 'props'`<br/>
enter | `(value: InputNumberValue, context: { e: KeyboardEvent })` | 回车键按下时触发
focus | `(value: InputNumberValue, context: { e: FocusEvent })` | 获取焦点时触发
keydown | `(value: InputNumberValue, context: { e: KeyboardEvent })` | 键盘按下时触发
keypress | `(value: InputNumberValue, context: { e: KeyboardEvent })` | 按下字符键时触发（keydown -> keypress -> keyup）
keyup | `(value: InputNumberValue, context: { e: KeyboardEvent })` | 释放键盘时触发
validate | `(context: { error?: 'exceed-maximum' \| 'below-minimum' })` | 最大值或最小值校验结束后触发，`exceed-maximum` 表示超出最大值，`below-minimum` 表示小于最小值
