:: BASE_DOC ::

## API
### ChatMessage Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
name | String / Slot / Function | - | 发送者名称 | N
avatar | String / Slot / Function | - | 发送者头像 | N
datetime | String / Slot / Function | - | 消息发送时间 | N
content | Array | - | 消息内容，由多个内容块组成的数组。根据 `role` 不同，数组元素支持的类型不同：用户消息见 [`UserMessageContent`](#usermessagecontent)，AI 消息见 [`AIMessageContent`](#aimessagecontent) | Y
role | String | assistant | 消息角色。可选项：user/assistant/system | N
status | String | - | 消息状态。可选项：pending/streaming/complete/stop/error | N
placement | String | left | 消息位置。可选项：left/right | N
variant | String | text | 消息变体样式。可选项：base/outline/text | N
chatContentProps | Object | - | 消息内容属性配置。类型支持 [详见`chatContentProps`说明](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-message/type.ts) | N
animation | String | circle | 加载动画类型。可选项：skeleton/moving/gradient/circle | N
allowContentSegmentCustom | Boolean | false | 是否允许自定义局部消息内容，其他消息内容实用默认样式 | N


#### UserMessageContent
- 文本消息 ([`TextContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L32))
- 附件消息 ([`AttachmentContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L86))

#### AIMessageContent
- 文本消息 ([`TextContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L32))
- Markdown 消息 ([`MarkdownContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L34))
- 搜索消息 ([`SearchContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L57))
- 建议消息 ([`SuggestionContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L69))
- 思考状态 ([`ThinkingContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L89))
- 图片消息 ([`ImageContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L36))
- 附件消息 ([`AttachmentContent`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L86))
- 自定义消息 ([`AIContentTypeOverrides`](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L122))

### 插槽

| 插槽名 | 说明 |
|--------|------|
| content | 自定义消息内容 |
| avatar | 自定义头像 |
| name | 自定义名称 |
| datetime | 自定义时间 |
| actionbar | 自定义操作栏 |

