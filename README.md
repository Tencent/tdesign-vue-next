<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/LICENSE">
    <img src="https://img.shields.io/npm/l/tdesign-vue-next.svg?sanitize=true" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-vue-next">
    <img src="https://img.shields.io/npm/v/tdesign-vue-next.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-vue-next">
    <img src="https://img.shields.io/npm/dt/tdesign-vue-next" alt="Downloads">
  </a>
</p>

TDesign 适配桌面端的组件库，适合在 vue 3.x 技术栈项目中使用。

### 🎉 特性

- 适配桌面端交互
- 基于 vue-next
- 与其他框架（Vue/React/Angular）版本 API、UI 保持一致
- 支持暗黑模式及其他主题定制
- 支持按需加载

### 安装

```shell
npm i tdesign-vue-next
```

### 基础使用

推荐使用 Webpack 或 Rollup 等支持 tree-shaking 特性的构建工具，无需额外配置即可实现组件按需引入：

```js
import { createApp } from 'vue';
import { Button } from 'tdesign-vue-next';
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
import App from './app.vue';

const app = createApp(App);
app.use(Button)
```

npm package 中提供了多种构建产物，可以阅读 [这里](https://github.com/TDesignOteam/tdesign-common/blob/develop/develop-install.md) 了解不同目录下产物的差别。

### 快速体验

可以访问官方提供的 [tdesign-starter](https://tdesign.tencent.com/starter/vue/) 项目体验使用 TDesign 组件快速搭建业务系统。

### 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 3 versions                                                                                                                                                                                                   | last 3 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

### 其他技术栈实现

- 桌面端 Vue 实现：[web-vue](https://github.com/Tencent/tdesign-vue)
- 桌面端 React 实现： [web-react](https://github.com/Tencent/tdesign-react)
- 移动端小程序实现： [小程序](https://github.com/Tencent/tdesign-miniprogram)

### 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-vue-next/LICENSE)。
