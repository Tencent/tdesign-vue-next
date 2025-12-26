---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

## 🌈 0.5.0-alpha.10 `2025-12-18`

### 🚀 Features

- 新增 `ChatEngine` 模块，暴露更多 Hooks 使用，展示相关 Chat Engine Hooks 的使用，具体请查看`ChatEngine` 使用示例

## 🌈 0.5.0-alpha.9 `2025-12-16`

### 🐞 Bug Fixes

- 修复全局注册没有注册旧版组件`t-chat`和`t-chat-action` 的问题
- `ChatSender`：
  - 修复 Mac 系统中文输入法下输入英文，回车触发 `enter` 的错误
  - 修复 input-prefix 插槽响应式的问题

## 🌈 0.5.0-alpha.8 `2025-12-14`

### 🐞 Bug Fixes

- 修复部分组件构建后丢失的问题
- 修复`SSEChunkData` 等类型丢失的问题

## 🌈 0.5.0-alpha.7 `2025-11-18`

- `Attachments`: 修复按需引用导出组件命名错误的问题
- `ChatSender`: 修复中文输入法回车触发 `enter` 的错误

## 🌈 0.5.0-alpha.6 `2025-11-12`

### 🚨 Breaking Change

- 组件新增：
  - `Chatbot` 智能对话组件，用于需要快速集成智能客服、问答系统等的 AI 应用
  - `ChatMessage` 对话消息体组件、用于在聊天对话中显示单个消息项
  - `ChatMarkdown` 内容渲染组件，内置支持完善的 Markdown 流式渲染能力，包括 mermaid 等多种格式的渲染
  - `Attachments` 文件附件组件，用于展示文件附件
  - `ChatThinking` 思考过程组件，与原 `ChatReasoning` 功能一致
  - 新组件均基于 Web Components 实现，样式覆盖方式请参考 [自定义样式](/cha/custom-style)
- 原组件更名：`Chat` 更名为 `ChatList` 对话列表，`ChatAction` 更名为 `ChatActionbar` 对话操作
- 旧组件移除：`ChatInput`、`ChatReasoning`、`ChatItem` 组件后续版本将移除，如果升级版本请尽量使用对应新组件 ⚠️
- 点击 [0.4.x](https://0_4_6-tdesign-vue-next-chat.surge.sh/chat/getting-started) 查看老版本 Chat 组件的使用文档

## 🌈 0.4.6 `2025-09-12`

### 🐞 Bug Fixes

- `ChatInput`: 修复 `suffixIcon` 传值不是插槽，响应式无效 @liweijie0812 ([#5905](https://github.com/Tencent/tdesign-vue-next/pull/5905))

## 🌈 0.4.5 `2025-07-31`

### 🐞 Bug Fixes

- `Chat`: 修复`0.4.3` 版本后多语言功能没有正确响应切换的问题 @uyarn ([#5828](https://github.com/Tencent/tdesign-vue-next/pull/5828))

## 🌈 0.4.4 `2025-07-31`

### 🐞 Bug Fixes

- `ChatContent`: 错误使用变量导致文案显示异常 @BelinChung ([#5817](https://github.com/Tencent/tdesign-vue-next/pull/5817))

## 🌈 0.4.3 `2025-07-18`

### 🐞 Bug Fixes

- `ChatInput`: 修复使用含 shift 的快捷键导致输入框失焦后，shift 标识未取消的问题 @Lyan-u ([#5710](https://github.com/Tencent/tdesign-vue-next/pull/5710))
- `Locale`: 修复多语言切换响应式失效 @liweijie0812 ([#5704](https://github.com/Tencent/tdesign-vue-next/pull/5704))

## 🌈 0.4.2 `2025-07-03`

### 🚀 Features

- 支持在`Volar`中提供类型提示 @liweijie0812 ([#5612](https://github.com/Tencent/tdesign-vue-next/pull/5612))

### 🐞 Bug Fixes

- `Chat`: 修复用户消息字体样式 @Nero978 ([#5617](https://github.com/Tencent/tdesign-vue-next/pull/5617))
- `ChatSender`:
  - 修复 windows 中文输入法（微软拼音）下使用 `shift +组合键` 先松开 shift 键再松开组合键之后，未同步取消 shift 功能的问题 @verynong ([#5608](https://github.com/Tencent/tdesign-vue-next/pull/5608))

## 🌈 0.4.1 `2025-06-12`

### 🚀 Features

- `ChatSender`: 新增 `loading` API，用于控制按钮状态, `stopDisabled` 将在未来版本废弃，请尽快使用 `loading` 替换 ⚠️ @zydemail ([#5595](https://github.com/Tencent/tdesign-vue-next/pull/5595))

### 🐞 Bug Fixes

- `ChatSender`:
  - 修复 `stopDisabled` 直接修改值不立即生效的问题 @zydemail ([#5595](https://github.com/Tencent/tdesign-vue-next/pull/5595))
  - 修复 `header`、`innerHeader` 等插槽的传参问题 @zydemail ([#5595](https://github.com/Tencent/tdesign-vue-next/pull/5595))

## 🌈 0.4.0 `2025-06-06`

### 🚨 Breaking Change

- 优化产物内容，移除冗余的 bundle 或非冗余 bundle 中的冗余产物，若使用此前文档并未声明的 bundle 内容请注意此变更 ⚠️ @zhangpaopao0609 @uyarn ([#5568](https://github.com/Tencent/tdesign-vue-next/pull/5568))

### 🐞 Bug Fixes

- `ChatSender`: @zydemail @dingJieWork ([#5471](https://github.com/Tencent/tdesign-vue-next/pull/5471))
  - 修复输入框有内容点击上传触发 send 回调事件的问题
  - 修复点击上传附件按钮时，按钮在 loading 状态结束前不正常展示的异常问题

### 🚧 Others

- `ChatSender`: 优化部分示例的展示效果

## 🌈 0.3.0 `2025-05-06`

### 🚀 Features

- `ChatSender`:
  - 新增 `fileSelect` 回调，用于监听图片或者文件上传
  - 新增 `inner-header`，`header` 插槽功能，用于定义输入框顶部及顶部外层内容
  - `suffix` 默认新增支持上传图片和上传附件功能按钮，支持透传 `renderPresets`, 自定义控制内置的上传图片和上传附件按钮组合顺序，回调函数，具体请参考示例代码
- `ChatReasoning`: 增加`collapsed`, 用于定义展开收起状态，支持双向绑定

### 🐞 Bug Fixes

- `ConfigProvider`: 修复与 `tdesign-vue-next` 配合使用时，全局配置的告警和异常问题，具体使用参考文档
- `ChatReasoning`: 修复组件独立使用的问题

## 🌈 0.2.4 `2025-03-26`

### 🚀 Features

- `ChatSender`: 增加 `value`、`defaultValue` 、`onChange` 等一系列 API，用于处理输入相关的逻辑，与`ChatInput`保持一致
- `Chat`: 增加`name`、`avatar`、`datetime`、`content` 等插槽，方便自定义每个对话单元的内容，具体使用参考实例

### 🐞 Bug Fixes

- `ChatSender`: 修复部分`textareaProps` 功能失效的问题

## 🌈 0.2.3 `2025-03-15`

### 🐞 Bug Fixes

- `ChatItem`: 修复对话中用户侧的换行样式问题

## 🌈 0.2.2 `2025-03-12`

### 🚀 Features

- 新增`ChatInstanceFunctions`类型，用于 `TypeScript` 中定义实例方法

### 🐞 Bug Fixes

- 优化 `ChatContent` 和 `ChatReasoning`的默认渲染样式

## 🌈 0.2.1 `2025-03-10`

### 🐞 Bug Fixes

- `ChatSender`: 修复 `suffix` 响应式丢失的问题
- `ChatContent`: 修复默认复制按钮异常的问题
- `ChatContent`: 优化 `ChatContent` 的默认渲染样式

## 🌈 0.2.0 `2025-03-08`

### 🚀 Features

- 新增 `ChatReasoning`: 用于进行思考过程展示等功能，具体使用请参考文档
- 新增 `ChatSender`: 增强版本的`ChatInput`，用于需要配合模型切换、多模态输入等场景，具体使用请参考文档
- 新增 `ChatLoading`: 全新的加载组件，适用于 ChatBot 中的等待反馈场景，具体使用请参考文档
- 新增国际化配置支持

### 🐞 Bug Fixes

- 修复单个组件使用部分样式缺失的问题

## 🌈 0.1.4 `2024-11-26`

### 🚀 Features

- `t-chat-content` 增加富文本相关样式

## 🌈 0.1.3 `2024-10-10`

### 🚀 Features

- `t-chat-input` 组件添加 `autofocus` 及 `autosize` 属性

## 🌈 0.1.2 `2024-09-19`

### 🚀 Features

- `t-chat` 新增`scroll`事件回调
- `t-chat-input` 组件添加 `v-model`支持, 添加 `change` 事件
- `t-chat-input` 新增 `disabled` 属性
