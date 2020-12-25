:: BASE_DOC ::

### 基本使用

::: demo demos/base 
:::

### 区块间隔

::: demo demos/gutter 
:::

### 左右偏移

::: demo demos/offset 
:::

### 排序

::: demo demos/sort 
:::

### 次序

::: demo demos/order 
:::

### 排版

::: demo demos/halign 
:::

### 对齐

::: demo demos/valign 
:::

### flex

::: demo demos/flex
:::

### 响应式布局

::: demo demos/responsive 
:::

### 属性配置


### Row Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | top | flex 布局下的垂直对齐方式。可选值：top/middle/bottom | N
gutter | Number / Object / Array | 0 | 栅格间隔，示例：{ xs: 8, sm: 16, md: 24}。当数据类型为 Number 和 Object 时，用于指定横向间隔。当数据类型为数组时，第一个参数为横向间隔，第二个参数为纵向间隔， [水平间隔, 垂直间隔]。TS 类型：`number |  GutterObject | Array<GutterObject>【interface GutterObject { xs: number; sm: number; md: number } 】` | N
justify | String | start | flex 布局下的水平排列方式。可选值：start/end/center/space-around/space-between | N
tag | String | div | 自定义元素标签 | N


### Col Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
flex | String / Number | - | flex 布局填充。CSS 属性 flex 值。示例：2 / 3 / '100px' / 'auto' / '1 1 200px' | N
offset | Number | 0 | 栅格左侧的间隔格数，间隔内不可以有栅格 | N
order | Number | 0 | 栅格顺序，flex 布局模式下有效 | N
pull | Number | 0 | 栅格向左移动格数 | N
push | Number | 0 | 栅格向左移动格数 | N
span | Number | 12 | 栅格占位格数，为 0 时相当于 display: none | N
tag | String | div | 自定义元素标签 | N
xs | Number / Object | - | <768px 响应式栅格，可为栅格数或一个包含其他属性的对象（手机）。TS 类型：`number | BaseColProps【interface BaseColProps { offset: number; order: number; pull: number; push: number; span: number }】` | N
sm | Number / Object | - | ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象（平板）。TS 类型：`number | BaseColProps` | N
md | Number / Object | - | ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象（超小尺寸电脑）。TS 类型：`number | BaseColProps` | N
lg | Number / Object | - | ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象（小尺寸电脑）。TS 类型：`number | BaseColProps` | N
xl | Number / Object | - | ≥1400px 响应式栅格，可为栅格数或一个包含其他属性的对象（中尺寸电脑）。TS 类型：`number | BaseColProps` | N
xxl | Number / Object | - | ≥1880px 响应式栅格，可为栅格数或一个包含其他属性的对象（大尺寸电脑）。TS 类型：`number | BaseColProps` | N
