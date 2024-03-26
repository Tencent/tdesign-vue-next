:: BASE_DOC ::

## API
### Statistic Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | Object | - | Animation effect control, `duration` refers to the transition time of the animation `unit: millisecond`, `valueFrom` refers to the initial value of the animation. `{ duration, valueFrom }`。Typescript：`animation` `interface animation { duration: number; valueFrom: number;  }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/statistic/type.ts) | N
animationStart | Boolean | false | Whether to start animation | N
color | String | - | Color style, followed by TDesign style black, blue, red, orange, green.Can also be any RGB equivalent supported by [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)。options: black/blue/red/orange/green | N
decimalPlaces | Number | - |  Decimal places | N
extra | String / Slot / Function | - |  Additional display content。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
format | Function | - | Format numeric display value。Typescript：`(value: number) => number` | N
loading | Boolean | false | Loading | N
prefix | String / Slot / Function | - | Prefix content, display priority is higher than trend。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
separator | String | , | The carry separator is displayed by default, and can be customized to other content. When `separator = ''` is set to an empty string/null/undefined, the separator is hidden | N
suffix | String / Slot / Function | - |  Suffix content, display priority is higher than trend。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | The title of Statistic。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
trend | String | - | trend。options: increase/decrease | N
trendPlacement | String | left | Position of trending placements。options: left/right | N
unit | String / Slot / Function | - | Unit content。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | Number | - | The value of Statistic | N

### StatisticInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
start | \- | \- | required。start animation
