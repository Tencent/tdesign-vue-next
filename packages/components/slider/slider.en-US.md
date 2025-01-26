:: BASE_DOC ::

## API
### Slider Props

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean | false | \- | N
inputNumberProps | Boolean / Object | false | Typescript：`boolean \| InputNumberProps`，[InputNumber API Documents](./input-number?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/slider/type.ts) | N
label | String / Boolean / Slot / Function | true | Typescript：`string \| boolean \| TNode<{ value: SliderValue; position?: 'start' \| 'end' }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
layout | String | horizontal | options: vertical/horizontal | N
marks | Object / Array | - | Typescript：`Array<number> \| SliderMarks` `interface SliderMarks { [mark: number]: string \| TNode<{ value: number }> }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/slider/type.ts) | N
max | Number | 100 | \- | N
min | Number | 0 | \- | N
range | Boolean | false | \- | N
showStep | Boolean | false | \- | N
step | Number | 1 | \- | N
tooltipProps | Object | - | Typescript：`TooltipProps`，[Tooltip API Documents](./tooltip?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/slider/type.ts) | N
value | Number / Array | 0 | `v-model` and `v-model:value` is supported。Typescript：`SliderValue` `type SliderValue = number \| Array<number>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/slider/type.ts) | N
defaultValue | Number / Array | 0 | uncontrolled property。Typescript：`SliderValue` `type SliderValue = number \| Array<number>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/slider/type.ts) | N
onChange | Function |  | Typescript：`(value: SliderValue) => void`<br/> | N
onChangeEnd | Function |  | Typescript：`(value: SliderValue) => void`<br/>triggered when the mouse button is released after dragging or clicking on the slider bar. It is suitable for scenarios where you do not want the callback to be triggered frequently during the process of dragging the slider | N

### Slider Events

name | params | description
-- | -- | --
change | `(value: SliderValue)` | \-
change-end | `(value: SliderValue)` | triggered when the mouse button is released after dragging or clicking on the slider bar. It is suitable for scenarios where you do not want the callback to be triggered frequently during the process of dragging the slider
