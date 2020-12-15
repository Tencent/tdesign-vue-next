## Drawer 抽屉

屏幕边缘滑出的浮层面板。

### 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。

当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

### 使用示例

::: demo demos/base 基本
:::

::: demo demos/PlacementUsageExample 自定义位置
:::

::: demo demos/SizeUsageExample 自定义大小
:::

::: demo demos/FooterUsageExample 页脚
:::

::: demo demos/NoMaskUsageExample 不显示蒙层
:::

::: demo demos/ModeUsageExample push 模式
:::

::: demo demos/CurrentDOMUsageExample 渲染在当前 DOM
:::

::: demo demos/CurrentDOMModeUsageExample push 模式，渲染在当前 DOM
:::

### 属性配置

| 属性                | 类型                               | 默认值    | 必传 | 说明                                                                 |
| ------------------- | ---------------------------------- | --------- | ---- | -------------------------------------------------------------------- |
| visible             | boolean                            | -         | -    | Drawer 是否可见                                                      |
| closeBtn            | boolean                            | -         | -    | 是否显示右上角的关闭按钮                                             |
| footer              | boolean                            | -         | -    | Drawer 是否显示页脚                                                  |
| duration            | 动画时长，单位为毫秒               | 300       | -    | 动画时长，单位为毫秒                                                 |
| closeOnClickOverlay | boolean                            | true      | -    | 点击蒙层是否允许关闭                                                 |
| className           | string                             | -         | -    | Drawer 外层容器的 className，作用节点包括 mask                       |
| zIndex              | number                             | 1500      | -    | 设置 Drawer 的 z-index                                               |
| placement           | "top"/ "left" / "right" / "bottom" | "right"   | -    | 抽屉方向                                                             |
| size                | string / number                    | "small"   | -    | 抽屉大小，可以是 large/middle/small/300px/500px/80%/50%/300/500 等等 |
| mode                | "push" / "overlay"                 | "overlay" | -    | 展示方式，push（推开内容区域）或者 overlay（在内容上展示）           |
| destroyOnClose      | boolean                            | false     | -    | 关闭时销毁 Drawer 内的子元素                                         |
| forceRender         | boolean                            | false     | -    | 预渲染 Drawer 内的元素                                               |
| attach              | string / false / VNde              | -         | -    | 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom                 |
| showOverlay         | boolean                            | -         | -    | 是否显示遮罩层                                                       |
| keydownEsc          | boolean                            | true      | -    | 是否支持键盘 ESC 关闭                                                |
| header              | boolean                            | true      | -    | 控制 header 是否显示，默认为 true，当此项为 false 时，title 无效。   |

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
