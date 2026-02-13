:: BASE_DOC ::

## API

### useChat

用于管理对话状态与生命周期的核心 Hook，初始化对话引擎、同步消息数据、订阅状态变更，并自动处理组件卸载时的资源清理。

#### 参数

| 参数名            | 类型               | 说明                                                                                     | 必传 |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------- | ---- |
| defaultMessages   | ChatMessagesData[] | 初始化消息列，[详细类型定义](/chat/components/chat-message?tab=api) 表                                                                           | N    |
| chatServiceConfig | ChatServiceConfig  | 对话服务配置，[详细类型定义](/chat/components/chatbot?tab=api#chatserviceconfig-类型说明) | Y    |

#### 返回值

| 返回值     | 类型               | 说明                                                                 |
| ---------- | ------------------ | -------------------------------------------------------------------- |
| chatEngine | ChatEngine         | 对话引擎实例，详见下方 [ChatEngine 实例方法](#chatengine-实例方法) |
| messages   | ChatMessagesData[] | 当前对话消息列表                                                     |
| status     | ChatStatus         | 当前对话状态（idle/pending/streaming/complete/stop/error）          |

### ChatEngine 实例方法

ChatEngine 实例方法与 Chatbot 组件实例方法完全一致，详见 [Chatbot 实例方法文档](/chat/components/chatbot?tab=api#chatbot-实例方法和属性)。

#### eventBus 事件总线

通过 `chatEngine.eventBus` 访问事件总线实例，支持以下方法：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| on | `(event, callback)` | `() => void` | 订阅事件，返回取消订阅函数 |
| once | `(event, callback)` | `() => void` | 一次性订阅 |
| off | `(event, callback?)` | `void` | 取消订阅，不传 callback 则取消全部 |
| emit | `(event, payload)` | `void` | 发布事件 |
| waitFor | `(event, timeout?)` | `Promise` | 等待事件触发 |
| waitForMatch | `(event, filter, timeout?)` | `Promise` | 带条件等待 |
| onCustom | `(eventName, callback)` | `() => void` | 订阅自定义事件 |
| emitCustom | `(eventName, data)` | `void` | 发布自定义事件 |
| getHistory | `()` | `EventHistoryItem[]` | 获取事件历史 |
| clear | `()` | `void` | 清理所有订阅 |
| destroy | `()` | `void` | 销毁事件总线 |


#### 支持的事件类型

| 事件类型 | 事件名 | 说明 | 载荷字段 |
|---------|--------|------|---------|
| **生命周期** | | | |
| ENGINE_INIT | `engine:init` | 引擎初始化完成 | `timestamp` |
| ENGINE_DESTROY | `engine:destroy` | 引擎销毁 | `timestamp` |
| **消息事件** | | | |
| MESSAGE_CREATE | `message:create` | 消息创建 | `message`, `messages` |
| MESSAGE_UPDATE | `message:update` | 消息更新 | `messageId`, `content`, `message` |
| MESSAGE_DELETE | `message:delete` | 消息删除 | `messageId`, `messages` |
| MESSAGE_CLEAR | `message:clear` | 消息清空 | `timestamp` |
| MESSAGE_STATUS_CHANGE | `message:status` | 消息状态变更 | `messageId`, `status`, `previousStatus` |
| **请求事件** | | | |
| REQUEST_START | `request:start` | 请求开始 | `params`, `messageId` |
| REQUEST_STREAM | `request:stream` | 每次接收到 SSE chunk 时触发（高频） | `messageId`, `chunk`, `content` |
| REQUEST_COMPLETE | `request:complete` | 请求完成 | `messageId`, `params`, `message` |
| REQUEST_ERROR | `request:error` | 请求错误 | `messageId`, `error`, `params` |
| REQUEST_ABORT | `request:abort` | 请求中止 | `messageId`, `params` |
| **AG-UI 事件** | | | |
| AGUI_RUN_START | `agui:run:start` | AG-UI 运行开始 | `runId`, `threadId`, `timestamp` |
| AGUI_RUN_COMPLETE | `agui:run:complete` | AG-UI 运行完成 | `runId`, `threadId`, `timestamp` |
| AGUI_RUN_ERROR | `agui:run:error` | AG-UI 运行错误 | `error`, `runId` |


### useAgentToolcall

用于注册工具调用配置的 Hook，支持自动注册和手动注册两种模式。

#### 参数

| 参数名 | 类型                                                              | 说明                                                     | 必传 |
| ------ | ----------------------------------------------------------------- | -------------------------------------------------------- | ---- |
| config | AgentToolcallConfig \\| AgentToolcallConfig[] \\| null \\| undefined | 工具调用配置对象或数组，传入时自动注册，不传入时手动注册 | N    |

#### 返回值

| 返回值        | 类型                                                           | 说明                     |
| ------------- | -------------------------------------------------------------- | ------------------------ |
| register      | (config: AgentToolcallConfig \\| AgentToolcallConfig[]) => void | 手动注册工具配置         |
| unregister    | (names: string \\| string[]) => void                            | 取消注册工具配置         |
| isRegistered  | (name: string) => boolean                                      | 检查工具是否已注册       |
| getRegistered | () => string[]                                                 | 获取所有已注册的工具名称 |

#### AgentToolcallConfig 配置

| 属性名       | 类型                                        | 说明                                       | 必传 |
| ------------ | ------------------------------------------- | ------------------------------------------ | ---- |
| name         | string                                      | 工具调用名称，需要与后端定义的工具名称一致 | Y    |
| description  | string                                      | 工具调用描述                               | N   |
| parameters   | Array<{ name: string; type: string; required?: boolean }> | 参数定义数组                               | N    |
| component    | Component | 自定义渲染组件                             | Y    |
| handler      | (args: TArgs, backendResult?: any) => Promise          | 非交互式工具的处理函数（可选）             | N    |
| subscribeKey |  (props: ToolcallComponentProps<TArgs, TResult>) => string | undefined             | 状态订阅 key 提取函数（可选）, 返回值用于订阅对应的状态数据，不配置或不返回则订阅所有的状态变化              | N    |

#### ToolcallComponentProps 组件属性

| 属性名     | 类型                                                 | 说明                                |
| ---------- | ---------------------------------------------------- | ----------------------------------- |
| status     | 'idle' \\| 'executing' \\| 'complete' \\| 'error' | 工具调用状态                        |
| args       | TArgs                                                | 解析后的工具调用参数                |
| result     | TResult                                              | 工具调用结果                        |
| error      | Error                                                | 错误信息（当 status 为 'error' 时） |
| respond    | (response: TResponse) => void                        | 响应回调函数（用于交互式工具）      |
| agentState | Record<string, any>                                  | 订阅的状态数据，返回依赖subscribeKey这里的配置 |


### ToolCallRenderer

工具调用的统一渲染组件，负责根据工具名称自动查找配置、解析参数、管理状态并渲染对应的 UI 组件。

#### Props

| 属性名    | 类型                                        | 说明                                           | 必传 |
| --------- | ------------------------------------------- | ---------------------------------------------- | ---- |
| toolCall  | ToolCall [对象结构](https://github.com/TDesignOteam/tdesign-web-components/blob/develop/src/chat-engine/type.ts#L97)                                    | 工具调用对象，包含 toolCallName、args、result 等信息 | Y    |
| onRespond | (toolCall: ToolCall, response: any) => void | 交互式工具的响应回调，用于将用户输入返回给后端 | N    |


### useAgentState

用于订阅 AG-UI 协议状态事件的 Hook，提供灵活的状态订阅机制。

> 💡 **使用建议**：详细的使用说明和场景示例请参考上方 [工具状态订阅](#工具状态订阅) 章节。

#### 参数

| 参数名  | 类型               | 说明             | 必传 |
| ------- | ------------------ | ---------------- | ---- |
| options | StateActionOptions | 状态订阅配置选项 | N    |

#### StateActionOptions 配置

| 属性名       | 类型                | 说明                                                                 | 必传 |
| ------------ | ------------------- | -------------------------------------------------------------------- | ---- |
| subscribeKey | string              | 指定要订阅的 stateKey，不传入时订阅最新状态                          | N    |
| initialState | Record<string, any> | 初始状态值                                                           | N    |

#### 返回值

| 返回值          | 类型                                                | 说明                                     |
| --------------- | --------------------------------------------------- | ---------------------------------------- |
| stateMap        | Record<string, any>                                 | 状态映射表，格式为 `{ [stateKey]: stateData }` |
| currentStateKey | string \\| null                                      | 当前活跃的 stateKey                      |
| setStateMap     | (stateMap: Record<string, any> \\| Function) => void | 手动设置状态映射表的方法                 |
| getCurrentState | () => Record<string, any>                           | 获取当前完整状态的方法                   |
| getStateByKey   | (key: string) => any                                | 获取特定 key 状态的方法                  |
### useAgentActivity

用于注册 Activity 配置的 Hook，支持自动注册和手动注册两种模式。Activity 专注于纯展示场景，通过流式更新实现动态内容展示。

#### 参数

| 参数名 | 类型                                                              | 说明                                                     | 必传 |
| ------ | ----------------------------------------------------------------- | -------------------------------------------------------- | ---- |
| config | ActivityConfig \\| ActivityConfig[] \\| null \\| undefined | Activity 配置对象或数组，传入时自动注册，不传入时手动注册 | N    |
#### 返回值

| 返回值        | 类型                                                           | 说明                     |
| ------------- | -------------------------------------------------------------- | ------------------------ |
| register      | (config: ActivityConfig \\| ActivityConfig[]) => void | 手动注册 Activity 配置         |
| unregister    | (names: string \\| string[]) => void                            | 取消注册 Activity 配置         |
| isRegistered  | (name: string) => boolean                                      | 检查 Activity 是否已注册       |
| getRegistered | () => string[]                                                 | 获取所有已注册的 Activity 类型 |
#### ActivityConfig 配置

| 属性名       | 类型                                        | 说明                                       | 必传 |
| ------------ | ------------------------------------------- | ------------------------------------------ | ---- |
| activityType | string                                      | Activity 类型名称，需要与后端定义的类型一致 | Y    |
| description  | string                                      | Activity 描述                               | N   |
| component    | Component | 自定义渲染组件                             | Y    |
#### ActivityComponentProps 组件属性

| 属性名       | 类型   | 说明                                |
| ------------ | ------ | ----------------------------------- |
| activityType | string | Activity 类型名称                    |
| content      | any    | Activity 内容数据                    |
| messageId    | string | 消息 ID                             |
### ActivityRenderer

Activity 的统一渲染组件，负责根据 Activity 类型自动查找配置并渲染对应的 UI 组件。
#### Props

| 属性名   | 类型         | 说明                                           | 必传 |
| -------- | ------------ | ---------------------------------------------- | ---- |
| activity | ActivityData | Activity 数据对象，包含 activityType、content、messageId 等信息 | Y    |
#### ActivityData 对象结构

| 属性名       | 类型   | 说明                                |
| ------------ | ------ | ----------------------------------- |
| activityType | string | Activity 类型名称                    |
| content      | any    | Activity 内容数据                    |
| messageId    | string | 消息 ID                             |
