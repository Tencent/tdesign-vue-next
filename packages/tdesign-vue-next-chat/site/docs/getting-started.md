---
title: 快速开始
description: TDesign 适配桌面端的 AI Chat 组件库，适合在 Vue3.x 技术栈中的 AI Chat 组件。
spline: ai
---

## 安装

### 使用 npm 安装

推荐使用 npm 方式进行开发

```shell
npm i @tdesign-vue-next/chat@alpha
```

### 使用 yarn 安装

```shell
yarn add @tdesign-vue-next/chat@alpha
```

### 使用 pnpm 安装

```shell
pnpm add @tdesign-vue-next/chat@alpha
```

## 使用

### 基础使用

基础使用的方式会全量注册所有组件，如果您的项目大规模使用组件，请放心使用这种方式。

```js
import { createApp } from 'vue';
import App from './app.vue';
import TDesignChat from '@tdesign-vue-next/chat'; // 引入chat组件
import 'tdesign-vue-next/es/style/index.css'; // 引入少量全局样式变量

const app = createApp(App);
app.use(TDesignChat);
```

如果要搭配 TDesign 使用其他组件，和 TDesign 一起引入，请参考如下配置。

```js
import { createApp } from 'vue';
import App from './app.vue';
import TDesign from 'tdesign-vue-next';
import TDesignChat from '@tdesign-vue-next/chat'; // 引入chat组件

const app = createApp(App);
app.use(TDesign).use(TDesignChat);
```

### 按需引入使用

如果您对产物大小有严格的要求，可以通过 按需引入具体组件 的方式来使用。

借助 Webpack 或 Rollup 等支持 tree-shaking 特性的构建工具，可以达到按需引入的使用效果。

```js
import {
  ChatList as TChatList,
  ChatActionBar as TChatActionBar,
  ChatMarkdown as TChatMarkdown,
} from '@tdesign-vue-next/chat';
```

<div style="background: #fff5e4; display: flex; align-items: center; line-height: 20px; padding: 14px 24px; border-radius: 3px; color: #555a65;margin:16px 0">
   ⚠️ 如果按需使用的同时，需要通过主题生成器导出主题覆盖全局样式，建议请在 `main.ts` 按需注册使用 `createApp(App).use(TChatAction)`
</div>

### 通过插件按需引用使用

除此之外，部分组件也可以使用 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现自动导入

> `TDesignResolver` 支持的配置，可以点击此[链接](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/auto-import-resolver/README.md#%E9%80%89%E9%A1%B9)。

您仍需在项目引入组件库的少量全局样式变量

```js
import { createApp } from 'vue';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
```

并安装 `@tdesign-vue-next/auto-import-resolver` 和两个 unplugin 相关的第三方包

```bash
npm install -D @tdesign-vue-next/auto-import-resolver unplugin-vue-components unplugin-auto-import
```

然后在 Webpack 或 Vite 对应的配置文件添加上述插件。

#### Vite

```js
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';
export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: 'chat',
        }),
      ],
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'chat',
        }),
      ],
    }),
  ],
};
```

#### Webpack

```js
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { TDesignResolver } = require('@tdesign-vue-next/auto-import-resolver');
module.exports = {
  // ...
  plugins: [
    AutoImport.default({
      resolvers: [
        TDesignResolver({
          library: 'chat',
        }),
      ],
    }),
    Components.default({
      resolvers: [
        TDesignResolver({
          library: 'chat',
        }),
      ],
    }),
  ],
};
```

## 配置服务

TDesign Chat 支持两种后端 AI Agent 服务返回数据协议模式：**自定义协议**和**AG-UI 标准协议**。您可以根据后端服务的实际情况选择合适的协议模式。

### 自定义协议模式

适用于已有后端服务或需要自定义数据结构的场景，您的后端服务只需要返回标准 SSE 格式即可。

```js
// 自定义后端接口（/api/chat）返回案例
data: {"type": "think", "content": "正在分析您的问题..."}
data: {"type": "text", "content": "我是**腾讯云**助手"}
data: {"type": "text", "content": "很高兴为您服务！"}
```

接下来，前端通过配置 `onMessage` 回调来解析流式数据, 将自定义数据映射为组件所需格式。

```javascript
const chatServiceConfig = {
  endpoint: '/api/chat',
  onMessage: (chunk) => {
    const { type, content } = chunk.data;
    switch (type) {
      case 'text':
        return {
          type: 'markdown',
          data: content,
        };
      case 'think':
        return {
          type: 'thinking',
          data: {
            title: '思考中...',
            text: content,
          },
        };
      default:
        return null;
    }
  },
};
```

### AG-UI 标准协议

**AG-UI 协议**是专为 AI 代理与前端应用交互设计的标准化轻量级协议，内置支持工具调用、状态管理、多步骤任务等高级功能。AG-UI 协议支持 16 种标准化事件类型，组件会自动解析并渲染，包括对话生命周期`RUN_*`、文本消息`TEXT_MESSAGE_*`、思考过程`THINKING_*`、工具调用`TOOL_CALL_*`、状态更新`STATE_*`等。

TDesign Chat 内置支持**AG-UI 协议数据双向转换**，符合该协议的后端 Agent 服务，可以无缝接入使用，只需在配置中开启即可。详细介绍见[与 AG-UI 协议集成](/react-aigc/agui)

```js
// 符合AG-UI协议的后端接口（/api/agui/chat）返回案例
data: {"type": "RUN_STARTED", "runId": "run_456"}
data: {"type": "TEXT_MESSAGE_CONTENT", "delta": "正在处理您的请求..."}
data: {"type": "TOOL_CALL_START", "toolCallName": "search"}
data: {"type": "TOOL_CALL_RESULT", "content": "查询结果"}
data: {"type": "RUN_FINISHED", "runId": "run_456"}
```

```javascript
const chatServiceConfig = {
  endpoint: '/api/agui/chat',
  protocol: 'agui', // 启用AG-UI协议
  stream: true,
};
```

### 协议选择建议

| 场景               | 推荐协议   | 理由                              |
| ------------------ | ---------- | --------------------------------- |
| 快速集成到现有服务 | 自定义协议 | 灵活适配现有数据结构              |
| 构建复杂 AI 应用   | AG-UI 协议 | 业界标准、功能完整、扩展性强      |
| 多工具调用场景     | AG-UI 协议 | 内置工具注册、调用及状态管理 Hook |
| 简单问答场景       | 自定义协议 | 配置简单、开发快速                |

更多详细配置和示例请参考[组件文档](/chat/components/chatbot)。

## 编辑器提示

安装注册 TDesign 之后，在开发项目时，可以配合插件在 VSCode 等主流编辑器中达到提示组件名及 API 的效果。

推荐安装 `volar`，并在项目的 tsconfig.json 的 `includes` 属性中增加`node_modules/@tdesign-vue-next/chat/global.d.ts`，即可实现该效果。

## 浏览器兼容性

| [<img src="https://tdesign.gtimg.com/docs/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> IE / Edge | [<img src="https://tdesign.gtimg.com/docs/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://tdesign.gtimg.com/docs/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://tdesign.gtimg.com/docs/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=84                                                                                                                                                                 | Firefox >=83                                                                                                                                                            | Chrome >=84                                                                                                                                                          | Safari >=14.1                                                                                                                                                        |

详情参见[桌面端组件库浏览器兼容性说明](https://github.com/Tencent/tdesign/wiki/%E6%A1%8C%E9%9D%A2%E7%AB%AF%E7%BB%84%E4%BB%B6%E5%BA%93%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7%E8%AF%B4%E6%98%8E)
