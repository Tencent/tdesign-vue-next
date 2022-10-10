:: BASE_DOC ::

## API

### Search Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autoWidth | Boolean | false | 搜索框宽度自适应 | N
autocompleteOptions | Array | - | 联想词列表，如果不存在或长度为 0 则不显示联想框。可以使用函数 `label` 自定义联想词为任意内容；也可使用插槽 `option` 定义联想词内容，插槽参数为 `{ option: AutocompleteOption; index: number }`。如果 `group` 值为 `true` 则表示当前项为分组标题。TS 类型：`Array<AutocompleteOption>` `type AutocompleteOption = string \| { label: string \| TNode; group?: boolean }`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
autofocus | Boolean | false | 是否默认聚焦 | N
borderless | Boolean | true | 无边框模式 | N
clearable | Boolean | true | 是否可清空 | N
disabled | Boolean | - | 禁用状态 | N
filter | Function | - | 自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。其中参数 `keyword` 指当前的搜索词，参数 `option` 指每一项联想词，函数返回 true 则显示当前联想词，函数返回 `false` 则隐藏当前联想词。TS 类型：`(keyword: string, option: any) => boolean \| Promise<boolean>` | N
inputProps | Object | - | 透传 Input 组件全部属性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
label | String / Slot / Function | '' | 搜索框内部左侧内容，位于 `prefixIcon` 左侧。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
multiline | Boolean | false | 批量搜索模式，也叫多行搜索，输入框表现为类似 `textarea`，允许输入多行搜索内容 | N
placeholder | String | '' | 占位符 | N
popupProps | Object | - | 透传 Popup 组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
prefixIcon | Slot / Function | - | 前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态 | N
selectInputProps | Object | - | 基于 SelectInput 组件开发，透传组件全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
suffix | String / Slot / Function | '' | 搜索框内部右侧内容，位于 `suffixIcon` 右侧。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 后置图标，默认为搜索图标。值为 `null` 时则不显示。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
textareaProps | Object | - | 透传 Textarea 组件全部属性。TS 类型：`TextareaProps`，[Textarea API Documents](./textarea?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/search/type.ts) | N
value | String | - | 值，搜索关键词。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String | - | 值，搜索关键词。非受控属性 | N
onBlur | Function |  | TS 类型：`(context: { value: string; e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent }) => void`<br/>搜索关键词发生变化时触发，可能场景有：搜索框内容发生变化、点击联想词 | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清除时触发 | N
onEnter | Function |  | TS 类型：`(context: { value: string; e: KeyboardEvent }) => void`<br/>回车键按下时触发 | N
onFocus | Function |  | TS 类型：`(context: { value: string; e: FocusEvent }) => void`<br/>获得焦点时触发 | N
onSearch | Function |  | TS 类型：`(context?: { value: string; trigger: 'enter' \| 'option-click' \| 'clear' \| 'suffix-click' \| 'prefix-click'; e?: InputEvent \| MouseEvent }) => void`<br/>搜索触发，包含：Enter 键、联想关键词点击、清空按钮点击、搜索框后置内容点击（含后置图标）、搜索框前置内容点击（含前置图标）等 | N

### Search Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: string; e: FocusEvent })` | 失去焦点时触发
change | `(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent })` | 搜索关键词发生变化时触发，可能场景有：搜索框内容发生变化、点击联想词
clear | `(context: { e: MouseEvent })` | 点击清除时触发
enter | `(context: { value: string; e: KeyboardEvent })` | 回车键按下时触发
focus | `(context: { value: string; e: FocusEvent })` | 获得焦点时触发
search | `(context?: { value: string; trigger: 'enter' \| 'option-click' \| 'clear' \| 'suffix-click' \| 'prefix-click'; e?: InputEvent \| MouseEvent })` | 搜索触发，包含：Enter 键、联想关键词点击、清空按钮点击、搜索框后置内容点击（含后置图标）、搜索框前置内容点击（含前置图标）等
