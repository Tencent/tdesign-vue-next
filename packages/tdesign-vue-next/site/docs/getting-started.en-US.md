---
title: Vue Next for Web
description: TDesign Vue Next is a UI component library for Vue 3 and desktop application.
---

## Installation

### npm

```shell
npm i tdesign-vue-next
```

### unpkg

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

The package of tdesign-vue-next provides kinds of bundles, read [the documentation](https://github.com/Tencent/tdesign/blob/main/docs/develop-install.md) for the detail of differences between bundles.

## Usage

TDesign provides three ways to use components

### Basic Usage

Basic usage will register all components in full. If your project uses components on a large scale, feel free to use tdesign-vue in this way.

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './app.vue';

// import global design variables
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(TDesign);
```

### Import on-demand

If you have strict requirements for the size of the bundle, you can use tdesign-vue in this way.

With the help of building tools such as `Webpack` or `Rollup` that support tree-shaking features, you can achieve the effect of importing on demand.

```js
import { createApp } from 'vue';
import { Button as TButton } from 'tdesign-vue-next';
import App from './app.vue';

// import global design variables
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(TButton);
```

### Import on-demand with Plugin

You can also use `unplugin-vue-components` and `unplugin-auto-import` to achieve automatic on-demand import.

```js
import { createApp } from 'vue';
// import global design variables
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
```

install `unplugin-vue-components` and `unplugin-auto-import`

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

Then, add the above plugins to the corresponding configuration files of Webpack or Vite.

#### Vite

```js
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
  ],
};
```

#### Webpack

```js
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { TDesignResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  // ...
  plugins: [
    AutoImport.default({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
    Components.default({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
  ],
};
```

> You can click on this [link](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/tdesign.ts#L4) for the configuration supported by `TDesignResolver`.

### Use tdesign-vue-next in Nuxt3

In Nuxt 3, you can install the Nuxt module [@tdesign-vue-next/nuxt](https://nuxt.com/modules/tdesign-vue-next)

```bash
npx nuxi@latest module add tdesign-vue-next
# or
npm install tdesign-vue-next
npm install -D @tdesign-vue-next/nuxt
```

You can also adjust specific configurations in the Nuxt config through tdesign. For configurable content, please refer to [@tdesign-vue-next/nuxt](https://www.npmjs.com/package/@tdesign-vue-next/nuxt)

```js
export default defineNuxtConfig({
  modules: [
    // ...
    '@tdesign-vue-next/nuxt',
  ],
  // configuration for  @tdesign-vue-next/nuxt
  // tdesign: {
  //   resolveIcons: true
  //   ...
  // }
});
```

## Editor Prompts

After installing and registering TDesign, it can be used with plugins in editors such as VSCode to achieve the effect of prompting component names and APIs during development.

Plugin `volar` is recommended, after installing `volar`, please add `node_modules/tdesign-vue-next/global.d.ts` to the `includes` property in the project's `tsconfig.json file`.

## Starter Kit

Visit [TDesign Starter](https://tdesign.tencent.com/starter/vue-next/) to experience the system built with tdesign-vue-next UI Components.

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=91                                                                                                                                                                                                        | Firefox >=83                                                                                                                                                                                                      | Chrome >=91                                                                                                                                                                                                   | Safari >=14.1                                                                                                                                                                                                 |

Read our [browser compatibility](https://github.com/Tencent/tdesign/wiki/Browser-Compatibility) for more details.

## FAQ

Q: Does TDesign have a built-in reset style for unifying the default styles of page elements?

A: Since version `0.17.0`, tdesign-vue no longer imports `reset.less`. The biggest impact is the removal of the global box model setting

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

If your project development depends on the `reset` style, you can import it from the `dist` directory.

```js
import 'tdesign-vue-next/dist/reset.css';
```
