:: BASE_DOC ::

## API

### Loading Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | '' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
delay | Number | 0 | \- | N
fullscreen | Boolean | false | \- | N
indicator | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
inheritColor | Boolean | false | \- | N
loading | Boolean | true | \- | N
preventScrollThrough | Boolean | true | \- | N
showOverlay | Boolean | true | \- | N
size | String | medium | \- | N
text | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
zIndex | Number | - | \- | N

### LoadingPlugin

同时也支持 `this.$loading`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

name | params | default | description
-- | -- | -- | --
options | Function | - | required。Typescript：`boolean \| TdLoadingProps`

插件返回值：`LoadingInstance【interface LoadingInstance { hide: () => void }】`
