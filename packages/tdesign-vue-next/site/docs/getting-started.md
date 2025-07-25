---
title: Vue Next for Web
description: TDesign 适配桌面端的组件库，适合在 vue3.x 技术栈项目中使用。
---

## 安装

### 使用 npm 安装

推荐使用 npm 方式进行开发

```shell
npm i tdesign-vue-next
```

### 通过 浏览器引入 安装

目前可以通过 [unpkg.com/tdesign-vue-next](https://unpkg.com/tdesign-vue-next) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- vue 3 -->
<script src="https://unpkg.com/vue@next"></script>
<link rel="stylesheet" href="https://unpkg.com/tdesign-vue-next/dist/tdesign.min.css" />
<script src="https://unpkg.com/tdesign-vue-next/dist/tdesign.min.js"></script>
...
<script>
 Vue.createApp({}).use(TDesign).mount('#app');
</script>
```

<div style="background: #fff5e4; display: flex; align-items: center; line-height: 20px; padding: 14px 24px; border-radius: 3px; color: #555a65;margin:16px 0">
   ⚠️ 请注意，我们不推荐使用这种方式，生产项目会直接受版本更新影响，同时也可能受到 CDN 的稳定性的影响。
</div>

npm package 中提供了多种构建产物，可以阅读 [这里](https://github.com/Tencent/tdesign/blob/main/docs/develop-install.md) 了解不同目录下产物的差别。

## 使用

TDesign 提供了三种方式使用组件，具体使用方式如下

### 基础使用

基础使用会全量注册所有组件，如果您的项目大规模使用组件，请放心使用这种方式。

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './app.vue';

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(TDesign);
```

### 按需引入使用

如果您对产物大小有严格的要求，可以通过 按需引入具体组件 的方式来使用。

借助 Webpack 或 Rollup 等支持 tree-shaking 特性的构建工具，可以达到按需引入的使用效果。

```js
import { createApp } from 'vue';
import { Button as TButton } from 'tdesign-vue-next';
import App from './app.vue';

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(TButton);
```

### 通过插件按需引用使用

除此之外，也可以使用 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现自动导入：

您仍需在项目引入组件库的少量全局样式变量

```js
import { createApp } from 'vue';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
```

并安装 `@tdesign-vue-next/auto-import-resolver` 和两个unplugin相关的第三方包和

```bash
npm install -D @tdesign-vue-next/auto-import-resolver unplugin-vue-components unplugin-auto-import
```

然后在 Webpack 或 Vite 对应的配置文件添加上述插件。

#### Vite

```js
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';
export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
};
```

#### Webpack

```js
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { TDesignResolver } = require('@tdesign-vue-next/auto-import-resolver');
module.exports = {
  // ...
  plugins: [
    AutoImport.default({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components.default({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
};
```

> `TDesignResolver` 支持的配置，可以点击此[链接](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/auto-import-resolver/README.md#%E9%80%89%E9%A1%B9)。

### Nuxt 3 中使用

在 nuxt 3 中，可以安装 nuxt module [@tdesign-vue-next/nuxt](https://nuxt.com/modules/tdesign-vue-next)

```bash
npx nuxi@latest module add tdesign-vue-next
# or
npm install tdesign-vue-next
npm install -D @tdesign-vue-next/nuxt
```

它可以满足各种自动引入组件的需求，您也可以通过配置在 nuxt config 中 `tdesign` 来调整具体配置，可配置的内容可参考文档 [@tdesign-vue-next/nuxt](https://www.npmjs.com/package/@tdesign-vue-next/nuxt)

```js
export default defineNuxtConfig({
  // ... 其他配置
  modules: [
    // ...
    '@tdesign-vue-next/nuxt',
  ],
  // 其他 @tdesign-vue-next/nuxt 的相关配置
  // tdesign: {
  //   resolveIcons: true
  //   ...
  // }
});
```

## 使用 AI 搜索

站点接入 TDesign 知识库，您只需要点击菜单顶部的 `AI 搜索`按钮，即可开始通过站点的对话助手，对使用 TDesign 的问题进行对话式的互动。
除了可以提问 TDesign 相关的内容，也可以提问和前端开发相关的内容。

目前站点提供三种使用方式，分别是`对话式的提问`、`划词解释`以及`指定 API 示例代码生成`。

### 对话式的提问

即普通的对话聊天式输入。

<img src="https://tdesign.gtimg.com/docs/ai-search-prompt.png" alt="ai-search-prompt" />

### 划词解释

在文档部分，选中任意文字，均可进行划词解释的使用。

<img src="https://tdesign.gtimg.com/docs/ai-search-marking.png" alt="ai-search-marking" />

### 指定 API 示例代码生成

在组件的 API 部分，选中API本身，即可生成API的示例代码。

<img src="https://tdesign.gtimg.com/docs/ai-search-api-1.png" alt="ai-search-api" />

生成完毕后，会同时跳转`codesandbox`直接运行生成的示例代码，您可以在生成的链接中进行二次调试或功能的体验。

<img src="https://tdesign.gtimg.com/docs/ai-search-api-2.png" alt="ai-search-api" />

###

## 编辑器提示

安装注册 TDesign 之后，在开发项目时，可以配合插件在VSCode等主流编辑器中达到提示组件名及API的效果。

推荐安装 `volar`，并在项目的 tsconfig.json 的 `includes` 属性中增加`node_modules/tdesign-vue-next/global.d.ts`，即可实现该效果。

## 快速体验

可以访问官方提供的 [tdesign-starter](https://tdesign.tencent.com/starter/vue-next/) 项目体验使用 TDesign 组件快速搭建业务系统。

## 浏览器兼容性

| [<img src="https://tdesign.gtimg.com/docs/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> IE / Edge | [<img src="https://tdesign.gtimg.com/docs/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://tdesign.gtimg.com/docs/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://tdesign.gtimg.com/docs/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --- | --- | --- | --- |
| Edge >=84 | Firefox >=83 | Chrome >=84 | Safari >=14.1 |

详情参见[桌面端组件库浏览器兼容性说明](https://github.com/Tencent/tdesign/wiki/Browser-Compatibility)

## FAQ

Q: 是否内置reset样式统一页面元素的默认样式 ？

A: `0.17.0` 版本开始我们不再引入 `reset.less`，影响最大的是移除了原先全局盒子模型的设定：

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

如果你的项目开发依赖于原先的 `reset` 样式，可以从 `dist` 目录中单独引入它：

```js
import 'tdesign-vue-next/dist/reset.css';
```
