---
title: Changelog
docClass: timeline
toc: false
spline: explain
---

## 🌈 0.5.1 `2026-03-09`

### 🐞 Bug Fixes

- `Attachments`: Fixed an issue with the display of image attachments @uyarn ([#6472](https://github.com/Tencent/tdesign-vue-next/pull/6472))
- `ChatMarkdown`: Fixed an issue where linked URLs in Markdown did not open properly @uyarn ([#6472](https://github.com/Tencent/tdesign-vue-next/pull/6472))

## 🌈 0.5.0 `2026-03-05`

### 🚨 Breaking Changes

- `ChatAction`: Renamed to `ChatActionbar` for dialogue operations. @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))
- `Chat`: Renamed to `ChatList` @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))

### 🚀 New Features

- `Attachments`: Added a new `Attachments` component for displaying file attachments. @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))
- `ChatEngine`: Added a headless enigne core `ChatEngine`. @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))
- `ChatMarkdown`: Introduced a `ChatMarkdown` component for rendering Markdown content, supporting advanced streaming rendering capabilities including various formats like Mermaid. @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))
- `ChatMessage`: Added a `ChatMessage` component for displaying individual messages in chat conversations. @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))
- `ChatThinking`: A component for representing thought processes, similar to the original `ChatReasoning` function. @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))
- `Chatbot`: Added a `Chatbot` component for intelligent dialogue systems, useful for quickly integrating AI applications such as customer service and Q&A systems. @zydemail ([#6150](https://github.com/Tencent/tdesign-vue-next/pull/6150))

### 📝 Documentation

- All new components are implemented using Web Components. For style customization, refer to [Custom Styles](https://tdesign.tencent.com/chat/custom-style).
- If there is a need for multi-language configuration, it is recommended to continue using [version 0.4.x](https://0_4_6-tdesign-vue-next-chat.surge.sh/chat/getting-started)

## 🌈 0.4.6 `2025-09-12` 

### 🐞 Bug Fixes
- `ChatInput`: Fix the issue where reactive is invalid when `suffixIcon` value is not a slot @liweijie0812 ([#5905](https://github.com/Tencent/tdesign-vue-next/pull/5905))


## 🌈 0.4.5 `2025-07-31` 

### 🐞 Bug Fixes
- `Chat`: Fix the issue where multi-language functionality does not respond correctly to switching after version `0.4.3` @uyarn ([#5828](https://github.com/Tencent/tdesign-vue-next/pull/5828))

## 🌈 0.4.4 `2025-07-31` 

### 🐞 Bug Fixes
- `ChatContent`: Fix abnormal text display caused by incorrect variable usage @BelinChung ([#5817](https://github.com/Tencent/tdesign-vue-next/pull/5817))


## 🌈 0.4.3 `2025-07-18` 

### 🐞 Bug Fixes
- `ChatInput`: Fix the issue where the shift identifier is not canceled after the input box loses focus when using shortcuts containing shift @Lyan-u ([#5710](https://github.com/Tencent/tdesign-vue-next/pull/5710))
- `Locale`: Fix the reactive failure of multi-language switching @liweijie0812 ([#5704](https://github.com/Tencent/tdesign-vue-next/pull/5704))

## 🌈 0.4.2 `2025-07-03` 

### 🚀 Features
- Support type hints in `Volar` @liweijie0812 ([#5612](https://github.com/Tencent/tdesign-vue-next/pull/5612))

### 🐞 Bug Fixes
- `Chat`: Fix user message font style @Nero978  ([#5617](https://github.com/Tencent/tdesign-vue-next/pull/5617))
- `ChatSender`: 
  - Fix the issue where the shift function is not synchronized when using `shift + combination key` in Windows Chinese input method (Microsoft Pinyin) after releasing the shift key first and then releasing the combination key @verynong ([#5608](https://github.com/Tencent/tdesign-vue-next/pull/5608))

## 🌈 0.4.1 `2025-06-12` 

### 🚀 Features
- `ChatSender`: Add `loading` API for controlling button state, `stopDisabled` will be deprecated in future versions, please use `loading` instead as soon as possible ⚠️ @zydemail ([#5595](https://github.com/Tencent/tdesign-vue-next/pull/5595))

### 🐞 Bug Fixes
- `ChatSender`: 
  - Fix the issue where directly modifying the `stopDisabled` value does not take effect immediately @zydemail ([#5595](https://github.com/Tencent/tdesign-vue-next/pull/5595))
  - Fix the parameter passing issue of `header`, `innerHeader` and other slots @zydemail ([#5595](https://github.com/Tencent/tdesign-vue-next/pull/5595))


## 🌈 0.4.0 `2025-06-06` 
### 🚨 Breaking Change
- Optimize build output, remove redundant bundles or redundant content in non-redundant bundles. Please note this change if you are using bundle content that was not declared in the previous documentation ⚠️ @zhangpaopao0609 @uyarn ([#5568](https://github.com/Tencent/tdesign-vue-next/pull/5568))

### 🐞 Bug Fixes

- `ChatSender`: @zydemail  @dingJieWork ([#5471](https://github.com/Tencent/tdesign-vue-next/pull/5471))
   - Fix the issue where the send callback event is triggered when the input box has content and the upload is clicked
   - Fix the abnormal issue where the button is not displayed normally before the loading state ends when clicking the upload attachment button

###  🚧 Others

- `ChatSender`: Optimize the display effect of some examples


## 🌈 0.3.0 `2025-05-06`

### 🚀 Features

- `ChatSender`:
  - Add `fileSelect` callback for listening to image or file upload
  - Add `inner-header` and `header` slot functions for defining the top and outer top content of the input box
  - `suffix` default added support for upload image and upload attachment function buttons, support passing `renderPresets`, custom control of built-in upload image and upload attachment button combination order, callback function, please refer to the example code for details
- `ChatReasoning`: Add `collapsed` for defining the expand/collapse state, supports two-way binding

### 🐞 Bug Fixes

- `ConfigProvider`: Fix the warning and exception issues of global configuration when used with `tdesign-vue-next`, please refer to the documentation for specific usage
- `ChatReasoning`: Fix the issue of independent component usage

## 🌈 0.2.4 `2025-03-26`

### 🚀 Features

- `ChatSender`: Add a series of APIs such as `value`, `defaultValue`, `onChange` for handling input-related logic, consistent with `ChatInput`
- `Chat`: Add slots such as `name`, `avatar`, `datetime`, `content` to facilitate customization of the content of each conversation unit, please refer to the example for specific usage

### 🐞 Bug Fixes

- `ChatSender`: Fix the issue where some `textareaProps` functions are invalid

## 🌈 0.2.3 `2025-03-15`

### 🐞 Bug Fixes

- `ChatItem`: Fix the line break style issue on the user side of the conversation

## 🌈 0.2.2 `2025-03-12`

### 🚀 Features

- Add `ChatInstanceFunctions` type for defining instance methods in `TypeScript`

### 🐞 Bug Fixes

- Optimize the default rendering style of `ChatContent` and `ChatReasoning`

## 🌈 0.2.1 `2025-03-10`

### 🐞 Bug Fixes

- `ChatSender`: Fix the issue of reactive loss in `suffix`
- `ChatContent`: Fix the abnormal issue of default copy button
- `ChatContent`: Optimize the default rendering style of `ChatContent`

## 🌈 0.2.0 `2025-03-08`

### 🚀 Features

- Add `ChatReasoning`: Used for thinking process display and other functions, please refer to the documentation for specific usage
- Add `ChatSender`: Enhanced version of `ChatInput`, used for scenarios that require model switching, multi-modal input, etc., please refer to the documentation for specific usage
- Add `ChatLoading`: A brand new loading component, suitable for waiting feedback scenarios in ChatBot, please refer to the documentation for specific usage
- Add internationalization configuration support

### 🐞 Bug Fixes

- Fix the issue of missing partial styles when using individual components

## 🌈 0.1.4 `2024-11-26`

### 🚀 Features

- `t-chat-content` Add rich text related styles

## 🌈 0.1.3 `2024-10-10`

### 🚀 Features

- `t-chat-input` component adds `autofocus` and `autosize` properties

## 🌈 0.1.2 `2024-09-19`

### 🚀 Features

- `t-chat` Add `scroll` event callback
- `t-chat-input` component adds `v-model` support, adds `change` event
- `t-chat-input` Add `disabled` property
