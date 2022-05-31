:: BASE_DOC ::

## API
### Input Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 文本内容位置，居左/居中/居右。可选项：left/center/right | N
autocomplete | String | - | 是否开启自动填充功能，HTML5 原生属性，[点击查看详情](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | N
autofocus | Boolean | false | 自动聚焦 | N
autoWidth | Boolean | false | 宽度随内容自适应 | N
clearable | Boolean | false | 是否可清空 | N
disabled | Boolean | false | 是否禁用输入框 | N
format | Function | - | 【开发中】指定输入框展示值的格式。TS 类型：`InputFormatType` `type InputFormatType = (value: InputValue) => number | string`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input/type.ts) | N
inputClass | String / Object / Array | - | t-input 同级类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`。TS 类型：`ClassName`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
maxcharacter | Number | - | 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用 | N
maxlength | Number | - | 用户最多可以输入的文本长度，一个中文等于一个计数长度。值小于等于 0 的时候，则表示不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用 | N
name | String | - | 名称 | N
placeholder | String | undefined | 占位符 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态 | N
showClearIconOnEmpty | Boolean | false | 输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示 | N
size | String | medium | 输入框尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
type | String | text | 输入框类型。可选项：text/number/url/tel/password/search/submit/hidden | N
value | String / Number | - | 输入框的值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`InputValue` `type InputValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input/type.ts) | N
defaultValue | String / Number | - | 输入框的值。非受控属性。TS 类型：`InputValue` `type InputValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/input/type.ts) | N
onBlur | Function |  | TS 类型：`(value: InputValue, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: InputValue, context?: { e?: InputEvent | MouseEvent }) => void`<br/>输入框值发生变化时触发 | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>清空按钮点击时触发 | N
onCompositionend | Function |  | TS 类型：`(value: InputValue, context: { e: CompositionEvent }) => void`<br/>中文输入结束时触发 | N
onCompositionstart | Function |  | TS 类型：`(value: InputValue, context: { e: CompositionEvent }) => void`<br/>中文输入开始时触发 | N
onEnter | Function |  | TS 类型：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/>回车键按下时触发 | N
onFocus | Function |  | TS 类型：`(value: InputValue, context: { e: FocusEvent }) => void`<br/>获得焦点时触发 | N
onKeydown | Function |  | TS 类型：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/>键盘按下时触发 | N
onKeypress | Function |  | TS 类型：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/>按下字符键时触发（keydown -> keypress -> keyup） | N
onKeyup | Function |  | TS 类型：`(value: InputValue, context: { e: KeyboardEvent }) => void`<br/>释放键盘时触发 | N
onMouseenter | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>进入输入框时触发 | N
onMouseleave | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>离开输入框时触发 | N
onPaste | Function |  | TS 类型：`(context: { e: ClipboardEvent; pasteValue: string }) => void`<br/>粘贴事件，`pasteValue` 表示粘贴板的内容 | N
onWheel | Function |  | TS 类型：`(context: { e: WheelEvent }) => void`<br/>输入框中滚动鼠标时触发 | N

### Input Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: InputValue, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: InputValue, context?: { e?: InputEvent | MouseEvent })` | 输入框值发生变化时触发
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
compositionend | `(value: InputValue, context: { e: CompositionEvent })` | 中文输入结束时触发
compositionstart | `(value: InputValue, context: { e: CompositionEvent })` | 中文输入开始时触发
enter | `(value: InputValue, context: { e: KeyboardEvent })` | 回车键按下时触发
focus | `(value: InputValue, context: { e: FocusEvent })` | 获得焦点时触发
keydown | `(value: InputValue, context: { e: KeyboardEvent })` | 键盘按下时触发
keypress | `(value: InputValue, context: { e: KeyboardEvent })` | 按下字符键时触发（keydown -> keypress -> keyup）
keyup | `(value: InputValue, context: { e: KeyboardEvent })` | 释放键盘时触发
mouseenter | `(context: { e: MouseEvent })` | 进入输入框时触发
mouseleave | `(context: { e: MouseEvent })` | 离开输入框时触发
paste | `(context: { e: ClipboardEvent; pasteValue: string })` | 粘贴事件，`pasteValue` 表示粘贴板的内容
wheel | `(context: { e: WheelEvent })` | 输入框中滚动鼠标时触发
