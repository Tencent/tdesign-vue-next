:: BASE_DOC ::

## API
### Slider Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 是否禁用组件 | N
inputNumberProps | Boolean / Object | false | 用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件。TS 类型：`boolean \| InputNumberProps`，[InputNumber API Documents](./input-number?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/slider/type.ts) | N
label | String / Boolean / Slot / Function | true | 滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值。TS 类型：`string \| boolean \| TNode<{ value: SliderValue; position?: 'start' \| 'end' }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | 滑块布局方向。可选项：vertical/horizontal | N
marks | Object / Array | - | 刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + '%', 50: (h) => <button>50</button> }`。TS 类型：`Array<number> \| SliderMarks` `interface SliderMarks { [mark: number]: string \| TNode<{ value: number }> }`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/slider/type.ts) | N
max | Number | 100 | 滑块范围最大值 | N
min | Number | 0 | 滑块范围最小值 | N
range | Boolean | false | 双游标滑块 | N
showStep | Boolean | false | 控制步长刻度值显示 | N
step | Number | 1 | 步长 | N
tooltipProps | Object | - | 透传提示组件属性。TS 类型：`TooltipProps`，[Tooltip API Documents](./tooltip?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/slider/type.ts) | N
value | Number / Array | - | 滑块值。支持语法糖 `v-model`。TS 类型：`SliderValue` `type SliderValue = number \| Array<number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/slider/type.ts) | N
defaultValue | Number / Array | - | 滑块值。非受控属性。TS 类型：`SliderValue` `type SliderValue = number \| Array<number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/slider/type.ts) | N
onChange | Function |  | TS 类型：`(value: SliderValue) => void`<br/>滑块值变化时触发 | N
onChangeEnd | Function |  | TS 类型：`(value: SliderValue) => void`<br/>松开拖动`mouseup` 或点击滑块条时触发，适合不希望在拖动滑块过程频繁触发回调的场景实用 | N

### Slider Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: SliderValue)` | 滑块值变化时触发
change-end | `(value: SliderValue)` | 松开拖动 `mouseup` 或点击滑块条时触发，适合不希望在拖动滑块过程频繁触发回调的场景实用