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
    <img src="https://img.shields.io/npm/dm/tdesign-vue-next" alt="Downloads">
  </a>
</p>

English | [简体中文](./README-zh_CN.md)

TDesign Vue Next is a UI component library for Vue 3 and desktop application.

# 🎉 Features

- Desktop application interaction
- High quality UI components for Vue 3.x
- Consistent API and UI with TDesign component libraries for other frameworks
- Dark mode and customizable theme
- Support tree-shaking

# 📦 Installation

```shell
npm i tdesign-vue-next
```

# 🔨 Usage

```js
import { createApp } from 'vue';
import { Button } from 'tdesign-vue-next';

import 'tdesign-vue-next/es/style/index.css';

import App from './app.vue';

const app = createApp(App);
app.use(Button);
```

The package of tdesign-vue-next provides kinds of bundles, read [the documentation](https://github.com/Tencent/tdesign/blob/main/docs/develop-install.md) for the detail of differences between bundles.

# Quick Start

Visit [TDesign Starter](https://tdesign.tencent.com/starter/vue-next/) to experience in the application built with TDesign Vue Next UI components.

# Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br> IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=84                                                                                                                                                                                                        | Firefox >=83                                                                                                                                                                                                      | Chrome >=84                                                                                                                                                                                                   | Safari >=14.1                                                                                                                                                                                                 |

Read our [browser compatibility](https://github.com/Tencent/tdesign/wiki/Browser-Compatibility) for more details.

# TDesign component libraries

TDesign also provides component libraries for other platforms and frameworks.

- component library for Vue 2.x : [tdesign-vue](https://github.com/Tencent/tdesign-vue)
- component library for React : [tdesign-react](https://github.com/Tencent/tdesign-react)
- component library for Wechat miniprogram : [tdesign-miniprogram](https://github.com/Tencent/tdesign-miniprogram)

# Contributing

Contributing is welcome. Read [guidelines for contributing](https://github.com/Tencent/tdesign-vue-next/blob/develop/CONTRIBUTING.md) before submitting your [Pull Request](https://github.com/Tencent/tdesign-vue-next/pulls).

## Contributors

<a href="https://github.com/tencent/tdesign-vue-next/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tencent/tdesign-vue-next" />
</a>

# Feedback

Create your [Github issues](https://github.com/Tencent/tdesign-vue-next/issues) or scan the QR code below to join our user groups

<img src="https://raw.githubusercontent.com/Tencent/tdesign/main/packages/components/src/images/groups/vue3-group.png" width="200" />

# License

The MIT License. Please see [the license file](./LICENSE) for more information.
