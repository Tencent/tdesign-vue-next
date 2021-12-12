:: BASE_DOC ::


## API

### Drawer Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | '' | 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
body | String / Slot / Function | - | 抽屉内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
cancelBtn | String / Object / Slot / Function | '' | 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件。TS 类型：`FooterButton` | N
closeBtn | String / Boolean / Slot / Function | undefined | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例。TS 类型：`string | boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
closeOnEscKeydown | Boolean | true | 按下 ESC 时是否触发抽屉关闭事件 | N
closeOnOverlayClick | Boolean | true | 点击蒙层时是否触发抽屉关闭事件 | N
confirmBtn | String / Object / Slot / Function | '' | 确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件。TS 类型：`FooterButton`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/drawer/type.ts) | N
default | String / Slot / Function | - | 抽屉内容，同 body。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | 抽屉关闭时是否销毁节点 | N
footer | Boolean / Slot / Function | true | 底部操作栏，默认会有“确认”和“取消”两个按钮。值为 true 显示默认操作按钮，值为 false 不显示任何内容，值类型为 TNode 表示自定义底部内容。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
header | String / Boolean / Slot / Function | undefined | 头部内容。值为 true 显示空白头部，值为 false 不显示头部，值类型为 string 则直接显示值，值类型为 TNode 表示自定义头部内容。TS 类型：`string | boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
mode | String | overlay | 展开方式，有两种：直接展示在内容上方 和 推开内容区域。可选项：overlay/push | N
placement | String | right | 抽屉方向。可选项：left/right/top/bottom | N
showInAttachedElement | Boolean | false | 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
size | String | small | 尺寸，支持 'small', 'medium', 'large'，'35px', '30%',  '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度 | N
sizeDraggable | Boolean | false | 抽屉大小可拖拽调整，横向抽屉调整宽度，纵向抽屉调整高度 | N
visible | Boolean | false | 组件是否可见。支持语法糖 | N
defaultVisible | Boolean | false | 组件是否可见。非受控属性 | N
zIndex | Number | - | 抽屉层级，样式默认为 1500 | N
onCancel | Function |  | 如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件。`(context: { e: MouseEvent }) => {}` | N
onClose | Function |  | 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/drawer/type.ts)。`(context: DrawerCloseContext) => {}` | N
onCloseBtnClick | Function |  | 如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件。`(context: { e: MouseEvent }) => {}` | N
onConfirm | Function |  | 如果“确认”按钮存在，则点击“确认”按钮时触发。`(context: { e: MouseEvent }) => {}` | N
onEscKeydown | Function |  | 按下 ESC 键时触发。`(context: { e: KeyboardEvent }) => {}` | N
onOverlayClick | Function |  | 如果蒙层存在，点击蒙层时触发。`(context: { e: MouseEvent }) => {}` | N

### Drawer Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 如果“取消”按钮存在，点击“取消”按钮时触发，同时触发关闭事件
close | `(context: DrawerCloseContext)` | 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/drawer/type.ts)
close-btn-click | `(context: { e: MouseEvent })` | 如果关闭按钮存在，点击关闭按钮时触发该事件，同时触发关闭事件
confirm | `(context: { e: MouseEvent })` | 如果“确认”按钮存在，则点击“确认”按钮时触发
esc-keydown | `(context: { e: KeyboardEvent })` | 按下 ESC 键时触发
overlay-click | `(context: { e: MouseEvent })` | 如果蒙层存在，点击蒙层时触发
