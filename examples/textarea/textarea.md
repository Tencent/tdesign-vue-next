:: BASE_DOC ::

## API

### Textarea Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autofocus | Boolean | false | 自动聚焦，拉起键盘 | N
autosize | Boolean / Object | false | 高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度。TS 类型：`boolean | { minRows?: number; maxRows?: number }` | N
disabled | Boolean | false | 是否禁用文本框 | N
maxcharacter | Number | - | 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 | N
maxlength | Number | - | 用户最多可以输入的字符个数 | N
name | String | - | 名称 | N
placeholder | String | - | 占位符 | N
readonly | Boolean | false | 文本框是否只读 | N
value | String / Number | - | 文本框值。支持语法糖。TS 类型：`TextareaValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/textarea/type.ts) | N
defaultValue | String / Number | - | 文本框值。非受控属性。TS 类型：`TextareaValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/textarea/type.ts) | N
onBlur | Function |  | 失去焦点时触发。`(value: TextareaValue, context: { e: FocusEvent }) => {}` | N
onChange | Function |  | 输入内容变化时触发。`(value: TextareaValue, context?: { e?: InputEvent }) => {}` | N
onFocus | Function |  | 获得焦点时触发。`(value: TextareaValue, context: { e: FocusEvent }) => {}` | N
onKeydown | Function |  | 键盘按下时触发。`(value: TextareaValue, context: { e: KeyboardEvent }) => {}` | N
onKeypress | Function |  | 按下字符键时触发（keydown -> keypress -> keyup）。`(value: TextareaValue, context: { e: KeyboardEvent }) => {}` | N
onKeyup | Function |  | 释放键盘时触发。`(value: TextareaValue, context: { e: KeyboardEvent }) => {}` | N

### Textarea Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: TextareaValue, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: TextareaValue, context?: { e?: InputEvent })` | 输入内容变化时触发
focus | `(value: TextareaValue, context: { e: FocusEvent })` | 获得焦点时触发
keydown | `(value: TextareaValue, context: { e: KeyboardEvent })` | 键盘按下时触发
keypress | `(value: TextareaValue, context: { e: KeyboardEvent })` | 按下字符键时触发（keydown -> keypress -> keyup）
keyup | `(value: TextareaValue, context: { e: KeyboardEvent })` | 释放键盘时触发
