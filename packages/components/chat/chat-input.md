:: BASE_DOC ::

## API

### ChatInput Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
autofocus | Boolean | false | 输入框是否自动聚焦 | N
autosize | Boolean / Object | `{ minRows: 1, maxRows: 5 }` | 高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度。TS 类型：`boolean \| { minRows?: number; maxRows?: number }` | N
disabled | Boolean | false | 是否禁用输入框 | N
placeholder | String | - | 输入框默认文案 | N
stopDisabled | Boolean | false | 中止按钮是否可点击。等流式数据全部返回结束置为false，注意跟textLoading的控制时机不是同一个 | N
suffixIcon | Slot / Function | - | 发送按钮的自定义扩展。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String | - | 输入框的值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String | - | 输入框的值。非受控属性 | N
onBlur | Function |  | TS 类型：`(value:string, context: { e: FocusEvent }) => void`<br/>输入框聚焦时触发 | N
onChange | Function |  | TS 类型：`(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent }) => void`<br/>输入框值发生变化时触发 | N
onFocus | Function |  | TS 类型：`(value:string, context: { e: FocusEvent })  => void`<br/>输入框聚焦时触发 | N
onSend | Function |  | TS 类型：`(value:string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/>点击消息发送的回调方法 | N
onStop | Function |  | TS 类型：`(value:string, context: { e: MouseEvent }) => void`<br/>点击消息终止的回调方法 | N

### ChatInput Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value:string, context: { e: FocusEvent })` | 输入框聚焦时触发
change | `(value:string, context: { e: InputEvent \| MouseEvent \| KeyboardEvent })` | 输入框值发生变化时触发
focus | `(value:string, context: { e: FocusEvent }) ` | 输入框聚焦时触发
send | `(value:string, context: { e: MouseEvent \| KeyboardEvent })` | 点击消息发送的回调方法
stop | `(value:string, context: { e: MouseEvent })` | 点击消息终止的回调方法


