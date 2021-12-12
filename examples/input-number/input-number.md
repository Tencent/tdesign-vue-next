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
placeholder | String | - | 占位符 | N
size | String | medium | 组件尺寸。可选项：small/medium/large | N
step | Number | 1 | 数值改变步数，可以是小数 | N
theme | String | row | 按钮布局。可选项：column/row/normal | N
value | Number | undefined | 值。支持语法糖 | N
defaultValue | Number | undefined | 值。非受控属性 | N
onBlur | Function |  | 失去焦点时触发。`(value: number, context: { e: FocusEvent }) => {}` | N
onChange | Function |  | 值变化时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/input-number/type.ts)。`(value: number, context: ChangeContext) => {}` | N
onEnter | Function |  | 回车键按下时触发。`(value: number, context: { e: KeyboardEvent }) => {}` | N
onFocus | Function |  | 获取焦点时触发。`(value: number, context: { e: FocusEvent }) => {}` | N
onKeydown | Function |  | 键盘按下时触发。`(value: number, context: { e: KeyboardEvent }) => {}` | N
onKeypress | Function |  | 按下字符键时触发（keydown -> keypress -> keyup）。`(value: number, context: { e: KeyboardEvent }) => {}` | N
onKeyup | Function |  | 释放键盘时触发。`(value: number, context: { e: KeyboardEvent }) => {}` | N

### InputNumber Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: number, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: number, context: ChangeContext)` | 值变化时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/input-number/type.ts)
enter | `(value: number, context: { e: KeyboardEvent })` | 回车键按下时触发
focus | `(value: number, context: { e: FocusEvent })` | 获取焦点时触发
keydown | `(value: number, context: { e: KeyboardEvent })` | 键盘按下时触发
keypress | `(value: number, context: { e: KeyboardEvent })` | 按下字符键时触发（keydown -> keypress -> keyup）
keyup | `(value: number, context: { e: KeyboardEvent })` | 释放键盘时触发
