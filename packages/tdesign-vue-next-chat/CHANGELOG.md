---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

## 🌈 0.4.0 `2025-06-06` 
### 🚨 Breaking Change
- 优化产物内容，移除冗余的 bundle 或非冗余 bundle 中的冗余产物，若使用此前文档并未声明的 bundle 内容请注意此变更 ⚠️ @zhangpaopao0609 @uyarn ([#5568](https://github.com/Tencent/tdesign-vue-next/pull/5568))

### 🐞 Bug Fixes

- `ChatSender`: @zydemail  @dingJieWork ([#5471](https://github.com/Tencent/tdesign-vue-next/pull/5471))
   - 修复输入框有内容点击上传触发 send 回调事件的问题 
   - 修复点击上传附件按钮时，按钮在loading 状态结束前不正常展示的异常问题

🚧 Others
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
