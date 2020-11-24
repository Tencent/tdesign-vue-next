## Tag 标签

定义：标签常用于标记、分类和选择。

### 何时使用

- 用户标记事物的属性和维度
- 进行分类

### 组件类型

在TDesign中，拥有4种不同形式的按钮：基础标签、带图标标签、可删除标签、可选择标签。

### 1.1 基础标签

定义：默认的标签样式

使用场景：默认标签适用于常规表单。可自定义描边、填充、颜色、圆角等样式

::: demo demos/default 
:::

### 1.2 带图标的标签

定义：在标签内嵌入图标

使用场景：用图标来辅助标签分类，或表达标签的属性

::: demo demos/icon 
:::

### 1.3 可删除和添加标签

定义：标签可删除或添加

使用场景：可删除标签分两种：隐藏叉和显示叉，添加标签可组合输入框组件使用

::: demo demos/closable 
:::

### 1.4 可选择标签

定义：标签有已选和未选两种状态，可以通过点击标签来切换

使用场景：可选择标签常用于多个标签的选择场景，类似checkbox的效果，点击切换选中效果，常用于人群标签选择、行业、类目筛选等

::: demo demos/checkable 
:::


### 1.5 尺寸

::: demo demos/size 
:::


### 1.6 形状

::: demo demos/shape 
:::

### 1.7 主题

::: demo demos/theme
:::



### Tag Props

| 平台 | 属性     | 类型                 | 默认值  | 必传 | 说明                                                  |
| ---- | -------- | -------------------- | ------- | ---- | ----------------------------------------------------- |
| 公有 | theme    | String               | default | N    | 标签风格：default/primary/info/warning/danger/success |
| 公有 | size     | String               | middle | N    | 尺寸：large/middle/small（大/中(默认)/小）           |
| 公有 | closable | Boolean               | false   | N    | 标签是否可关闭                                        |
| 公有 | icon     | String/Function/Slot | -       | N    | 标签图标                                              |
| 公有 | shape    | String               | square  | N    | 标签边角类型：square/round/mark                     |
| 公有 | maxWidth | Number/String     | -  | N    | 标签内容宽度超出 maxWidth 时，会出现省略号                     |
| 公有 | effect   | String | dark | N | 主题效果：深色（默认），浅色，朴素。dark \| light \| plain                  |
| 公有 | default  | Function/Slot        | -       | N    | 支持 slots                                            |

### Tag Events

关于事件名称，vue 不加 on，react 加 on。
示例：`close` for vue. `onClose` for react.

| 平台 | 事件名称 | 参数 | 说明               |
| ---- | -------- | ---- | ------------------ |
| 公有 | close    | -    | 点击关闭按钮时触发 |
| 公有 | click    | -    | 点击标签时触发     |

### CheckTag Props

| 平台 | 属性     | 类型                 | 默认值  | 必传 | 说明                                                  |
| ---- | -------- | -------------------- | ------- | ---- | ----------------------------------------------------- |
| 公有 | checked  | Boolean              | false   | N    | 标签选中的状态（只针对于默认 theme 的风格才有选中态）                                       |
| 公有 | disabled  | Boolean              | false   | N    | 标签失效的状态（只针对于默认 theme 的风格才有失效态），失效标签不能触发事件                                       |

### CheckTag Events

| 平台 | 事件名称 | 参数 | 说明               |
| ---- | -------- | ---- | ------------------ |
| 公有 | change    | -    | 点击标签时触发     |
