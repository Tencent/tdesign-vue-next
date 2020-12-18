:: BASE_DOC ::

### 使用示例

### 自定义位置
::: demo demos/PlacementUsageExample 
:::

### 自定义大小
::: demo demos/SizeUsageExample
:::

### 页脚
::: demo demos/FooterUsageExample 
:::

### 不显示蒙层
::: demo demos/NoMaskUsageExample 
:::

### 模式
::: demo demos/ModeUsageExample push 
:::

### 渲染在当前 DOM
::: demo demos/CurrentDOMUsageExample  
:::

### push 模式，渲染在当前 DOM
::: demo demos/CurrentDOMModeUsageExample 
:::

### 属性配置

| 属性                | 类型                               | 默认值    | 必传 | 说明                                                                 |
| ------------------- | ---------------------------------- | --------- | ---- | -------------------------------------------------------------------- |
| visible             | Boolean                            | -         | -    | Drawer 是否可见                                                      |
| closeBtn            | Boolean                            | -         | -    | 是否显示右上角的关闭按钮                                             |
| footer              | Boolean                            | -         | -    | Drawer 是否显示页脚                                                  |
| duration            | Number               | 300       | -    | 动画时长，单位为毫秒                                                 |
| closeOnClickOverlay | Boolean                            | true      | -    | 点击蒙层是否允许关闭                                                 |
| className           | String                             | -         | -    | Drawer 外层容器的 className，作用节点包括 mask                       |
| zIndex              | Number                             | 1500      | -    | 设置 Drawer 的 z-index                                               |
| placement           | "top"/ "left" / "right" / "bottom" | "right"   | -    | 抽屉方向                                                             |
| size                | String / Number                    | "small"   | -    | 抽屉大小，可以是 large/medium/small/300px/500px/80%/50%/300/500 等等 |
| mode                | String                 | "overlay" | -    | 展示方式，push（推开内容区域）或者 overlay（在内容上展示）           |
| destroyOnClose      | Boolean                            | false     | -    | 关闭时销毁 Drawer 内的子元素                                         |
| forceRender         | Boolean                            | false     | -    | 预渲染 Drawer 内的元素                                               |
| attach              | String / Boolean / VNde              | -         | -    | 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom                 |
| showOverlay         | Boolean                            | -         | -    | 是否显示遮罩层                                                       |
| keydownEsc          | Boolean                            | true      | -    | 是否支持键盘 ESC 关闭                                                |
| header              | Boolean                            | true      | -    | 控制 header 是否显示，默认为 true，当此项为 false 时，title 无效。   |

### Drawer Slot

| 属性   | 说明                                                            |
| ------ | --------------------------------------------------------------- |
| -      | Drawer 的内容                                                   |
| title  | Drawer 标题区内容，如果不需要 header 请设置 header 属性为 false |
| footer | Drawer 页脚区内容，如果不需要 footer 请设置 footer 属性为 false |

### Drawer Events

| 属性          | 说明                        |
| ------------- | --------------------------- |
| click-overlay | Drawer 点击遮罩层的回调     |
| close         | Drawer 打开的回调           |
| closed        | Drawer 关闭动画结束时的回调 |
| open          | Drawer 打开的回调           |
| opened        | Drawer 打开的回调           |
