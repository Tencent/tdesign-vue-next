<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/auto-import-resolver/LICENSE">
    <img src="https://img.shields.io/npm/l/@tdesign-vue-next/auto-import-resolver.svg?sanitize=true" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/@tdesign-vue-next/auto-import-resolver">
    <img src="https://img.shields.io/npm/v/@tdesign-vue-next/auto-import-resolver.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@tdesign-vue-next/auto-import-resolver">
    <img src="https://img.shields.io/npm/dm/@tdesign-vue-next/auto-import-resolver" alt="Downloads">
  </a>
</p>

`@tdesign-vue-next/auto-import-resolver` 是 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 的一个解析器，用于实现 TDesign 按需引入。

### 特性

- 支持 `Vite`, `Webpack`, `Rspack`, `Vue CLI`, `Rollup`, `esbuild` 等

### 安装

```shell
# via npm
npm i @tdesign-vue-next/auto-import-resolver unplugin-vue-components unplugin-auto-import -D

# via yarn
yarn add @tdesign-vue-next/auto-import-resolver unplugin-vue-components unplugin-auto-import -D

# via pnpm
pnpm add @tdesign-vue-next/auto-import-resolver unplugin-vue-components unplugin-auto-import -D

# via Bun
bun add @tdesign-vue-next/auto-import-resolver unplugin-vue-components unplugin-auto-import -D
```

## 使用

### Vite

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [TDesignResolver({autoImport:true})],
    }),
    Components({
      resolvers: [TDesignResolver()],
    }),
  ],
});
```

### Rollup

```ts
// rollup.config.js
import AutoImport from 'unplugin-auto-import/rollup';
import Components from 'unplugin-vue-components/rollup';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

export default {
  plugins: [
    AutoImport({
      resolvers: [TDesignResolver({autoImport:true})],
    }),
    Components({
      resolvers: [TDesignResolver()],
    }),
  ],
};
```

### Webpack

```ts
// webpack.config.js
import AutoImport from 'unplugin-auto-import/webpack';
import Components from 'unplugin-vue-components/webpack';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

module.exports = {
  plugins: [
    AutoImport({
      resolvers: [TDesignResolver({autoImport:true})],
    }),
    Components({
      resolvers: [TDesignResolver()],
    }),
  ],
};
```

### Rspack

```ts
// rspack.config.js
import AutoImport from 'unplugin-auto-import/rspack';
import Components from 'unplugin-vue-components/rspack';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

module.exports = {
  plugins: [
    AutoImport({
      resolvers: [TDesignResolver({autoImport:true})],
    }),
    Components({
      resolvers: [TDesignResolver()],
    }),
  ],
};
```

### Vue CLI

```ts
// vue.config.js
import AutoImport from 'unplugin-auto-import/webpack';
import Components from 'unplugin-vue-components/webpack';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [TDesignResolver({autoImport:true})],
      }),
      Components({
        resolvers: [TDesignResolver()],
      }),
    ],
  },
};
```

### esbuild

```ts
// esbuild.config.js
import { build } from 'esbuild';
import AutoImport from 'unplugin-auto-import/esbuild';
import Components from 'unplugin-vue-components/esbuild';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

build({
  plugins: [
    AutoImport({
      resolvers: [TDesignResolver({autoImport:true})],
    }),
    Components({
      resolvers: [TDesignResolver()],
    }),
  ],
});
```

## 选项

### library

TDesign 组件库

- **Type：** `'vue' | 'vue-next' | 'mobile-vue' | 'chat'`
- **Default：** `vue`
- **Example：**

```ts
Components({
  resolvers: [
    TDesignResolver({
      library: 'vue-next',
    }),
  ],
});
```

### resolveIcons

自动引入 `tdesign-icons` 图标库

- **Type：** `boolean`
- **Default：** `false`
- **Example：**

```ts
Components({
  resolvers: [
    TDesignResolver({
      resolveIcons: true,
    }),
  ],
});
```

### esm

导入 esm 版本

- **Type：** `boolean`
- **Default：** `false`

### exclude

设置不自动引入的组件。

- **Type：** `FilterPattern`
- **Default：** 
- **Example：**

```ts
Components({
  resolvers: [
    TDesignResolver({
      exclude: ['Button'],
    }),
  ],
});
```