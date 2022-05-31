:: BASE_DOC ::

## API
### RangeInput Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
activeIndex | Number | 0 | 输入框高亮状态序号 | N
clearable | Boolean | false | 是否可清空 | N
disabled | Boolean / Array | false | 是否禁用范围输入框，值为数组表示可分别控制某一个输入框是否禁用。TS 类型：`boolean | Array<boolean>` | N
format | Array / Function | - | 指定输入框展示值的格式。TS 类型：`InputFormatType | Array<InputFormatType>` | N
inputProps | Object / Array | - | 透传 Input 输入框组件全部属性，数组第一项表示第一个输入框属性，第二项表示第二个输入框属性。示例：`[{ label: 'A', name: 'A-name' }, { label: 'B',  name: 'B-name' }]`。TS 类型：`InputProps | Array<InputProps>`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts) | N
label | TNode | - | 左侧内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/common.ts) | N
placeholder | String / Array | - | 占位符，示例：'请输入' 或者 ['开始日期', '结束日期']。TS 类型：`string | Array<string>` | N
prefixIcon | TElement | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态 | N
separator | TNode | '-' | 范围分隔符。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/common.ts) | N
showClearIconOnEmpty | Boolean | false | 输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示 | N
size | String | medium | 输入框尺寸。可选项：small/medium/large | N
status | String | - | 输入框状态。可选项：success/warning/error | N
suffix | TNode | - | 后置图标前的后置内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/common.ts) | N
suffixIcon | TElement | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/common.ts) | N
tips | TNode | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/common.ts) | N
value | Array | - | 范围输入框的值。TS 类型：`RangeInputValue` `type RangeInputValue = Array<InputValue>`。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts) | N
defaultValue | Array | - | 范围输入框的值。非受控属性。TS 类型：`RangeInputValue` `type RangeInputValue = Array<InputValue>`。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts) | N
onBlur | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition }) => void`<br/>范围输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: InputEvent | MouseEvent; position?: RangeInputPosition; trigger?: 'input' | 'clear' })    => void`<br/>范围输入框值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts)。<br/>`type RangeInputPosition = 'first' | 'second' | 'all'`<br/> | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>清空按钮点击时触发 | N
onClick | Function |  | TS 类型：`(context?: { e?: MouseEvent; position?: RangeInputPosition }) => void`<br/>范围输入框点击时触发 | N
onEnter | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: InputEvent | MouseEvent; position?: RangeInputPosition })  => void`<br/>回车键按下时触发 | N
onFocus | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition }) => void`<br/>范围输入框获得焦点时触发 | N
onMouseenter | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>进入输入框时触发 | N
onMouseleave | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>离开输入框时触发 | N

### RangeInputInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
blur | `(options?: {position?: RangeInputPosition})` | \- | 使其中一个输入框失去焦点
focus | `(options?: {position?: RangeInputPosition})` | \- | 使其中一个输入框获得焦点
select | `(options?: {position?: RangeInputPosition})` | \- | 使其中一个输入框选中内容

### RangeInputPopup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
autoWidth | Boolean | false | 宽度随内容自适应 | N
disabled | Boolean / Array | false | 是否禁用范围输入框，值为数组表示可分别控制某一个输入框是否禁用。TS 类型：`boolean | Array<boolean>` | N
inputValue | Array | - | 输入框的值。TS 类型：`RangeInputValue` | N
defaultInputValue | Array | - | 输入框的值。非受控属性。TS 类型：`RangeInputValue` | N
panel | TElement | - | 下拉框内容，可完全自定义。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/common.ts) | N
popupProps | Object | - | 透传 Popup 浮层组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts) | N
popupVisible | Boolean | - | 是否显示下拉框 | N
rangeInputProps | Object | - | 透传 RangeInput 组件全部属性。TS 类型：`RangeInputProps`，[RangeInput API Documents](./range-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts) | N
readonly | Boolean | false | 只读状态，值为真会隐藏输入框，且无法打开下拉框 | N
onInputChange | Function |  | TS 类型：`(value: RangeInputValue, context?: RangeInputValueChangeContext)  => void`<br/>输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发等。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts)。<br/>`type RangeInputValueChangeContext = { e?: InputEvent | MouseEvent; trigger?: 'input' | 'clear', position?: RangeInputPosition }`<br/> | N
onPopupVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>下拉框显示或隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-react/blob/develop/src/range-input/type.ts)。<br/>`import { PopupVisibleChangeContext } from '@Popup'`<br/> | N
