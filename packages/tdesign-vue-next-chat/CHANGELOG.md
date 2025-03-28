---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

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
