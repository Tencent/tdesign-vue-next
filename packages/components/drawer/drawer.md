:: BASE_DOC ::

## FAQ

### 为什么在 Drawer 中无法使用样式穿透？

`Drawer` 组件在 `1.0.8` 之后使用 `Vue3` 的 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 重构了 `attach` 属性的实现，因此 `:deep()` 深度选择器无法作用于 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 包裹的元素。

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
### Drawer Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
attach | String / Function | - | 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
body | String / Slot / Function | - | 抽屉内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
cancelBtn | String / Object / Slot / Function | - | 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件。TS 类型：`FooterButton` | N
closeBtn | String / Boolean / Slot / Function | - | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例。TS 类型：`string \| boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeOnEscKeydown | Boolean | true | 按下 ESC 时是否触发抽屉关闭事件 | N
closeOnOverlayClick | Boolean | true | 点击蒙层时是否触发抽屉关闭事件 | N
confirmBtn | String / Object / Slot / Function | - | 确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件。TS 类型：`FooterButton` `type FooterButton = string \| ButtonProps \| TNode`，[Button API Documents](./button?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts) | N
default | String / Slot / Function | - | 抽屉内容，同 body。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
destroyOnClose | Boolean | false | 抽屉关闭时是否销毁节点 | N
footer | Boolean / Slot / Function | true | 底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 或 null 不显示任何内容，值类型为 TNode 表示自定义底部内容。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
header | String / Boolean / Slot / Function | true | 头部内容。值为 true 显示空白头部，值为 false 不显示头部，值类型为 string 则直接显示值，值类型为 TNode 表示自定义头部内容。TS 类型：`string \| boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
mode | String | overlay | 展开方式，有两种：直接展示在内容上方 和 推开内容区域。可选项：overlay/push | N
placement | String | right | 抽屉方向。可选项：left/right/top/bottom | N
preventScrollThrough | Boolean | true | 防止滚动穿透 | N
showInAttachedElement | Boolean | false | 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
size | String | 'small' | 尺寸，支持 'small', 'medium', 'large'，'35px', '30%',  '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度 | N
sizeDraggable | Boolean / Object | false | 抽屉大小可拖拽调整，横向抽屉调整宽度，纵向抽屉调整高度。`sizeDraggable.max` 和 `sizeDraggable.min` 用于控制拖拽尺寸大小限制。TS 类型：`boolean \| SizeDragLimit` `interface SizeDragLimit { max: number, min: number }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts) | N
visible | Boolean | false | 组件是否可见 | N
zIndex | Number | - | 抽屉层级，样式默认为 1500 | N
onBeforeClose | Function |  | TS 类型：`() => void`<br/>抽屉执行关闭动画效果前触发 | N
onBeforeOpen | Function |  | TS 类型：`() => void`<br/>抽屉执行打开动画效果前触发 | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件 | N
onClose | Function |  | TS 类型：`(context: DrawerCloseContext) => void`<br/>关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/> | N
onCloseBtnClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件 | N
onConfirm | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果“确认”按钮存在，则点击“确认”按钮时触发 | N
onEscKeydown | Function |  | TS 类型：`(context: { e: KeyboardEvent }) => void`<br/>按下 ESC 键时触发 | N
onOverlayClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果蒙层存在，点击蒙层时触发 | N
onSizeDragEnd | Function |  | TS 类型：`(context: { e: MouseEvent; size: number  }) => void`<br/>抽屉大小拖拽结束时触发，事件参数 `size` 在横向抽屉中表示宽度，在纵向抽屉中表示高度 | N

### Drawer Events

名称 | 参数 | 描述
-- | -- | --
before-close | \- | 抽屉执行关闭动画效果前触发
before-open | \- | 抽屉执行打开动画效果前触发
cancel | `(context: { e: MouseEvent })` | 如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件
close | `(context: DrawerCloseContext)` | 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent \| KeyboardEvent }`<br/>
close-btn-click | `(context: { e: MouseEvent })` | 如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件
confirm | `(context: { e: MouseEvent })` | 如果“确认”按钮存在，则点击“确认”按钮时触发
esc-keydown | `(context: { e: KeyboardEvent })` | 按下 ESC 键时触发
overlay-click | `(context: { e: MouseEvent })` | 如果蒙层存在，点击蒙层时触发
size-drag-end | `(context: { e: MouseEvent; size: number  })` | 抽屉大小拖拽结束时触发，事件参数 `size` 在横向抽屉中表示宽度，在纵向抽屉中表示高度

### DrawerOptions

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 抽屉挂载的节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
className | String | - | 抽屉类名，示例：'t-class-drawer-first t-class-drawer-second' | N
style | String / Object | - | 弹框 style 属性，输入 [CSSStyleDeclaration.cssText](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText)。TS 类型：`string \| Styles`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
`Omit<DrawerProps, 'attach'>` | \- | - | 继承 `Omit<DrawerProps, 'attach'>` 中的全部属性 | N

### DrawerInstance

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
destroy | \- | \- | 销毁抽屉
hide | \- | \- | 隐藏抽屉
show | \- | \- | 显示抽屉
update | `(props: DrawerOptions)` | \- | 更新抽屉内容

### DrawerPlugin

同时也支持 `this.$drawer`。

参数名称 | 参数类型 | 参数默认值 | 参数描述
-- | -- | -- | --
options | \- | - | TS 类型：`DrawerOptions`
