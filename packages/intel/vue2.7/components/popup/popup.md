:: BASE_DOC ::

### 通过插件方式调用Popup

通过插件方式调用Popup，用于将Popup渲染在已有节点的场景，同时该方式不论如何调用都只会挂载在一个节点上，用于减少页面上的Popup的渲染节点。

支持插件式调用 `this.$popup` 和函数式调用 `PopupPlugin` 两种方式，两种方式参数完全一样。
- `this.$popup(triggerElement, content, popupProps)`
- `PopupPlugin(triggerElement, content, popupProps)`

{{ plugin }}

## API
### Popup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 浮层里面的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 触发元素，同 triggerElement。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
delay | Number / Array | - | 延时显示或隐藏浮层，[延迟显示的时间，延迟隐藏的时间]，单位：毫秒。如果只有一个时间，则表示显示和隐藏的延迟时间相同。示例 `'300'` 或者 `[200, 200]`。默认为：[250, 150]。TS 类型：`number \| Array<number>` | N
destroyOnClose | Boolean | false | 是否在关闭浮层时销毁浮层 | N
disabled | Boolean | - | 是否禁用组件 | N
hideEmptyPopup | Boolean | false | 浮层是否隐藏空内容，默认不隐藏 | N
overlayClassName | String / Object / Array | - | 浮层类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`。TS 类型：`ClassName`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
overlayInnerClassName | String / Object / Array | - | 浮层内容部分类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`。TS 类型：`ClassName`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
overlayInnerStyle | Boolean / Object / Function | - | 浮层内容部分样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点。TS 类型：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
overlayStyle | Boolean / Object / Function | - | 浮层样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点。TS 类型：`Styles \| ((triggerElement: HTMLElement, popupElement: HTMLElement) => Styles)`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
placement | String | top | 浮层出现位置。TS 类型：`PopupPlacement` `type PopupPlacement = 'top'\|'left'\|'right'\|'bottom'\|'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left-top'\|'left-bottom'\|'right-top'\|'right-bottom'`。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/popup/type.ts) | N
popperOptions | Object | - | popper 初始化配置，详情参考 https://popper.js.org/docs/ | N
showArrow | Boolean | false | 是否显示浮层箭头 | N
trigger | String | hover | 触发浮层出现的方式。可选项：hover/click/focus/mousedown/context-menu | N
triggerElement | String / Slot / Function | - | 触发元素。值类型为字符串表示元素选择器。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
visible | Boolean | - | 是否显示浮层。支持语法糖 `v-model`。TS 类型：`boolean` | N
defaultVisible | Boolean | - | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
zIndex | Number | - | 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 | N
onScroll | Function |  | TS 类型：`(context: { e: WheelEvent }) => void`<br/>下拉选项滚动事件 | N
onScrollToBottom | Function |  | TS 类型：`(context: { e: WheelEvent }) => void`<br/>下拉滚动触底事件，常用于滚动到底执行具体业务逻辑 | N
onVisibleChange | Function |  | TS 类型：`(visible: boolean, context: PopupVisibleChangeContext) => void`<br/>当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'context-menu' \| 'keydown-esc'`<br/> | N

### Popup Events

名称 | 参数 | 描述
-- | -- | --
scroll | `(context: { e: WheelEvent })` | 下拉选项滚动事件
scroll-to-bottom | `(context: { e: WheelEvent })` | 下拉滚动触底事件，常用于滚动到底执行具体业务逻辑
visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | 当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/popup/type.ts)。<br/>`interface PopupVisibleChangeContext { e?: PopupTriggerEvent; trigger?: PopupTriggerSource }`<br/><br/>`type PopupTriggerEvent = MouseEvent \| FocusEvent \| KeyboardEvent`<br/><br/>`type PopupTriggerSource = 'document' \| 'trigger-element-click' \| 'trigger-element-hover' \| 'trigger-element-blur' \| 'trigger-element-focus' \| 'trigger-element-mousedown' \| 'context-menu' \| 'keydown-esc'`<br/>

### PopupPlugin

同时也支持 `this.$popup`。

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
content | String / Slot / Function | - | 必需。气泡框的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)
popupProps | Object | - | 透传气泡框/浮层的属性
triggerElement | String | - | 必需。触发气泡框/浮层的元素，传入选择器即可
