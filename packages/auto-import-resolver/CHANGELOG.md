## 🌈 0.1.7 `2026-06-09`

### 🚀 Features

- 图标自动解析导入新增 `Divider1` 、`Keyboard1` 和 `VoiceWave` 三个图标
- mobile-vue 自动解析导入 `Segmented ` 和 `Typography` 组件

## 🌈 0.1.6 `2026-01-31`

### 🐞 Bug Fixes

- 修复 mobile-vue 自动导入  ActionSheetPlugin、 DrawerPlugin 和 ToastPlugin 三个插件无效 @liweijie0812 ([#6369](https://github.com/Tencent/tdesign-vue-next/pull/6369))

## 🌈 0.1.5 `2026-01-23`

### 🚀 Features

- 解析图标导入新增 217 个与人工智能、文档、徽标和文件相关的图标 @uyarn ([#6367](https://github.com/Tencent/tdesign-vue-next/pull/6367))
- 新增解析 `useChat` `useAgentToolcall` `useAgentState` 三个 Hook 方法 @liweijie0812 ([#6272](https://github.com/Tencent/tdesign-vue-next/pull/6272))

## 🌈 0.1.4 `2025-11-18` 

### 🐞 Bug Fixes
- 修复 `0.1.3` 产物错误，解析 Chat 相关新组件报错的问题 @liweijie0812 ([#6164](https://github.com/Tencent/tdesign-vue-next/pull/6164))


## 🌈 0.1.3 `2025-11-17` 

### 🚀 Features
- 解析 chat 系列组件，新增 Attachments，ChatActionbar，ChatList，ChatMarkdown, ChatThinking，Chatbot @liweijie0812 ([#6154](https://github.com/Tencent/tdesign-vue-next/pull/6154))


## 🌈 0.1.2 `2025-09-10` 

### 🚀 Features
- 解析图标导入新增align-bottom、no-result、no-result-filled、 tree-list、wifi-no、 wifi-no-filled、logo-stackblitz-filled、logo-stackblitz、logo-wecom-filled 图标；移除 video-camera-3、video-camera-3-filled、list 图标 @liweijie0812 ([#5987](https://github.com/Tencent/tdesign-vue-next/pull/5987))

### 🐞 Bug Fixes
- 修复自动引入 `ChatReasoning` 组件无效 @liweijie0812 ([#5818](https://github.com/Tencent/tdesign-vue-next/pull/5818))


## 🌈 0.1.1 `2025-07-26` 

### 🐞 Bug Fixes
- 修复启用 `resolveIcons` 自动导入图标无效 @liweijie0812 ([#5786](https://github.com/Tencent/tdesign-vue-next/pull/5786))
- 修复插件自动引入失效 @liweijie0812 ([#5786](https://github.com/Tencent/tdesign-vue-next/pull/5786))


## 🌈 0.1.0 `2025-07-21` 

### 🚀 Features
- 自解析组件自动导入，通过 `unplugin` 插件按需引入改为 `import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';`


