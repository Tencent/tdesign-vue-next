 ## dialog

::: demo demos/standalone 组件展示
:::

::: demo demos/base 默认
:::

::: demo demos/custom 自定义内容
:::

::: demo demos/api API 形式
:::

::: demo demos/others 其他示例
:::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|visable|Boolean|false|no|用于控制弹框是否显示（v-model）|
|mode|String|'modal'|no|是否模态形式，可选值：'modal', 'not一modal'|
|offset|String/Object|'center'|no|对话框位置，默认垂直水平居中，如： {left： '100px'， top： '200px'}|
|width|String/Number|-|no|对话框宽度，如： 320， '500px'， 80%；如果是数字，单位为px|
|header|Boolean/String/Function|true|no|弹框顶部内容；支持同名插槽（slot）；类型Boolean，表示是否显示；类型String表示为显示内容；类型为Function，则表示渲染函数，函数返回内容将作为渲染结果输出。优先级： Function/String > slot|
|body|Boolean/String/Function|true|no|弹框内容；支持同名插槽（slot）；类型Boolean，表示是否显示；类型String表示为显示内容；类型为Function，则表示渲染函数，函数返回内容将作为渲染结果输出。优先级： Function/String > slot|
|footer|Boolean/String/Function|true|no|弹框底部内容；支持同名插槽（slot）；类型Boolean，表示是否显示；类型String表示为显示内容；类型为Function，则表示渲染函数，函数返回内容将作为渲染结果输出。优先级： Function/String > slot|
|closeBtn|Boolean/Function|true|no|弹框右上角关闭按钮；类型Boolean，表示是否显示关闭按钮；类型为Function ，则表示渲染函数，函数返回内容将作为渲染结果输出。|
|showOverlay|Boolean|true|no|是否显示遮罩层|
|preventScrollThrough|Boolean|true|no|防止滚动穿透|
|draggable|Boolean|'modal'|no|是否允许弹框拖拽，必须要是非模态框（mode='not-modal'）|
|attach|Boolean/String/Function|false|no|指定弹框挂载点，默认子元素挂载；类型Boolean，true挂载document.body，false为子元素挂载；类型String，表示DOM选择器（querySelect）;类型Function，需返回DOM节点，如：()=>document.body|
|zlndex|Number|2500|no|定位层级|
|destroyOnClose|Boolean|false|no|关闭时销毁Dialog子元素|
|close|Function|--|no|弹窗关闭按钮点击事调用的函数|

### Confirm API

 * Dialog.confirm(options)
 * this.$confirm(options)

#### 参数 `options`

| 参数 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| header | String/Function | - | N | 对话框标题 |
| body | String/Function | - | N | 对话框主体内容 |
| closeBtn | Boolean/Function | false | N | 对话框右上角关闭按钮 |
| offset | String/Object | 'center' | N | 对话框位置，默认垂直水平居中，如：{left: '100px', top: '200px'} |
| width | Number/String | - | N | 对话框宽度，如：320, '500px', 80% |
| showOverlay | Boolean | false | N | 是否显示遮罩层 |
| preventScrollThrough | Boolean | true | N | 防止滚动穿透 |
| attach | String/() => HTMLElement | 'body' | N | 指定弹框挂载节点，函数需返回 DOM 节点，或合法的 querySelector 字符串，如：() => document.body,  "body" |
| zIndex | Number | 2500 | N | 定位层级 |
| confirmContent | String/Function | '确定' | N | 确定按钮的展示内容。(h, click) : (createElement, 点击确认按钮后的回调函数) |
| cancelContent | String/Function | '取消' | N | 确定按钮的展示内容。(h, click) : (createElement, 点击取消按钮后的回调函数) |
| loading | Boolean | false | N | 确定取消按钮是否展示加载中状态 |
| closeOnClickOverlay | Boolean | true | N | 点击遮罩层是否视为点击取消 |
| asyncClose | boolean | false | N | 用户反馈后不关闭弹窗，若设定为 true 则需要手动调用 close 关闭 |

#### 返回 `Promise<{ confirm, update, close }>`

| 参数 | 类型 | 说明 |
|-----|-----|-----|
| confirm | Boolean | 用户是否点击了确认按钮 |
| update | Function | 更新对话框函数 |
| close | Function | 关闭对话框 |

### Alert API

 * Dialog.alert(options)
 * this.$alert(options)

#### 参数 `options`

| 参数 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| header | String/Function | - | N | 对话框标题 |
| body | String/Function | - | N | 对话框主体内容 |
| closeBtn | Boolean/Function | false | N | 对话框右上角关闭按钮 |
| offset | String/Object | 'center' | N | 对话框位置，默认垂直水平居中，如：{left: '100px', top: '200px'} |
| width | Number/String | - | N | 对话框宽度，如：320, '500px', 80% |
| showOverlay | Boolean | false | N | 是否显示遮罩层 |
| preventScrollThrough | Boolean | true | N | 防止滚动穿透 |
| attach | String/() => HTMLElement | 'body' | N | 指定弹框挂载节点，函数需返回 DOM 节点，或合法的 querySelector 字符串，如：() => document.body,  "body" |
| zIndex | Number | 2500 | N | 定位层级 |
| confirmContent | String/Function | '确定' | N | 确定按钮的展示内容。(h, click) : (createElement, 点击确认按钮后的回调函数) |
| loading | Boolean | false | N | 确定取消按钮是否展示加载中状态 |
| closeOnClickOverlay | Boolean | true | N | 点击遮罩层是否视为点击取消 |
| asyncClose | boolean | false | N | 用户反馈后不关闭弹窗，若设定为 true 则需要手动调用 close 关闭 |

#### 返回 `Promise<{ update, close }>`

| 参数 | 类型 | 说明 |
|-----|-----|-----|
| update | Function | 更新对话框函数 |
| close | Function | 关闭对话框 |