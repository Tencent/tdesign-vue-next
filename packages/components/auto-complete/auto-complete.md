:: BASE_DOC ::

## API

### AutoComplete Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
autofocus | Boolean | - | 自动获取焦点 | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | - | 是否允许清空 | N
default | String / Slot / Function | - | 触发显示联想词下拉框的元素，同 `triggerElement`。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | undefined | 是否禁用 | N
empty | String / Slot / Function | - | 当下拉联想词列表为空时显示的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
filter | Function | - | 自定义过滤规则，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。参数 `filterWords` 表示搜索词，`option`表示单个选项内容，返回值为 `true` 保留该选项，返回值为 `false` 则隐藏该选项。使用该方法时无需设置 `filterable`。TS 类型：`(filterWords: string, option: T) => boolean \| Promise<boolean>` | N
filterable | Boolean | true | 是否根据输入内容过滤联想词。默认过滤规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则。部分场景下输入关键词和下拉联想词完全不同，此时可以设置为 `false` | N
highlightKeyword | Boolean | true | 是否高亮联想词中和输入值的相同部分 | N
inputProps | Object | - | 透传 Input 组件全部特性。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/auto-complete/type.ts) | N
options | Array | - | 下拉联想词列表。示例一：`['联想词一', '联想词二']`。示例二：`{ label: () => <div>联想词元素</div>, text: '用于搜索的纯联想词' }`。TS 类型：`Array<T>` | N
panelBottomContent | String / Slot / Function | - | 面板内的底部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
panelTopContent | String / Slot / Function | - | 面板内的顶部内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
placeholder | String | undefined | 输入框为空时的占位提示。组件本身默认值为 `undefined`，但全局配置存在默认值，不同语言全局默认值不同 | N
popupProps | Object | - | 透传 Popup 组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/auto-complete/type.ts) | N
readonly | Boolean | undefined | 是否只读 | N
size | String | medium | 组件尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
textareaProps | Object | - | 透传 Textarea 组件全部特性。TS 类型：`TextareaProps`，[Textarea API Documents](./textarea?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/auto-complete/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
triggerElement | String / Slot / Function | - | 触发显示联想词下拉框的元素，默认为 Input 组件，可以使用 `trigger` 自定义为 Textarea 组件或其他组件。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String | - | 输入框的值，即当前指定的联想词。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String | - | 输入框的值，即当前指定的联想词。非受控属性 | N
onBlur | Function |  | TS 类型：`(context: { e: FocusEvent; value: string }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: string, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent \| KeyboardEvent }) => void`<br/>输入框值发生变化时触发 | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>清空按钮点击时触发 | N
onCompositionend | Function |  | TS 类型：`(context: { e: CompositionEvent; value: string }) => void`<br/>中文输入结束时触发 | N
onCompositionstart | Function |  | TS 类型：`(context: { e: CompositionEvent; value: string }) => void`<br/>中文输入开始时触发 | N
onEnter | Function |  | TS 类型：`(context: { e: KeyboardEvent; value: string }) => void`<br/>回车键按下时触发 | N
onFocus | Function |  | TS 类型：`(context: { e: FocusEvent; value: string }) => void`<br/>获得焦点时触发 | N
onSelect | Function |  | TS 类型：`(value: string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/>选中联想词时触发 | N

### AutoComplete Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { e: FocusEvent; value: string })` | 失去焦点时触发
change | `(value: string, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent \| KeyboardEvent })` | 输入框值发生变化时触发
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
compositionend | `(context: { e: CompositionEvent; value: string })` | 中文输入结束时触发
compositionstart | `(context: { e: CompositionEvent; value: string })` | 中文输入开始时触发
enter | `(context: { e: KeyboardEvent; value: string })` | 回车键按下时触发
focus | `(context: { e: FocusEvent; value: string })` | 获得焦点时触发
select | `(value: string, context: { e: MouseEvent \| KeyboardEvent })` | 选中联想词时触发
