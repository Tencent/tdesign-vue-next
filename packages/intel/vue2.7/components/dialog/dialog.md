:: BASE_DOC ::

### 插件函数式调用
插件调用方式一：`this.$dialog(options)`

插件调用方式二：`this.$dialog.confirm(options)`

插件调用方式三：`this.$dialog.alert(options)`

<br />

函数调用方式一：`DialogPlugin(options)`

函数调用方式二：`DialogPlugin.confirm(options)`

函数调用方式三：`DialogPlugin.alert(options)`

<br />

组件实例：`DialogInstance = this.$dialog(options)` 或者 组件实例：`DialogInstance = DialogPlugin(options)`

组件实例方法-销毁弹框：`DialogInstance.destroy()`

组件实例方法-隐藏弹框：`DialogInstance.hide()`

组件实例方法-显示弹窗：`DialogInstance.show()`

组件实例方法-更新弹框：`DialogInstance.update()`

{{ plugin }}

## API
### Dialog Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | - | 对话框挂载的节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
body | String / Slot / Function | - | 对话框内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
cancelBtn | String / Object / Slot / Function | - | 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件。TS 类型：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/dialog/type.ts) | N
closeBtn | String / Boolean / Slot / Function | true | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例。TS 类型：`string \| boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
closeOnEscKeydown | Boolean | true | 按下 ESC 时是否触发对话框关闭事件 | N
closeOnOverlayClick | Boolean | true | 点击蒙层时是否触发关闭事件 | N
confirmBtn | String / Object / Slot / Function | - | 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件。TS 类型：`string \| ButtonProps \| TNode \| null`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
confirmLoading | Boolean | undefined | 确认按钮加载状态 | N
confirmOnEnter | Boolean | - | 是否在按下回车键时，触发确认事件 | N
default | String / Slot / Function | - | 对话框内容，同 body。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | 是否在关闭弹框的时候销毁子元素 | N
draggable | Boolean | false | 对话框是否可以拖拽（仅在非模态对话框时有效） | N
footer | Boolean / Slot / Function | true | 底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 不显示任何内容，值类型为 Function 表示自定义底部内容。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
header | String / Boolean / Slot / Function | true | 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 string 则直接显示值，值类型为 Function 表示自定义头部内容。TS 类型：`string \| boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
mode | String | modal | 对话框类型，有 3 种：模态对话框、非模态对话框、全屏对话框。弹出「模态对话框」时，只能操作对话框里面的内容，不能操作其他内容。弹出「非模态对话框」时，则可以操作页面内所有内容。「普通对话框」是指没有脱离文档流的对话框，可以在这个基础上开发更多的插件。可选项：modal/modeless/full-screen | N
placement | String | top | 对话框位置，内置两种：垂直水平居中显示 和 靠近顶部（top:20%）显示。默认情况，为避免贴顶或贴底，顶部和底部距离最小为 `48px`，可通过调整 `top` 覆盖默认大小。可选项：top/center | N
preventScrollThrough | Boolean | true | 防止滚动穿透 | N
showInAttachedElement | Boolean | false | 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
theme | String | default | 对话框风格。可选项：default/info/warning/danger/success | N
top | String / Number | - | 用于弹框具体窗口顶部的距离，优先级大于 placement | N
visible | Boolean | - | 控制对话框是否显示 | N
width | String / Number | - | 对话框宽度，示例：320, '500px', '80%' | N
zIndex | Number | - | 对话框层级，Web 侧样式默认为 2500，移动端和小程序样式默认为 1500 | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件 | N
onClose | Function |  | TS 类型：`(context: DialogCloseContext) => void`<br/>关闭事件，点击取消按钮、点击关闭按钮、点击蒙层、按下 ESC 等场景下触发。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent \| KeyboardEvent }`<br/> | N
onCloseBtnClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击右上角关闭按钮时触发 | N
onClosed | Function |  | TS 类型：`() => void`<br/>对话框消失动画效果结束后触发 | N
onConfirm | Function |  | TS 类型：`(context: { e: MouseEvent \| KeyboardEvent }) => void`<br/>如果“确认”按钮存在，则点击“确认”按钮时触发，或者键盘按下回车键时触发 | N
onEscKeydown | Function |  | TS 类型：`(context: { e: KeyboardEvent }) => void`<br/>按下 ESC 时触发事件 | N
onOpened | Function |  | TS 类型：`() => void`<br/>对话框弹出动画效果结束后触发 | N
onOverlayClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果蒙层存在，点击蒙层时触发 | N

### Dialog Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件
close | `(context: DialogCloseContext)` | 关闭事件，点击取消按钮、点击关闭按钮、点击蒙层、按下 ESC 等场景下触发。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'esc' \| 'close-btn' \| 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent \| KeyboardEvent }`<br/>
close-btn-click | `(context: { e: MouseEvent })` | 点击右上角关闭按钮时触发
closed | \- | 对话框消失动画效果结束后触发
confirm | `(context: { e: MouseEvent \| KeyboardEvent })` | 如果“确认”按钮存在，则点击“确认”按钮时触发，或者键盘按下回车键时触发
esc-keydown | `(context: { e: KeyboardEvent })` | 按下 ESC 时触发事件
opened | \- | 对话框弹出动画效果结束后触发
overlay-click | `(context: { e: MouseEvent })` | 如果蒙层存在，点击蒙层时触发

### DialogOptions

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 对话框挂载的节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
className | String | - | 弹框类名，示例：'t-class-dialog-first t-class-dialog-second' | N
style | String / Object | - | 弹框 style 属性，输入 [CSSStyleDeclaration.cssText](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText)。TS 类型：`string \| Styles`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
`Omit<DialogProps, 'attach'>` | \- | - | 继承 `Omit<DialogProps, 'attach'>` 中的全部属性 | N

### DialogInstance

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
destroy | \- | \- | 必需。销毁弹框
hide | \- | \- | 必需。隐藏弹框
setConfirmLoading | `(loading: boolean)` | \- | 必需。设置确认按钮加载状态
show | \- | \- | 必需。显示弹框
update | `(props: DialogOptions)` | \- | 必需。更新弹框内容

### DialogPlugin

同时也支持 `this.$dialog`。

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | \- | - | TS 类型：`DialogOptions`

插件返回值：`DialogInstance`

### DialogPlugin.confirm

同时也支持 `this.$dialog.confirm`。

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | \- | - | TS 类型：`DialogOptions`

插件返回值：`DialogInstance`

### DialogPlugin.alert

同时也支持 `this.$dialog.alert`。

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | TS 类型：`Omit<DialogOptions, 'cancelBtn'>`

插件返回值：`DialogInstance`
