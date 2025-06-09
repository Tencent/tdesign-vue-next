:: BASE_DOC ::

## API
### ChatMessage Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
actions | Array/Function/Boolean | - | 操作按钮配置项，可配置操作按钮选项和顺序。数组可选项：replay/copy/good/bad/goodActived/badActived/share  | N
name | String | - | 发送者名称 | N
avatar | String/JSX.Element | - | 发送者头像 | N
datetime | String | - | 消息发送时间 | N
message | Object | - | 消息内容对象。类型定义见 `Message` | Y
placement | String | left | 消息位置。可选项：left/right | N
role | String | - | 发送者角色 | N
variant | String | text | 消息变体样式。可选项：base/outline/text | N
chatContentProps | Object | - | 消息内容属性配置。类型支持见 `chatContentProps` | N
handleActions | Object | - | 操作按钮处理函数 | N
animation | String | skeleton | 加载动画类型。可选项：skeleton/moving/gradient/circle | N

### ChatMessagesData 消息对象结构

字段 | 类型 | 必传 | 说明
--|--|--|--
id | string | Y | 消息唯一标识
role | `"user" \| "assistant" \| "system"` | Y | 消息角色类型
status | `"pending" \| "streaming" \| "complete" \| "stop" \| "error"` | N | 消息状态
content | `UserMessageContent[] \| AIMessageContent[] \|  TextContent[]` | N | 消息内容
ext | any | N | 扩展字段

#### UserMessageContent 内容类型支持
- 文本消息 (`TextContent`)
- 附件消息 (`AttachmentContent`)

#### AIMessageContent 内容类型支持
- 文本消息 (`TextContent`)
- Markdown 消息 (`MarkdownContent`)
- 搜索消息 (`SearchContent`)
- 建议消息 (`SuggestionContent`)
- 思考状态 (`ThinkingContent`)
- 图片消息 (`ImageContent`)
- 附件消息 (`AttachmentContent`)
- 自定义消息 (`AIContentTypeOverrides`)

几种类型都继承自`ChatBaseContent`，包含通用字段：
字段 | 类型 | 必传 | 默认值 | 说明
--|--|--|--|--
type | `ChatContentType` | Y | - | 内容类型标识（text/markdown/search等）
data | 泛型TData | Y | - | 具体内容数据，类型由type决定
status | `ChatMessageStatus \| ((currentStatus?: ChatMessageStatus) => ChatMessageStatus)` | N | - | 内容状态或状态计算函数
id | string | N | - | 内容块唯一标识

每种类型的data字段有不同的结构，具体可参考下方表格，[详细类型定义](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chatbot/core/type.ts#L17)


### 插槽

| 插槽名 | 说明 |
|--------|------|
| actionbar | 自定义操作栏 |
| `${type}-${index}` | 消息内容动态插槽，默认命名规则为`消息类型-内容索引`，如`chart-1`等 |