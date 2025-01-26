:: BASE_DOC ::

### 指令方式调用

支持 `v-loading` 指令调用 `Loading`，只需要绑定 `boolean` 值即可，支持 `fullscreen` 和 `inheritColor` 修饰符以及 `Object` 形式的自定义配置，分别对应其属性。

{{ directive }}

## FAQ

### 为什么在 Loading 中无法使用样式穿透？

`Loading` 组件在 `1.0.8` 之后使用 `Vue3` 的 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 重构了 `attach` 属性的实现，因此 `:deep()` 深度选择器无法作用于 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 包裹的元素。

如果必须要进行样式替换，可以采用以下几种方案。

方案一：单独创建一个不使用`scoped`的`style`标签

```html
<style>
.test .t-radio-button__label {
  color: red;
}
</style>
```

方案二：使用 `:global` 伪类来实现相同效果，比起单独创建一个`style`更加简洁明了。

```html
<style scoped>
.abc{
  color: red;
}
:global(.test .t-radio-button__label) {
  color: red;
}
</style>
```

### 为什么使用 attach 属性挂载元素时会失败？

`attach` 属性使用属性使用 `Vue3` 的 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 实现，因此attach遵守[Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)的使用规则。

> `Teleport` 挂载时，传送的 `to` 目标必须已经存在于 `DOM` 中。理想情况下，这应该是整个 `Vue` 应用 `DOM` 树外部的一个元素。如果目标元素也是由 `Vue` 渲染的，你需要确保在挂载 `Teleport` 之前先挂载该元素。

如果您不确定问题是否是由该规则引起的，或者确定该规则不是问题的根本原因，请在 `GitHub` 上提出一个 `issue`，并提供可以重现问题的代码。这将有助于我们更好地了解您的问题并提供更好的帮助。

## API

### Loading Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | '' | 挂载元素，默认挂载到组件本身所在的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 子元素。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 子元素，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
delay | Number | 0 | 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒 | N
fullscreen | Boolean | false | 是否显示为全屏加载 | N
indicator | Boolean / Slot / Function | true | 加载指示符，值为 true 显示默认指示符，值为 false 则不显示，也可以自定义指示符。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
inheritColor | Boolean | false | 是否继承父元素颜色 | N
loading | Boolean | true | 是否处于加载状态 | N
preventScrollThrough | Boolean | true | 防止滚动穿透，全屏加载模式有效 | N
showOverlay | Boolean | true | 是否需要遮罩层，遮罩层对包裹元素才有效 | N
size | String | medium | 尺寸，示例：small/medium/large/12px/56px/0.3em | N
text | String / Slot / Function | - | 加载提示文案。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
zIndex | Number | - | 消息通知层级，样式默认为 3500 | N

### LoadingPlugin

同时也支持 `this.$loading`。这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Function | - | 必需。TS 类型：`boolean \| TdLoadingProps`

插件返回值：`LoadingInstance【interface LoadingInstance { hide: () => void }】`
