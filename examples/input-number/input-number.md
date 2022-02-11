:: BASE_DOC ::

## API
### InputNumber Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
decimalPlaces | Number | undefined | [小数位数](https://en.wiktionary.org/wiki/decimal_place) | N
disabled | Boolean | false | 禁用组件 | N
format | Function | - | 指定输入框展示值的格式。TS 类型：`(value: number) => number | string` | N
max | Number | Infinity | 最大值 | N
min | Number | -Infinity | 最小值 | N
placeholder | String | undefined | 占位符 | N
size | String | medium | 组件尺寸。可选项：small/medium/large | N
status | String | - | 文本框状态。可选项：success/warning/error | N
step | Number | 1 | 数值改变步数，可以是小数 | N
theme | String | row | 按钮布局。可选项：column/row/normal | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | Number | undefined | 值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | Number | undefined | 值。非受控属性 | N
onBlur | Function |  | TS 类型：`(value: number, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: number, context: ChangeContext) => void`<br/>值变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts)。<br/>`interface ChangeContext { type: ChangeSource; e: InputEvent | MouseEvent | FocusEvent }`<br/><br/>`type ChangeSource = 'add' | 'reduce' | 'input' | ''`<br/> | N
onEnter | Function |  | TS 类型：`(value: number, context: { e: KeyboardEvent }) => void`<br/>回车键按下时触发 | N
onFocus | Function |  | TS 类型：`(value: number, context: { e: FocusEvent }) => void`<br/>获取焦点时触发 | N
onKeydown | Function |  | TS 类型：`(value: number, context: { e: KeyboardEvent }) => void`<br/>键盘按下时触发 | N
onKeypress | Function |  | TS 类型：`(value: number, context: { e: KeyboardEvent }) => void`<br/>按下字符键时触发（keydown -> keypress -> keyup） | N
onKeyup | Function |  | TS 类型：`(value: number, context: { e: KeyboardEvent }) => void`<br/>释放键盘时触发 | N

### InputNumber Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: number, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: number, context: ChangeContext)` | 值变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input-number/type.ts)。<br/>`interface ChangeContext { type: ChangeSource; e: InputEvent | MouseEvent | FocusEvent }`<br/><br/>`type ChangeSource = 'add' | 'reduce' | 'input' | ''`<br/>
enter | `(value: number, context: { e: KeyboardEvent })` | 回车键按下时触发
focus | `(value: number, context: { e: FocusEvent })` | 获取焦点时触发
keydown | `(value: number, context: { e: KeyboardEvent })` | 键盘按下时触发
keypress | `(value: number, context: { e: KeyboardEvent })` | 按下字符键时触发（keydown -> keypress -> keyup）
keyup | `(value: number, context: { e: KeyboardEvent })` | 释放键盘时触发
