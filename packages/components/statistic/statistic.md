:: BASE_DOC ::

## API

### Statistic Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
animation | Object | - | 动画效果控制，`duration` 指动画的过渡时间`单位：毫秒`，`valueFrom` 指动画的起始数值。`{ duration, valueFrom }`。TS 类型：`animation` `interface animation { duration: number; valueFrom: number;  }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/statistic/type.ts) | N
animationStart | Boolean | false | 是否开始动画 | N
color | String | - | 颜色风格，预设五个 TDesign 颜色风格：黑色（black）、蓝色（blue）、红色（red）、橙色（orange）、绿色（green）支持深浅色模式切换。也可以自定义任何 [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) 支持颜色值，深浅色模式切换需自行适配 | N
decimalPlaces | Number | - | 小数保留位数 | N
extra | String / Slot / Function | - | 额外的显示内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
format | Function | - | 格式化数值显示值。TS 类型：`(value: number) => number` | N
loading | Boolean | false | 是否加载中 | N
prefix | String / Slot / Function | - | 前缀内容，展示优先级高于 trend。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
separator | String | , | 默认展示千位分隔符，可以自定义为其他内容，`separator = ''` 设置为空字符串/null/undefined 时展示默认分隔符 | N
suffix | String / Slot / Function | - | 后缀内容，展示优先级高于 trend。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
title | String / Slot / Function | - | 数值显示的标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
trend | String | - | 趋势。可选项：increase/decrease | N
trendPlacement | String | left | 趋势展示位置。可选项：left/right | N
unit | String / Slot / Function | - | 单位内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | Number | - | 数值显示的值 | N

### StatisticInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
start | \- | \- | 必需。开始动画
