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

使用之前，先来了解下构建产物中的目录文件，这可以帮助我们更好地理解为什么会有这些不同的导入方式。

- dist/tdesign.js 全量组件 JS 文件（未压缩，UMD）
- dist/tdesign.css 全量组件 CSS 文件（未压缩）
- dist/tdesign.min.js 全量组件 JS 文件（已压缩，UMD）
- dist/tdesign.min.css 全量组件 CSS 文件（已压缩）
- lib/index-lib.js 全量 JS 文件（CommonJS，不包含 CSS）
- lib/index.js 全量 JS 文件（CommonJS，不包含 CSS，不包含告警信息）
- lib/button 按需引入组件所需（CommonJS 用法，不包含 CSS）
- es/index.js 引入全量组件（ESM，包含 CSS 样式，纯 CSS 代码）
- es/button 按需引入组件（ESM，包含 CSS 样式，纯 CSS 代码）
- esm/index.js 引入全量组件（ESM，包含 CSS 样式，less 文件，业务侧需解析 less，可定义主题）
- esm/button 按需引入组件（ESM，包含 CSS 样式，less 文件，业务侧需解析 less，可定义主题）

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
