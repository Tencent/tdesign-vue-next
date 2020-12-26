:: BASE_DOC ::


### Message Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
theme | String | info | 消息组件风格。可选值：info/success/warning/error/question/loading。TS 类型：`ThemeList【type ThemeList = 'info' | 'success' | 'warning' | 'error' | 'question' | 'loading'】` | N
duration | Number | 0 | 消息显示时间，单位：毫秒。值为 0 表示永久显示不自动消失 | N
closeBtn | Boolean / Slot / Function | false | 用于定义关闭按钮。值为 false 不现实关闭按钮，值为 true 显示默认关闭按钮。值类型为 string，则直接显示值，如：“关闭”。TS 类型：`Boolean | TNode`。[查看具体类型定义](https://git.code.oa.com/TDesign/tdesign-web-vue/blob/develop/globals.d.ts) | N
icon | Boolean / Slot / Function | true | 消息提醒前面的图标，可以自定义。TS 类型：`Boolean | TNode`。[查看具体类型定义](https://git.code.oa.com/TDesign/tdesign-web-vue/blob/develop/globals.d.ts) | N
content | Slot / Function | - | 用于自定义消息弹出内容。TS 类型：`TNode`。[查看具体类型定义](https://git.code.oa.com/TDesign/tdesign-web-vue/blob/develop/globals.d.ts) | N
onClickCloseBtn | Function |  | 当关闭按钮存在时，用户点击关闭按钮触发。`(e: MouseEvent) => {}`
onDurationEnd | Function |  | 计时结束后触发。`() => {}`
onOpened | Function |  | 消息弹出动画结束时触发。`() => {}`
onClosed | Function |  | 消息隐藏动画结束时触发。`() => {}`

### Message Events
名称 | 参数 | 描述
-- | -- | --
clickCloseBtn | (e: MouseEvent) | 当关闭按钮存在时，用户点击关闭按钮触发
durationEnd | - | 计时结束后触发
opened | - | 消息弹出动画结束时触发
closed | - | 消息隐藏动画结束时触发


### this.$message.info
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
message | String / Object | - | 消息内容。TS 类型：`string | TdMessageInfoOptions`
duration | Number | 3000 | 消息显示时长，值为 0 表示永久显示

插件返回值：`Promise<MessageInstance>`


### this.$message
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
theme | String | - | 消息类型。TS 类型：`ThemeList`
message | String / Object | - | 消息内容。TS 类型：`string | TdMessageProps`
duration | Number | 3000 | 消息显示时长，值为 0 表示永久显示

插件返回值：`Promise<MessageInstance>`【interface MessageInstance { close: () => void }】


### this.$message.error
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
message | String / Object | - | 消息内容。TS 类型：`string | TdMessageInfoOptions`
duration | Number | 3000 | 消息显示时长，值为 0 表示永久显示

插件返回值：`Promise<MessageInstance>`


### this.$message.warning
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
message | String / Object | - | 消息内容。TS 类型：`string | TdMessageInfoOptions`
duration | Number | 3000 | 消息显示时长，值为 0 表示永久显示

插件返回值：`Promise<MessageInstance>`


### this.$message.success
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
message | String / Object | - | 消息内容。TS 类型：`string | TdMessageInfoOptions`
duration | Number | 3000 | 消息显示时长，值为 0 表示永久显示

插件返回值：`Promise<MessageInstance>`


### this.$message.loading
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
message | String / Object | - | 消息内容。TS 类型：`string | TdMessageInfoOptions`
duration | Number | 3000 | 消息显示时长，值为 0 表示永久显示

插件返回值：`Promise<MessageInstance>`


### this.$message.question
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
message | String / Object | - | 消息内容。TS 类型：`string | TdMessageInfoOptions`
duration | Number | 3000 | 消息显示时长，值为 0 表示永久显示

插件返回值：`Promise<MessageInstance>`


### this.$message.close
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | 该插件参数为 $Message.info() 等插件执行后的返回值。示例：`const msg = $Message.info({}); $Message.close(msg)`。TS 类型：`Promise<MessageInstance>`


### this.$message.closeAll
参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
- | - | - | -


### TdMessageInfoOptions
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
duration | Number | - | 显示时间，单位：毫秒。值为 0 则表示永久不消失 | N
placement | String | top | 弹出消息位置。可选值：center/top/left/right/bottom/top-left/top-right/bottom-left/bottom-right。TS 类型：`PlacementList【type PlacementList = 'center' | 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'】` | N
offset | Object | - | 弹出消息相对于 placement 偏移的位置，示例：{left: '30px'} | N
zIndex | Number | 5000 | 消息层级 | N
attach | String / Function | 'body' | 指定弹框挂载的父节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[查看具体类型定义](https://git.code.oa.com/TDesign/tdesign-web-vue/blob/develop/globals.d.ts) | N
TdMessageProps | - | - | 继承 TdMessageProps 中的全部API | N