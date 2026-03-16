:: BASE_DOC ::

## API

### Chatbot Props

| 名称              | 类型            | 默认值 | 说明                                                                                                                                                                                                                                                                         | 必传 |
| ----------------- | --------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| defaultMessages   | Array           | -      | 初始消息数据列表。TS 类型：`ChatMessagesData[]`。[详细类型定义](/chat/components/chat-message?tab=api)                                                                                                                                                                 | N    |
| messageProps      | Object/Function | -      | 消息项配置，透传给内部 [ChatMessage](/chat/components/chat-message) 组件。按角色聚合了消息项的配置，可以是静态配置对象或动态配置函数。TS 类型：`TdChatMessageConfig \| ((msg: ChatMessagesData) => TdChatMessageConfigItem)` ，[详细类型定义](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chatbot/type.ts) | N    |
| listProps         | Object          | -      | 消息列表配置，见下方详细说明。TS 类型：`TdChatListProps`。                                                                                                                                                                                                                                   | N    |
| senderProps       | Object          | -      | 发送框配置，透传给内部 [ChatSender](/chat/components/chat-sender) 组件。TS 类型：`TdChatSenderProps` [详细类型定义](/chat/components/chat-sender?tab=api)                                                                                                                                                                            | N    |
| chatServiceConfig | Object          | -      | 对话服务配置，包含网络请求和回调配置，见下方详细说明，TS 类型：`ChatServiceConfig`[详细类型定义](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts])                                                                                                                                                                                                                   | N    |
| onMessageChange   | Function        | -      | 消息列表数据变化回调，TS 类型：`(e: CustomEvent<ChatMessagesData[]>) => void`                                                                                                                                                                                                | N    |
| onChatReady       | Function        | -      | 内部对话引擎初始化完成回调，TS 类型：`(e: CustomEvent) => void`                                                                                                                                                                                                              | N    |
| onChatAfterSend   | Function        | -      | 发送消息后的回调，TS 类型：`(e: CustomEvent<ChatRequestParams>) => void`                                                                                                                                                                                                         | N    |

### TdChatListProps 消息列表配置

| 名称       | 类型     | 默认值 | 说明                             | 必传 |
| ---------- | -------- | ------ | -------------------------------- | ---- |
| autoScroll | Boolean  | true   | 高度变化时列表是否自动滚动到底部 | N    |
| onScroll   | Function | -      | 滚动事件回调                     | N    |

### ChatServiceConfig 类型说明

对话服务核心配置类型，主要作用包括基础通信配置，请求流程控制及全生命周期管理（初始化 → 传输 → 完成/中止），流式数据的分块处理策略，状态通知回调等。

| 名称       | 类型     | 默认值    | 说明                                                                                                                                 | 必传 |
| ---------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| endpoint   | String   | -         | 对话服务请求地址 url                                                                                                                 | N    |
| protocol   | String   | 'default' | 对话服务协议，支持'default'和'agui'                                                                                                  | N    |
| stream     | Boolean  | true      | 是否使用流式传输                                                                                                                     | N    |
| onStart    | Function | -         | 流式传输接收到第一个数据块时的回调。TS 类型：`(chunk: string) => void`                                                            | N    |
| onRequest  | Function | -         | 请求发送前的配置回调，可修改请求参数、添加 headers 等。TS 类型：`(params: ChatRequestParams) => RequestInit`                                                  | N    |
| onMessage  | Function | -         | 处理流式消息的回调，用于解析后端数据并映射为组件所需格式。TS 类型：`(chunk: SSEChunkData) => AIMessageContent  \| AIMessageContent[] \| null`                                 | N    |
| onComplete | Function | -         | 请求结束时的回调。TS 类型：`(isAborted: boolean, params?: ChatRequestParams) => AIMessageContent \| AIMessageContent[] \| null` | N    |
| onAbort    | Function | -         | 中止请求时的回调。TS 类型：`() => Promise<void>`                                                                                     | N    |
| onError    | Function | -         | 错误处理回调。TS 类型：`(err: Error \| Response) => void`                                                                            | N    |

### Chatbot 实例方法和属性

通过 ref 获取组件实例，调用以下方法。

| 名称                  | 类型                                                                              | 描述                                         |
| --------------------- | --------------------------------------------------------------------------------- | -------------------------------------------- |
| setMessages           | `(messages: ChatMessagesData[], mode?: 'replace' \| 'prepend' \| 'append') => void` | 批量设置消息                                 |
| sendUserMessage       | `(params: ChatRequestParams) => Promise<void>`                                    | 发送用户消息，处理请求参数并触发消息流       |
| sendAIMessage         | `{ params?: ChatRequestParams; content?: AIMessageContent[]; sendRequest?: boolean }`                                    | 发送 AI 消息，处理请求参数并触发消息流       |
| sendSystemMessage     | `(msg: string) => void`                                                             | 发送系统级通知消息，用于展示系统提示/警告    |
| abortChat             | `() => Promise<void>`                                                               | 中止当前进行中的对话请求，清理网络连接       |
| addPrompt             | `(prompt: string) => void `                                                         | 将预设提示语添加到输入框，辅助用户快速输入   |
| selectFile            | `() => void`                                                                        | 触发文件选择对话框，用于附件上传功能         |
| regenerate            | `(keepVersion?: boolean) => Promise<void>`                                          | 重新生成最后一条消息，可选保留历史版本       |
| registerMergeStrategy |`(type: T['type'], handler: (chunk: T, existing?: T) => T) => void`                | 注册自定义消息合并策略，用于处理流式数据更新 |
| scrollList            | `({ to: 'bottom' \| 'top', behavior: 'auto' \| 'smooth' }) => void`                 | 受控滚动到指定位置                           |
| isChatEngineReady     | boolean                                                                           | ChatEngine 是否就绪                          |
| chatMessageValue      | ChatMessagesData[]                                                                | 获取当前消息列表的只读副本                   |
| chatStatus            | ChatStatus                                                                        | 获取当前对话状态（空闲/进行中/错误等）       |
| senderLoading         | boolean                                                                           | 当前输入框按钮是否在'输出中'                 |
