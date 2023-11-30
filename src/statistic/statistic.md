:: BASE_DOC ::

## API
### Statistic Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
animation | Object | - | 动画效果控制，`duration` 指动画的过渡时间`单位：毫秒`，`valueFrom` 指动画的起始数值。`{ duration, valueFrom }`。TS 类型：`animation` `interface animation { duration: number; valueFrom: number;  }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/statistic/type.ts) | N
animationStart | Boolean | false | 是否开始动画 | N
color | String | - | 颜色风格，依次为 TDesign 风格的黑色、蓝色、红色、橙色、绿色。也可以为任何 [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) 支持的 RGB 等值。可选项：black/blue/red/orange/green | N
decimalPlaces | Number | - | 小数保留位数 | N
extra | String / Slot / Function | - | 额外的显示内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
format | Function | - | 格式化数值显示值。TS 类型：`(value: number) => number` | N
loading | Boolean | false | 是否加载中 | N
prefix | String / Slot / Function | - | 前缀内容，展示优先级高于 trend。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
separator | String | , | 默认展示进位分隔符，可以自定义为其他内容，`separator = ''` 设置为空字符串/null/undefined 时隐藏分隔符 | N
suffix | String / Slot / Function | - | 后缀内容，展示优先级高于 trend。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | 数值显示的标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
trend | String | - | 趋势。可选项：increase/decrease | N
trendPlacement | String | left | 趋势展示位置。可选项：left/right | N
unit | String / Slot / Function | - | 单位内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | Number | - | 数值显示的值 | N

### StatisticInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
start | `(from: number, to: number)` | \- | 必需。设置数字滚动变化效果，从一个数字到另一个数字
