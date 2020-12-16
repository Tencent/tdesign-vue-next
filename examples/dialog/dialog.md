## Dialog 对话框

对话框是一种临时窗口，通常在不想中断整体任务流程，但又需要为用户展示信息或获得用户响应时，在页面中打开一个对话框承载相应的信息及操作

### 何时使用
需要展示操作反馈或提示信息

需要填写或展示某些信息，但不方便中断当前流程时

对于脱离当前页面内容的独立线程，内容较少时也可以使用对话框

## 1.组件类型
### 1.1 确认类对话框
定义：是基础的带取消及主要操作的对话框，是对某操作进行二次确认的对话框

使用场景：确认类对话框适用于用户进行了一个操作，操作后果比较严重，需要用户二次确认的情况

#### 1.1.1 基础确认对话框

::: demo demos/base
:::


#### 1.1.2 带警示图标的确认类对话框，一般用于操作后果较严重，需特别注意的场景

::: demo demos/icon
:::

#### 1.1.3 自定义按钮颜色的确认类对话框，一般用于不可逆的操作，需谨慎对待的场景

::: demo demos/custom/bottom
:::

### 1.2 反馈和警示类对话框
定义：反馈和警示类对话框为显示某操作结果的对话框，内容区域有icon，仅有一个确认按钮

使用场景：反馈和警示类对话框用于操作后结果的展示，或危险、警告等信息的展示

::: demo demos/warning
:::


### 1.3 异步加载类对话框
定义：按钮带加载标识，操作需要异步完成的对话框

使用场景：当前操作需要异步完成，不能和对话框同步关闭时

::: demo demos/async
:::

### 弹框位置

::: demo demos/position 
:::

### 自定义主体内容
::: demo demos/custom/body 
:::

### 自定义底部内容
::: demo demos/custom/bottom 
:::

### 其他示例
::: demo demos/others 
:::

### 插件函数式调用
::: demo demos/plugin Plugin 
:::


### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|visable|Boolean|false|N|用于控制弹框是否显示（v-model）|
|mode|String|'modal'|N|是否模态形式，可选值：'modal', 'not一modal'|
|placement|String|'top'|N|top 定位: 20%，可选值：top/center|
|offset|Object|-|N|offset 是相对于 placement 的偏移量，如offset={left:'100px',top:'200px'}|
|width|String/Number|-|N|对话框宽度，如： 320， '500px'， 80%；如果是数字，单位为px|
|header|Boolean/String/Function|true|N|弹框顶部内容；支持同名插槽（slot）；类型Boolean，表示是否显示；类型String表示为显示内容；类型为Function，则表示渲染函数，函数返回内容将作为渲染结果输出。优先级： Function/String > slot|
|body|Boolean/String/Function|true|N|弹框内容；支持同名插槽（slot）；类型Boolean，表示是否显示；类型String表示为显示内容；类型为Function，则表示渲染函数，函数返回内容将作为渲染结果输出。优先级： Function/String > slot|
|footer|Boolean/String/Function|true|N|弹框底部内容；支持同名插槽（slot）；类型Boolean，表示是否显示；类型String表示为显示内容；类型为Function，则表示渲染函数，函数返回内容将作为渲染结果输出。优先级： Function/String > slot|
|closeBtn|Boolean/Function|true|N|弹框右上角关闭按钮；类型Boolean，表示是否显示关闭按钮；类型为Function ，则表示渲染函数，函数返回内容将作为渲染结果输出。|
|showOverlay|Boolean|true|N|是否显示遮罩层|
|preventScrollThrough|Boolean|true|N|防止滚动穿透|
|draggable|Boolean|'modal'|N|是否允许弹框拖拽，必须要是非模态框（mode='not-modal'）|
|attach|Boolean/String/Function|false|N|指定弹框挂载点，默认子元素挂载；类型Boolean，true挂载document.body，false为子元素挂载；类型String，表示DOM选择器（querySelect）;类型Function，需返回DOM节点，如：()=>document.body|
|zlndex|Number|2500|N|定位层级|
|destroyOnClose|Boolean|false|N|关闭时销毁Dialog子元素|
| confirmBtn | string/boolean/Object/Function | '确认' | N | 确认按钮 |
| cancelBtn | string/boolean/Object/Function | '取消' | N | 取消按钮 |


### Dialog 事件
| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
|keydown-esc|(close: Function, e: KeyboardEvent)|按下 ESC 时触发事件|
|click-close-btn|(close: Function, e: Event)|关闭按钮点击时触发，组件本身不执行关闭，仅触发事件。执行参数 close 方法，即可关闭弹框。|
|click-cancel | (close: Function, e: Event) | 点击取消按钮 |
|click-confirm | (close: Function, e: Event) | 点击确认按钮 |
|click-overlay|-|点击遮罩层时触发|
|visable-change|(visable: Boolean)|弹框状态切换时触发，传递参数visable|
|opened|(el: Element))|弹框弹出动画结束触发事件|
|closed|(el: Element)|弹框收起动画结束触发事件|
|close | (close: Function, e: Event) | 全部弹框关闭事件，若用户没有定义keydownEsc, clickCloseBtn, clickCancel, clickConfirm, clickOverlay 等事件时，触发 close事件；如果都没有定义，弹框会自行执行关闭 |


### this.$dialog


`this.$dialog(options)` options 参数同 Dialog 。<br/><br/>

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| onConfirm | ({ e: Event, trigger: string, close: Function }) => void / Promise | - | N | trigger可选项: confirm 。确认回调，在回调执行结束后(含 Promise 返回)，弹框会关闭 |
| onClose | ({ e: Event, trigger: string, close: Function }) => void / Promise | - | N | trigger可选项: cancel/closeBtn/overlay/esc 。取消回调，在回调执行结束后(含 Promise 返回)，弹框会关闭 |

<br/>
返回 Dialog 操作对象 { show, hide, update, destroy } 如下:<br/><br/>

| 属性 | 类型 | 说明 |
|-----|-----|-----|
| show | Function | 显示弹框 |
| hide | Function | 隐藏弹框 |
| update | Function | 更新弹框 |
| destroy | Function | 销毁弹框 |

<br/>
注: onConfirm/onClose 返回 Promise {< rejected >} 时，不在组件内部执行关闭。


### this.$dialog.confirm

`this.$dialog.confirm(options)` options 参数同 this.$dialog 。


### this.$dialog.alert

`this.$dialog.alert(options)` options 参数同 this.$dialog，无 `cancelBtn` 。

