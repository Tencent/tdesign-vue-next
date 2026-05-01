:: BASE_DOC ::

## API
### ChatMessage Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
name | String / Slot / Function | - | 发送者名称 | N
avatar | String / Slot / Function | - | 发送者头像 | N
datetime | String / Slot / Function | - | 消息发送时间 | N
content | Array | - | 消息内容，由多个内容块组成的数组。根据 `role` 不同，数组元素支持的类型不同：`role` 为 `user` 时为用户消息内容，类型见 `UserMessageContent` [详细类型定义](#usermessagecontent)；`role` 为 `assistant` 时为 AI 消息内容，类型见 `AIMessageContent` [详细类型定义](#aimessagecontent)；`role` 为 `system` 时为系统消息内容，类型见 `SystemMessageContent` [详细类型定义](#systemmessagecontent) | Y
role | String | assistant | 消息角色。可选项：user/assistant/system | N
status | String | - | 消息状态。可选项：pending/streaming/complete/stop/error | N
placement | String | left | 消息位置。可选项：left/right | N
variant | String | text | 消息变体样式。可选项：base/outline/text | N
chatContentProps | Object | - | 消息内容属性配置。TS 类型：`chatContentProps`（来自 `@tdesign/web-components-chat`） | N
animation | String | circle | 加载动画类型。可选项：skeleton/moving/gradient/circle | N
allowContentSegmentCustom | Boolean | false | 是否允许自定义局部消息内容，其他消息内容实用默认样式 | N


#### UserMessageContent
- 文本消息 `TextContent`（来自 `@tdesign/web-components-chat`）
- 附件消息 `AttachmentContent`（来自 `@tdesign/web-components-chat`）

#### AIMessageContent
- 文本消息 `TextContent`（来自 `@tdesign/web-components-chat`）
- Markdown 消息 `MarkdownContent`（来自 `@tdesign/web-components-chat`）
- 搜索消息 `SearchContent`（来自 `@tdesign/web-components-chat`）
- 建议消息 `SuggestionContent`（来自 `@tdesign/web-components-chat`）
- 思考状态 `ThinkingContent`（来自 `@tdesign/web-components-chat`）
- 图片消息 `ImageContent`（来自 `@tdesign/web-components-chat`）
- 附件消息 `AttachmentContent`（来自 `@tdesign/web-components-chat`）
- 自定义消息 `AIContentTypeOverrides`（来自 `@tdesign/web-components-chat`）

#### SystemMessageContent
- 文本消息 `TextContent`（来自 `@tdesign/web-components-chat`）

### 插槽

| 插槽名 | 说明 |
|--------|------|
| content | 自定义消息内容 |
| avatar | 自定义头像 |
| name | 自定义名称 |
| datetime | 自定义时间 |
| actionbar | 自定义操作栏 |

