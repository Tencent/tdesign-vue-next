:: BASE_DOC ::


### calling by v-loading

Supports calling the Loading component using the `v-loading` directive. You just need to bind a `boolean` value. It also supports the `fullscreen` and `inheritColor` modifiers, as well as custom configuration in the form of `Object`.

{{ directive }}

### attach to 

It can be attached to a specific element using the attach method.

Note: The element to which it is attached (parent of the loading) should have the CSS property set to `position: relative`.

{{ attach }}


## API

### Loading Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | '' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
delay | Number | 0 | \- | N
fullscreen | Boolean | false | \- | N
indicator | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
inheritColor | Boolean | false | \- | N
loading | Boolean | true | \- | N
preventScrollThrough | Boolean | true | \- | N
showOverlay | Boolean | true | \- | N
size | String | medium | \- | N
text | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
zIndex | Number | - | \- | N

### LoadingPlugin

同时也支持 `this.$loading`。

name | params | default | description
-- | -- | -- | --
options | Function | - | required。Typescript：`boolean \| TdLoadingProps`
context | \- | - | Typescript：`AppContext`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)

插件返回值：`LoadingInstance【interface LoadingInstance { hide: () => void }】`
