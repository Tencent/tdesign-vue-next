---
title: 与AG-UI协议集成
order: 4
group:
  title: 快速上手
  order: 3
---

## 什么是AG-UI

**AG-UI（Agent User Interaction Protocol）** 是专为AI Agent与前端应用交互设计的标准化协议。它建立了一套统一的通信规范，让前端界面能够与各种AI服务无缝对话，就像是AI应用的"通用语言"。

AG-UI采用**事件驱动模型**，通过标准化的事件流实现前后端解耦：

- **统一接口标准**：屏蔽不同AI供应商的差异，提供一致的交互体验
- **实时流式通信**：支持SSE/WebSocket等方式的流式数据传输
- **有状态会话管理**：维护完整的对话上下文和共享状态
- **工具调用机制**：标准化的工具定义、调用和结果处理流程

## 为什么选择AG-UI协议？

### 与传统对比

| 对比维度 | 传统自定义协议 | AG-UI标准协议 |
|---------|---------------|---------------|
| **协议标准化** | 各家自定义格式，互不兼容 | 统一标准，跨服务兼容 |
| **事件模型** | 简单请求-响应，缺乏细粒度控制 | 16种标准事件，支持复杂交互流程 |
| **流式传输** | 需自行设计流式协议和解析逻辑 | 标准化流式事件，开箱即用 |
| **状态管理** | 无标准状态同步机制 | Snapshot + Delta标准模式 |
| **工具调用** | 各家格式不同，集成复杂 | 统一工具调用生命周期 |
| **迁移适配成本** | 每个AI服务需单独开发前端适配层 | 一套前端代码适配所有遵循AG-UI的服务 |

### 核心价值

- **统一标准化**：通过统一的事件格式屏蔽底层AI服务的差异，一套前端代码可以处理所有遵循AG-UI协议的后端服务
- **组件标准化**：接口协议一致性使得消息渲染、工具调用等核心功能可跨项目复用
- **可扩展性**：标准化的扩展点，便于添加新功能


## 协议要点

### 事件机制

AG-UI定义了16种标准事件类型，覆盖AI交互的完整生命周期：

| 事件分类 | 事件名 | 含义 |
|---------|--------|------|
| **生命周期事件** | `RUN_STARTED` | 开始执行，可显示进度指示 |
| | `RUN_FINISHED` | 执行完成 |
| | `RUN_ERROR` | 执行错误，包含错误信息 |
| **思考过程事件** | `THINKING_START/END` | 新的思考过程开始、结束 |
| | `THINKING_TEXT_MESSAGE_START/CONTEN/END` | 思考过程文本内容（段）的过程起止，通过CONTENT事件增量传输 |
| **文本消息事件** | `TEXT_MESSAGE_START` | 开始新消息，建立messageId |
| | `TEXT_MESSAGE_CONTENT` | 流式文本内容，通过delta增量传输 |
| | `TEXT_MESSAGE_END` | 消息结束，可触发后续操作 |
| **思考过程事件** | `THINKING_START` | 开始思考阶段 |
| | `THINKING_END` | 思考结束 |
| **工具调用事件** | `TOOL_CALL_START` | 开始调用工具，显示工具名称 |
| | `TOOL_CALL_ARGS` | 工具参数，支持流式传输JSON片段 |
| | `TOOL_CALL_END` | 工具调用完成 |
| | `TOOL_CALL_RESULT` | 工具执行结果 |
| **状态管理事件** | `STATE_SNAPSHOT` | 完整状态快照，用于初始化或同步 |
| | `STATE_DELTA` | 增量状态更新，基于JSON Patch（RFC 6902） |
| | `MESSAGES_SNAPSHOT` | 消息历史快照 |

以下是一段符合AG-UI协议的事件流响应示例：

```js
data: {"type": "RUN_STARTED", "runId": "run_456"}

data: {"type": "TEXT_MESSAGE_START", "messageId": "msg_789", "role": "assistant"}
data: {"type": "TEXT_MESSAGE_CONTENT", "messageId": "msg_789", "delta": "我来帮您查询"}

// 前端可以根据不同的toolCallName定义不同的工具组件来渲染
data: {"type": "TOOL_CALL_START", "toolCallId": "tool_001", "toolCallName": "weather_query"}
data: {"type": "TOOL_CALL_ARGS", "toolCallId": "tool_001", "delta": "{\"city\":\"北京\"}"}
data: {"type": "TOOL_CALL_END", "toolCallId": "tool_001"}
data: {"type": "TOOL_CALL_RESULT", "toolCallId": "tool_001", "content": "北京今日晴，22°C"}

data: {"type": "TEXT_MESSAGE_CONTENT", "messageId": "msg_789", "delta": "北京的天气"}
data: {"type": "TEXT_MESSAGE_END", "messageId": "msg_789"}

data: {"type": "RUN_FINISHED", "runId": "run_456"}

```


### 交互流程

AG-UI基于事件驱动架构，实现前后端的实时双向通信：

#### **基础交互流程**
1. **前端请求**：用户输入 → 封装为`RunAgentInput结构` → 发送到服务端点
2. **后端处理**：解析请求 → 启动AI代理 → 通过SSE发送事件流
3. **前端响应**：接收事件 → 实时更新界面 → 展示处理过程
4. **Human-in-Loop流程**：AG-UI支持人机协作的交互模式，允许在AI处理过程中插入人工干预


#### **核心特性**
- **状态共享**：通过`STATE_SNAPSHOT`和`STATE_DELTA`事件实现前后端状态同步
- **工具双向调用**：前端定义工具，Agent通过`TOOL_CALL_*`事件主动调用
- **实时流式传输**：支持文本、思考过程、工具调用的流式展示
- **上下文维护**：threadId/runId/stepId体系维护完整的对话上下文

这些能力构成了 AG-UI 成为生产级 Agent 应用的关键基础。


## TDesign Chat集成方式

### 基础配置

只需要简单配置`protocol: 'agui'`即可开启TDesign Chat UI与AG-UI协议的无缝对接，内置了对话生命周期`RUN_*`、思考过程事件`THINKING_*`、文本事件`TEXT_MESSAGE_*`和常见`TOOL_CALL_*`事件比如search搜索等的渲染支持, 也提供了标准消息结构的转换方法`AGUIAdapter.convertHistoryMessages`用于回填历史消息。

```javascript
import { ChatBot, AGUIAdapter } from '@tdesign-react/chat';

export default function AguiChat() {

  const chatServiceConfig = {
    endpoint: '/api/agui/chat',
    protocol: 'agui', // 启用AG-UI协议
    stream: true,
    // 可选：自定义事件处理
    onMessage: (chunk) => {
      // 返回null使用内置AG-UI解析
      // 返回自定义内容覆盖内置解析
      return null;
    },
  };

  return <ChatBot chatServiceConfig={chatServiceConfig} />;
}
```

### 高级功能

TDesign Chat为AG-UI协议提供了两个专用Hook：

- **`useAgentToolcall`**：用于注册和管理工具调用组件，当Agent发送`TOOL_CALL_*`事件时自动渲染对应的工具组件
- **`useAgentState`**：用于订阅AG-UI协议的状态事件，支持`STATE_SNAPSHOT`和`STATE_DELTA`事件的自动处理和状态同步

详细的使用方法请参考[ChatBot组件文档](/react-aigc/components/chatbot#ag-ui-协议适配)。


## 总结

AG-UI协议为AI应用开发提供了完整的标准化解决方案，通过采用AG-UI协议，TDesign Chat为开发者提供了构建专业级AI交互应用的完整工具链，让AI功能集成变得简单、高效、可维护。

## 相关资源

- [AG-UI官方文档](https://docs.ag-ui.com/)
- [TDesign Chat组件文档](/react-aigc/components/chatbot)
- [快速开始指南](/react-aigc/docs/getting-started)