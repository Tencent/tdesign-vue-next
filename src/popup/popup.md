:: BASE_DOC ::

## FAQ

### 为什么在 Popup 中无法使用样式穿透？

Popup 组件及其衍生组件（例如 Popconfirm、Tooltip）的 `attach` 属性使用 Vue3 的 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 实现，因此 `:deep()` 深度选择器无法作用于 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 包裹的节点。如果您需要使用样式穿透来自定义组件样式，我们建议您使用替换 CSS Variables 的方式进行个性化主题配置。具体实现方法请参见 `自定义主题配置` 菜单。

如果必须要进行样式替换,可以采用以下几种方案。

方案一: 单独创建一个不使用scoped的style标签
```html
<style>
.test .t-radio-button__label {
  color: red;
}
</style>
```
方案二：使用 :global 伪类来实现相同效果，比起单独创建一个 style，更简洁明了。
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

`attach` 属性使用属性使用 Vue3 的 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 实现,因此attach遵守[Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)的使用规则。

> Teleport 挂载时，传送的 to 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 Teleport 之前先挂载该元素。

如果你不确定是否是该规则的原因或确定不是该规则的原因可以提出issue,请在提出issue时提供复现问题的代码,以便我们更好的帮助你。

## API
### Popup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 浮层里面的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 触发元素，同 triggerElement。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
delay | Number / Array | - | 延时显示或隐藏浮层，[延迟显示的时间，延迟隐藏的时间]，单位：毫秒。如果只有一个时间，则表示显示和隐藏的延迟时间相同。示例 `'300'` 或者 `[200, 200]`。默认为：[250, 150]。TS 类型：`number \| Array<number>` | N
destroyOnClose | Boolean | false | 是否在关闭浮层时销毁浮层 | N
disabled | Boolean | - | 是否禁用组件 | N
hideEmptyPopup | Boolean | false | 浮层是否隐藏空内容，默认不隐藏 | N
overlayClassName | String / Object / Array | - | 浮层类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`。TS 类型：`ClassName`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
overlayInnerClassName | String / Object / Array | - | 浮层内容部分类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`。TS 类型：`ClassName`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
overlayInnerStyle | Boolean / Object / Function | - | 浮层内容部分样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点。TS 类型：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
overlayStyle | Boolean / Object / Function | - | 浮层样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点。TS 类型：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placement | String | top | 浮层出现位置。TS 类型：`PopupPlacement` `type PopupPlacement = 'top'\|'left'\|'right'\|'bottom'\|'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left-top'\|'left-bottom'\|'right-top'\|'right-bottom'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/popup/type.ts) | N
popperOptions | Object | - | popper 初始化配置，详情参考 https://popper.js.org/docs/ | N
showArrow | Boolean | false | 是否显示浮层箭头 | N
trigger | String | hover | 触发浮层出现的方式。可选项：hover/click/focus/mousedown/context-menu | N
triggerElement | String / Slot / Function | - | 触发元素。值类型为字符串表示元素选择器。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
visible | Boolean | - | 是否显示浮层。支持语法糖 `v-model` 或 `v-model:visible`。TS 类型：`boolean` | N
defaultVisible | Boolean | - | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
zIndex | Number | - | 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 | N
onScroll | Function |  | TS 类型：`(context: { e: WheelEvent }) => void`<br/>下拉选项滚动事件 | N
onScrollToBottom | Function |  | TS 类型：`(context: { e: WheelEvent }) => void`<br/>下拉滚动触底事件，常用于滚动到底执行具体业务逻辑 | N
onVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'context-menu' \| 'keydown-esc'`<br/> | N

### Popup Events

名称 | 参数 | 描述
-- | -- | --
scroll | `(context: { e: WheelEvent })` | 下拉选项滚动事件
scroll-to-bottom | `(context: { e: WheelEvent })` | 下拉滚动触底事件，常用于滚动到底执行具体业务逻辑
visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | 当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'context-menu' \| 'keydown-esc'`<br/>
