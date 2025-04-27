:: BASE_DOC ::

## API

### ChatSender Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 是否禁用输入框 | N
placeholder | String | - | 输入框默认文案 | N
prefix | String / Slot / Function | - | 输入框左下角区域扩展。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
stopDisabled | Boolean | false | 中止按钮是否可点击。等流式数据全部返回结束置为false，注意跟textLoading的控制时机不是同一个 | N
suffix | String / Slot / Function | - | 输入框右下角区域扩展。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
header | String / Slot / Function | - | 输入框外标题区域扩展 | N
inner-header | String / Slot / Function | - | 输入框内标题区域扩展 | N
textareaProps | Object | - | 透传给  Textarea 组件的全部属性。TS 类型：`TextareaProps`，[Textarea API Documents](./textarea?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
value | String | - | 输入框的值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String | - | 输入框的值。非受控属性 | N
onBlur | Function |  | TS 类型：`(value:string, context: { e: FocusEvent }) => void`<br/>输入框聚焦时触发 | N
onChange | Function |  | TS 类型：`(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent }) => void`<br/>输入框值发生变化时触发 | N
onFocus | Function |  | TS 类型：`(value:string, context: { e: FocusEvent })  => void`<br/>输入框聚焦时触发 | N
onSend | Function |  | TS 类型：`(value:string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/>点击消息发送的回调方法 | N
onStop | Function |  | TS 类型：`(value:string, context: { e: MouseEvent }) => void`<br/>点击消息终止的回调方法 | N

### ChatSender Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value:string, context: { e: FocusEvent })` | 输入框聚焦时触发
change | `(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent })` | 输入框值发生变化时触发
focus | `(value:string, context: { e: FocusEvent }) ` | 输入框聚焦时触发
send | `(value:string, context: { e: MouseEvent \| KeyboardEvent })` | 点击消息发送的回调方法
stop | `(value:string, context: { e: MouseEvent })` | 点击消息终止的回调方法


