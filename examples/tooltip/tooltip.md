# Tooltip 文字提示

用于文字提示的气泡框

### 何时使用
鼠标移入需要展示文字解释说明时

## 1. 组件类型
### 1.1 带箭头的文字提示

::: demo demos/arrow
:::

### 1.2 不带箭头的文字提示
::: demo demos/base
:::

::: demo demos/customize 可自定义主题色
:::
::: demo demos/placement 基础用法
:::
::: demo demos/trigger 触发状态
:::

### Props

| 属性 | 类型| 默认值| 必传| 说明|
|-----|-----|-----|-----|-----|
|**content** |TNode| | Y| 弹层显示的内容（组件内部可以实现title等，由select组件考虑虚拟滚动）|
|**theme** |Enum| | Y| 主题背景颜色（primary / success / danger / warning / 自定义）|

> 更多属性请参考 popup 组件
