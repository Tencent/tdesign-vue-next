:: BASE_DOC ::

## API

### Row Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | top | 纵向对齐方式。可选项：top/middle/bottom | N
gutter | Number / Object / Array | 0 | 栅格间隔，示例：`{ xs: 8, sm: 16, md: 24}`。当数据类型为 Number 和 Object 时，用于指定横向间隔。当数据类型为数组时，第一个参数为横向间隔，第二个参数为纵向间隔， [水平间隔, 垂直间隔]。TS 类型：`number |  GutterObject | Array<GutterObject | number>`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/grid/type.ts) | N
justify | String | start | flex 布局下的水平排列方式。可选项：start/end/center/space-around/space-between | N
tag | String | div | 自定义元素标签 | N

### Col Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
flex | String / Number | - | flex 布局填充。CSS 属性 flex 值。示例：2 / 3 / '100px' / 'auto' / '1 1 200px' | N
lg | Number / Object | - | ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象（小尺寸电脑）。TS 类型：`number | BaseColProps` | N
md | Number / Object | - | ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象（超小尺寸电脑）。TS 类型：`number | BaseColProps` | N
offset | Number | 0 | 栅格左侧的间隔格数，间隔内不可以有栅格 | N
order | Number | 0 | 栅格顺序，flex 布局模式下有效 | N
pull | Number | 0 | 栅格向左移动格数 | N
push | Number | 0 | 栅格向左移动格数 | N
sm | Number / Object | - | ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象（平板）。TS 类型：`number | BaseColProps` | N
span | Number | 12 | 栅格占位格数，为 0 时相当于 display: none | N
tag | String | div | 自定义元素标签 | N
xl | Number / Object | - | ≥1400px 响应式栅格，可为栅格数或一个包含其他属性的对象（中尺寸电脑）。TS 类型：`number | BaseColProps` | N
xs | Number / Object | - | <768px 响应式栅格，可为栅格数或一个包含其他属性的对象（手机）。TS 类型：`number | BaseColProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/grid/type.ts) | N
xxl | Number / Object | - | ≥1880px 响应式栅格，可为栅格数或一个包含其他属性的对象（大尺寸电脑）。TS 类型：`number | BaseColProps` | N
