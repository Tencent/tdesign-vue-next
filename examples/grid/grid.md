## grid 


::: demo demos/base 基本使用
:::

::: demo demos/gutter 区块间隔
:::

::: demo demos/offset 左右偏移
:::

::: demo demos/sort 排序
:::

::: demo demos/order 次序
:::

::: demo demos/halign 排版
:::

::: demo demos/valign 对齐
:::

::: demo demos/flex flex
:::

::: demo demos/responsive 响应式布局
:::

### 属性配置
#### Row Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|algin|String|top|N|flex 布局下的垂直对齐方式 top/medium/bottom|
|gutter|Number / Object / Array|0|N|栅格间隔 { xs: 8, sm: 16, md: 24} [水平间距, 垂直间距]|
|justify|String|start|N|flex 布局下的水平排列方式：start / end / center / space-around / space-between|
|tag|String|div|N|自定义元素标签|

#### Col Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|flex|String / Number|-|N|flex 布局填充|
|offset|Number|0|N|栅格左侧的间隔格数，间隔内不可以有栅格|
|order|Number|0|N|栅格顺序，flex 布局模式下有效|
|pull|Number|0|N|栅格向左移动格数|
|push|Number|0|N|栅格向右移动格数|
|span|Number|-|N|栅格占位格数，为 0 时相当于 display: none|
|xs|Number / Object|-|N|<768px 响应式栅格，可为栅格数或一个包含其他属性的对象（手机）|
|sm|Number / Object|-|N|≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象（平板）|
|md|Number / Object|-|N|≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象（超小尺寸电脑）|
|lg|Number / Object|-|N|≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象（小尺寸电脑）|
|xl|Number / Object|-|N|≥1400px 响应式栅格，可为栅格数或一个包含其他属性的对象（中尺寸电脑）|
|xxl|Number / Object|-|N|≥1880px 响应式栅格，可为栅格数或一个包含其他属性的对象（大尺寸电脑）|
|tag|String|div|N|自定义元素标签|
