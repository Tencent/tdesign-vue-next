:: BASE_DOC ::

## API

### ChatContent Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String \| Object | '' | 聊天内容，支持多种内容类型。可以是字符串或结构化对象 `{ type: 'text'\|'markdown', data: String }` | N
`role` | String | - | 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息。可选项：user/assistant/error/model-change/system`待废弃，请尽快使用content结构化对象` | N
markdownProps | Object | - | 透传给 ChatMarkdown 组件的全部属性。TS 类型：`ChatMarkdownProps`，[ChatMarkdown API Documents](./chat-markdown?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/pro-components/chat/type.ts) | N


