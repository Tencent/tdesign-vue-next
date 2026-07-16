<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
   <a href="https://www.npmjs.com/package/@tdesign-vue-next/chat">
    <img src="https://img.shields.io/npm/l/@tdesign-vue-next/chat.svg?sanitize=true" alt="License" />
  </a>
  <a href="https://www.npmjs.com/package/@tdesign-vue-next/chat">
    <img src="https://img.shields.io/npm/v/@tdesign-vue-next/chat.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@tdesign-vue-next/chat">
    <img src="https://img.shields.io/npm/dm/@tdesign-vue-next/chat" alt="Downloads">
  </a>
</p>

## 📦 安装

```shell
npm i @tdesign-vue-next/chat
```

## 🔨 使用

### 基础使用

基础使用会全量注册所有组件，如果您的项目大规模使用组件，请放心使用这种方式。

```js
import { createApp } from 'vue';
import App from './app.vue';
import TDesignChat from '@tdesign-vue-next/chat'; // 引入chat组件

const app = createApp(App);
app.use(TDesignChat);
```

如果要搭配 TDesign 使用其他组件，和 TDesign 一起引入

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

# 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br> IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=84                                                                                                                                                                                                        | Firefox >=83                                                                                                                                                                                                      | Chrome >=84                                                                                                                                                                                                   | Safari >=14.1                                                                                                                                                                                                 |

详情参见[桌面端组件库浏览器兼容性说明](https://github.com/Tencent/tdesign/wiki/Browser-Compatibility)

# 参与贡献

TDesign 欢迎任何愿意参与贡献的参与者。如果需要本地运行代码或参与贡献，请先阅读[参与贡献](https://github.com/Tencent/tdesign-vue-next/blob/develop/CONTRIBUTING.md)。

## 贡献成员

<a href="https://github.com/tencent/tdesign-vue-next/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tencent/tdesign-vue-next" />
</a>

# 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-vue-next/LICENSE)。
