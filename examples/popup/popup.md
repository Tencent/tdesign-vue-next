## Popup 弹出层

### 默认
::: demo demos/base
:::

### 支持的placement
::: demo demos/placement
:::

### 带箭头
::: demo demos/arrow
:::

### 自定义样式
::: demo demos/style
:::

### 临时禁用
::: demo demos/disabled
:::

### value控制
::: demo demos/visible
:::

### 其他触发方式
::: demo demos/trigger
:::

### 指定挂载父节点
::: demo demos/container
:::

### 隐藏时销毁popup
::: demo demos/destroy 
:::

### popup状态改变时触发事件
::: demo demos/event 
:::

### 监听trigger元素尺寸变化，浮层定位自适应
::: demo demos/resize 
:::

### Props

| 属性 | 类型| 默认值| 必传| 说明|
|-----|-----|-----|-----|-----|
|**disabled** |Boolean | false| N|是否禁用 |
|**placement** |Enum | bottom| N| 浮层出现位置，可选值为top、left、right、bottom、topLeft、topRight、bottomLeft、bottomRight、leftTop、leftBottom、rightTop、rightBottom|
|**visible** | Boolean| true| N| 用于控制弹框是否显示（结合事件 visibleChange，形成 v-model）|
|**trigger** |Enum/Arrary | hover| N| 触发方式，可选值hover、click、focus、contextMenu、manual（manual外其他值可以组合）|
|**content** |String/Component/Function | | Y| 弹层显示的内容（组件内部可以实现title等，由select组件考虑虚拟滚动）|
|**visibleArrow** | Boolean| false| N|浮层是否显示箭头 |
|**getOverlayContainer** |Function |() => document.body| N|浮层渲染父节点，默认渲染到 body 上 |
|**overlayStyle** |Object | undefined|N |浮层样式，如可以指定弹出层zIndex范围（默认取5500，参考范围5500-5600） |
|**overlayClassName** |String |'' |N |浮层类名 |
|**destroyOnHide**|Boolean |false |N |隐藏时销毁浮层 |

> 支持默认的props，如className、style、ref等

### Slots

| 平台| 插槽名称| 类型| 必传 | 说明 |
|-----|-----|-----|-----|-----|
| web|**（children）** | String/Component|Y|显示的激活元素 |

> children只能有一个根节点

### Events

| 平台| 事件名称| 参数| 说明 |
|-----|-----|-----|-----|
| web|**visibleChange** | visible（Boolean）|浮层状态改变的回调 | 
