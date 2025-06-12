:: BASE_DOC ::

### 关闭全局提示

#### 带关闭按钮的全局提示

{{ close }}

#### 使用关闭函数控制全局提示

如果不希望通过计时关闭，或者用户点击按钮关闭，也可以使用关闭函数。

{{ toggle }}

#### 关闭多条全局提示

{{ close-all }}

### 控制全局提示显示位置

全局提示显示位置可控制，`placement` 用于控制大概位置，`offset` 用于设置相对于 `placement` 所在位置的偏移

{{ placement }}

### 插件调用与函数式调用

支持插件式调用 `this.$message` 和函数式调用 `MessagePlugin` 两种方式，两种方式参数完全一样。

示例：`MessagePlugin.warning('请输入信息')` 或 `this.$message.warning('请输入信息')`

{{ plugin }}

## API

### Message Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
closeBtn | String / Boolean / Slot / Function | undefined | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮。TS 类型：`string \| boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
content | String / Slot / Function | - | 用于自定义消息弹出内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
duration | Number | 3000 | 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器 | N
icon | Boolean / Slot / Function | true | 用于自定义消息前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
theme | String | info | 消息组件风格。可选项：info/success/warning/error/question/loading。TS 类型：`MessageThemeList` `type MessageThemeList = 'info' \| 'success' \| 'warning' \| 'error' \| 'question' \| 'loading'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/message/type.ts) | N
onClose | Function |  | TS 类型：`(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent }) => void`<br/>关闭消息时触发 | N
onCloseBtnClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>当关闭按钮存在时，用户点击关闭按钮触发 | N
onDurationEnd | Function |  | TS 类型：`() => void`<br/>计时结束后触发 | N

### Message Events

名称 | 参数 | 描述
-- | -- | --
close | `(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent })` | 关闭消息时触发
close-btn-click | `(context: { e: MouseEvent })` | 当关闭按钮存在时，用户点击关闭按钮触发
duration-end | \- | 计时结束后触发

### MessageOptions

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 指定弹框挂载的父节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
className | String | - | 类名 | N
offset | Array | - | 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10em', '8rem']。TS 类型：`Array<string \| number>` | N
placement | String | top | 弹出消息位置。可选项：center/top/left/right/bottom/top-left/top-right/bottom-left/bottom-right。TS 类型：`MessagePlacementList` `type MessagePlacementList = 'center' \| 'top' \| 'left' \| 'right' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/message/type.ts) | N
style | Object | - | 内敛样式。TS 类型：`CSSProperties` | N
zIndex | Number | 5000 | 消息层级 | N
`MessageProps` | \- | - | 继承 `MessageProps` 中的全部属性 | N

### MessagePlugin

同时也支持 `this.$message`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
theme | String | - | 必需。消息类型。TS 类型：`MessageThemeList`
message | String / Object | - | 必需。消息内容。TS 类型：`string \| MessageOptions`
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示
context | \- | - | 要继承的应用的上下文。。TS 类型：`AppContext`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.info

同时也支持 `this.$message.info`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
message | String / Object | - | 必需。消息内容。TS 类型：`string \| MessageInfoOptions` `type MessageInfoOptions = Omit<MessageOptions, 'theme'>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/message/type.ts)
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示
context | \- | - | 要继承的应用的上下文。。TS 类型：`AppContext`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.error

同时也支持 `this.$message.error`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
message | String / Object | - | 必需。消息内容。TS 类型：`string \| MessageInfoOptions`
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示
context | \- | - | 要继承的应用的上下文。。TS 类型：`AppContext`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.warning

同时也支持 `this.$message.warning`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
message | String / Object | - | 必需。消息内容。TS 类型：`string \| MessageInfoOptions`
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示
context | \- | - | 要继承的应用的上下文。。TS 类型：`AppContext`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.success

同时也支持 `this.$message.success`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
message | String / Object | - | 必需。消息内容。TS 类型：`string \| MessageInfoOptions`
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示
context | \- | - | 要继承的应用的上下文。。TS 类型：`AppContext`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.loading

同时也支持 `this.$message.loading`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
message | String / Object | - | 必需。消息提醒内容。TS 类型：`string \| MessageInfoOptions`
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示
context | \- | - | 要继承的应用的上下文。。TS 类型：`AppContext`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.question

同时也支持 `this.$message.question`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
message | String / Object | - | 必需。消息内容。TS 类型：`string \| MessageInfoOptions`
duration | Number | 3000 | 消息显示时长，单位：毫秒。值为 0 表示永久显示
context | \- | - | 要继承的应用的上下文。。TS 类型：`AppContext`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

### MessagePlugin.close

同时也支持 `this.$message.close`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
options | Object | - | 必需。该插件参数为 $Message.info() 等插件执行后的返回值。示例：`const msg = $Message.info({}); $Message.close(msg)`。TS 类型：`Promise<MessageInstance>`

### MessagePlugin.closeAll

同时也支持 `this.$message.closeAll`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
\- | \- | - | \-

### MessagePlugin.config

同时也支持 `this.$message.config`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
message | Object | - | 必需。全局提醒插件全局配置。TS 类型：`MessageOptions`
