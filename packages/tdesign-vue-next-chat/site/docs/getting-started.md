---
title: TD Chat for AI
description: TDesign适配桌面端的AI Chat组件库，适合在 vue3.x 技术栈中的AI chat组件。后续将推出适用于React技术栈的chat组件。
spline: ai
---

## 安装

### 使用 npm 安装

推荐使用 npm 方式进行开发

```shell
npm i @tdesign-vue-next/chat
```

## 使用

### 基础使用

基础使用的方式会全量注册所有组件，如果您的项目大规模使用组件，请放心使用这种方式。

```js
import { createApp } from 'vue';
import App from './app.vue';
import TDesignChat from '@tdesign-vue-next/chat'; // 引入chat组件

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
  Chat as TChat,
  ChatAction as TChatAction,
  ChatContent as TChatContent,
  ChatInput as TChatInput,
  ChatItem as TChatItem,
} from '@tdesign-vue-next/chat';
```

<div style="background: #fff5e4; display: flex; align-items: center; line-height: 20px; padding: 14px 24px; border-radius: 3px; color: #555a65;margin:16px 0">
   ⚠️ 请注意，如果配合 unplugin-vue-components 使用 TDesign，请勿重命名为 T 开头组件进行按需使用，后续将修复该使用问题。
</div>

## 多语言配置

`@tdesign-vue-next/chat` 的所有组件都内置支持了多语言配置的能力。

如果您有多语言的需求，可以通过 `tdesign-vue-next` 提供的[全局配置能力](https://tdesign.tencent.com/vue-next/components/config-provider#%E5%9B%BD%E9%99%85%E5%8C%96%E9%85%8D%E7%BD%AE)进行配置。

```html
<template>
  <config-provider :global-config="enConfig">
    <t-chat />
  </config-provider>
</template>
<script setup>
import { ConfigProvider } from '@tdesign-vue-next/chat/es/config-provider';
import enConfig from 'tdesign-vue-next/es/locale/en_US';
</script>
```

## 浏览器兼容性

| [<img src="https://tdesign.gtimg.com/docs/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> IE / Edge | [<img src="https://tdesign.gtimg.com/docs/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://tdesign.gtimg.com/docs/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://tdesign.gtimg.com/docs/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=84                                                                                                                                                                 | Firefox >=83                                                                                                                                                            | Chrome >=84                                                                                                                                                          | Safari >=14.1                                                                                                                                                        |

详情参见[桌面端组件库浏览器兼容性说明](https://github.com/Tencent/tdesign/wiki/%E6%A1%8C%E9%9D%A2%E7%AB%AF%E7%BB%84%E4%BB%B6%E5%BA%93%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7%E8%AF%B4%E6%98%8E)
