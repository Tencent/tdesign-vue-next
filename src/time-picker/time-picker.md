:: BASE_DOC ::

## API

### TimePicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许直接输入时间 | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | false | 是否允许清除选中值 | N
disableTime | Function | - | 禁用时间项的配置函数。TS 类型：`(h: number, m: number, s: number, ms: number) => Partial<{ hour: Array<number>, minute: Array<number>, second: Array<number>, millisecond: Array<number>  }>` | N
disabled | Boolean | undefined | 是否禁用组件 | N
format | String | HH:mm:ss | 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format) | N
hideDisabledTime | Boolean | true | 是否隐藏禁用状态的时间项 | N
inputProps | Object | - | 透传给输入框（Input）组件的参数。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String | undefined | 占位符 | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
presets | Object | - | 预设快捷时间选择，示例：`{ '前一小时': '11:00:00' }`。TS 类型：`PresetTime` `interface PresetTime { [presetName: string]: TimePickerValue \| (() => TimePickerValue) }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
selectInputProps | Object | - | 透传 SelectInput 筛选器输入框组件的全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
size | String | medium | 尺寸。可选项：small/medium/large | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
steps | Array | [1, 1, 1] | 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']。TS 类型：`Array<string \| number>` | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TimePickerValue` `type TimePickerValue = string`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
defaultValue | String | - | 选中值。非受控属性。TS 类型：`TimePickerValue` `type TimePickerValue = string`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义选中项呈现的内容。TS 类型：`string \| TNode<{ value: TimePickerValue }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
onBlur | Function |  | TS 类型：`(context: { value: TimePickerValue } & SelectInputBlurContext) => void`<br/>当输入框失去焦点时触发，value 表示组件当前有效值。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`import { SelectInputBlurContext } from '@SelectInput'`<br/> | N
onChange | Function |  | TS 类型：`(value: TimePickerValue) => void`<br/>选中值发生变化时触发 | N
onClose | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>面板关闭时触发 | N
onFocus | Function |  | TS 类型：`(context: { value: TimePickerValue; e: FocusEvent }) => void`<br/>输入框获得焦点时触发，value 表示组件当前有效值 | N
onInput | Function |  | TS 类型：`(context: { value: TimePickerValue; e: InputEvent }) => void`<br/>当输入框内容发生变化时触发，参数 value 表示组件当前有效值 | N
onOpen | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>面板打开时触发 | N
onPick | Function |  | TS 类型：`(value: TimePickerValue, context: { e: MouseEvent }) => void`<br/>面板选中值后触发 | N

### TimePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: TimePickerValue } & SelectInputBlurContext)` | 当输入框失去焦点时触发，value 表示组件当前有效值。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`import { SelectInputBlurContext } from '@SelectInput'`<br/>
change | `(value: TimePickerValue)` | 选中值发生变化时触发
close | `(context: { e: MouseEvent })` | 面板关闭时触发
focus | `(context: { value: TimePickerValue; e: FocusEvent })` | 输入框获得焦点时触发，value 表示组件当前有效值
input | `(context: { value: TimePickerValue; e: InputEvent })` | 当输入框内容发生变化时触发，参数 value 表示组件当前有效值
open | `(context: { e: MouseEvent })` | 面板打开时触发
pick | `(value: TimePickerValue, context: { e: MouseEvent })` | 面板选中值后触发


### TimeRangePicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许直接输入时间 | N
autoSwap | Boolean | true | 是否自动调换左右区间的顺序，默认为 true；若需要支持跨天的场景，可以设置为 false | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | false | 是否允许清除选中值 | N
disableTime | Function | - | 禁用时间项。TS 类型：`(h: number, m: number, s: number, context: { partial: TimeRangePickerPartial }) =>Partial<{ hour: Array<number>, minute: Array<number>, second: Array<number> }>` `type TimeRangePickerPartial = 'start' \| 'end'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
disabled | Boolean / Array | undefined | 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用。TS 类型：`boolean \| Array<boolean>` | N
format | String | HH:mm:ss | 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format) | N
hideDisabledTime | Boolean | true | 是否隐藏禁用状态的时间项 | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
placeholder | String / Array | undefined | 占位符，值为数组表示可分别为开始日期和结束日期设置占位符。TS 类型：`string \| Array<string>` | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
presets | Object | - | 预设快捷时间范围选择，示例：{ '下午': ['13:00:00', '18:00:00'] }。TS 类型：`PresetTimeRange` `interface PresetTimeRange { [presetRageName: string]: TimeRangeValue \| (() => TimeRangeValue)}`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
rangeInputProps | Object | - | 透传给范围输入框 RangeInput 组件的参数。TS 类型：`RangeInputProps`，[RangeInput API Documents](./range-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
size | String | medium | 尺寸。可选项：small/medium/large | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
steps | Array | [1, 1, 1] | 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']。TS 类型：`Array<string \| number>` | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TimeRangeValue` `type TimeRangeValue = Array<string>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
defaultValue | Array | - | 选中值。非受控属性。TS 类型：`TimeRangeValue` `type TimeRangeValue = Array<string>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts) | N
onBlur | Function |  | TS 类型：`(context: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial })  => void`<br/>当输入框失去焦点时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/> | N
onChange | Function |  | TS 类型：`(value: TimeRangeValue) => void`<br/>选中值发生变化时触发 | N
onFocus | Function |  | TS 类型：`(context?: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial })  => void`<br/>范围输入框获得焦点时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/> | N
onInput | Function |  | TS 类型：`(context: { value: TimeRangeValue; e?: InputEvent; position?: TimeRangePickerPartial  })  => void`<br/>当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/> | N
onPick | Function |  | TS 类型：`(value: TimeRangeValue, context: { e: MouseEvent, position?: TimeRangePickerPartial }) => void`<br/>面板选中值后触发 | N

### TimeRangePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial }) ` | 当输入框失去焦点时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/>
change | `(value: TimeRangeValue)` | 选中值发生变化时触发
focus | `(context?: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial }) ` | 范围输入框获得焦点时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/>
input | `(context: { value: TimeRangeValue; e?: InputEvent; position?: TimeRangePickerPartial  }) ` | 当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/>
pick | `(value: TimeRangeValue, context: { e: MouseEvent, position?: TimeRangePickerPartial })` | 面板选中值后触发
