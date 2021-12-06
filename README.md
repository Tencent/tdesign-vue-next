# Vue Next for Web

TDesign 适配桌面端的组件库，适合在 Vue Next 技术栈项目中使用。

## 特性

- 适配桌面端交互
- 前端通用 UI 组件库 Oteam Web Vue-Next 版实现
- 与其他框架（Vue2 / React / Angular）版本 API、UI 保持一致
- 支持暗黑模式及其他主题定制
- 支持按需加载

### 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- | --------- |
| IE11, Edge| last 3 versions| last 3 versions| last 2 versions

## 安装

```shell
npm i tdesign-vue-next
```

## 使用

### 按需引入方式一

`import { Button } from 'tdesign-vue-next';` 本质和 `import { Button } from 'tdesign-vue-next/es'` 一样。

```js
import { createApp } from 'vue';
import { Button } from 'tdesign-vue-next';
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
import App from 'xxxx';

const app = createApp(App);
app.use(Button)
```

### 不带样式引入

由于原始样式基于 `less` 编写，需要自行处理 `less` 文件的编译（例如安装 `less`、`less-loader`）。可自定义主题

```js
import { createApp } from 'vue';
import { Button } from 'tdesign-vue-next/esm/';
// 引入组件库全局样式资源
import 'tdesign-vue-next/esm/style/index.js';
import App from 'xxxx';

const app = createApp(App);
app.use(Button)
```

### 全量引入方式一：默认方式

`import TDesign from 'tdesign-vue-next';` 本质和 `import TDesign from 'tdesign-vue-next/es'` 一样。

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from 'xxxx';

const app = createApp(App);
app.use(TDesign)
```

### 全量引入方式二

由于原始样式基于 `less` 编写，需要自行处理 `less` 文件的编译（例如安装 `less`、`less-loader`）。可自定义主题

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next/esm';
import App from 'xxxx';

const app = createApp(App);
app.use(TDesign)
```

### 全量引入方式三

```js
import Vue from 'vue';
import TDesign from 'tdesign-vue-next/lib/index-lib.js';
import 'tdesign-vue-next/dist/tdesign.css';

const app = createApp(App);
app.use(TDesign)
```
