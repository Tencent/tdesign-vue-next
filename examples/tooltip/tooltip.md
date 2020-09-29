## tooltip 文字提示

::: demo demos/base 默认
:::
::: demo demos/noarrow 不带箭头
:::
::: demo demos/customize 可自定义为其他颜色
:::
::: demo demos/placement 基础用法
:::
::: demo demos/trigger 触发状态
:::

### Props

| 属性 | 类型| 默认值| 必传| 说明|
|-----|-----|-----|-----|-----|
|**disabled** |Boolean | false| N|是否禁用 |
|**placement** |Enum | bottom| N| 浮层出现位置，可选值为top、left、right、bottom、topLeft、topRight、bottomLeft、bottomRight、leftTop、leftBottom、rightTop、rightBottom|
|**visible** | Boolean| true| N| 用于控制弹框是否显示（结合事件 visibleChange，形成 v-model）|
|**trigger** |Enum/Arrary | hover| N| 触发方式，可选值hover、click、focus|
|**content** |String/Component/Function | | Y| 弹层显示的内容（组件内部可以实现title等，由select组件考虑虚拟滚动）|
|**visibleArrow** | Boolean| true| N|浮层是否显示箭头 |
|**overlayStyle** |Object | undefined|N |浮层样式，如可以指定弹出层zIndex范围（默认取5500，参考范围5500-5600） |
|**overlayClassName** |String |'' |N |浮层类名 |
|**destroyOnHide**|Boolean |false |N |隐藏时销毁浮层 |

> 支持默认的props，如className、style、ref等

### Events

| 平台| 事件名称| 参数| 说明 |
|-----|-----|-----|-----|
| web|**visibleChange** | visible（Boolean）|浮层状态改变的回调 |
